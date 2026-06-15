#!/usr/bin/env node
/**
 * Trusted Signatures outreach agent — preview and send law firm emails via SMTP.
 *
 * Usage:
 *   node scripts/outreach-agent.mjs                    # preview all pending
 *   node scripts/outreach-agent.mjs --id <target-id>   # preview one
 *   node scripts/outreach-agent.mjs --all --send       # send all pending
 *   node scripts/outreach-agent.mjs --id <id> --send   # send one
 *   node scripts/outreach-agent.mjs --id <id> --to you@example.com --send   # test send
 */

import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import { loadEnv } from './load-env.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

loadEnv(ROOT);

const TARGETS_PATH = join(ROOT, 'media/outreach/law-firms-pilot.json');
const TEMPLATE_PATH = join(ROOT, 'media/outreach/email-law-firm-trusted-signatures.md');

const SMTP_HOST = process.env.SMTP_HOST || '';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587', 10);
const SMTP_SECURE = process.env.SMTP_SECURE === 'true';
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const FROM_EMAIL =
  process.env.OUTREACH_FROM_EMAIL ||
  process.env.SMTP_FROM_EMAIL ||
  (SMTP_USER ? `TrustCredo <${SMTP_USER}>` : 'TrustCredo <sales@trustcredo.com>');
const REPLY_TO = process.env.OUTREACH_REPLY_TO || SMTP_USER || 'sales@trustcredo.com';
const BCC = process.env.OUTREACH_BCC || '';
const SENDER_NAME = process.env.OUTREACH_SENDER_NAME || 'Kristina';

const SUBJECT =
  'Identity-verified signatures for {{firmName}} — free to try (10 credits)';

function loadTargets() {
  return JSON.parse(readFileSync(TARGETS_PATH, 'utf8'));
}

function saveTargets(targets) {
  writeFileSync(TARGETS_PATH, JSON.stringify(targets, null, 2) + '\n');
}

function loadBodyTemplate() {
  const raw = readFileSync(TEMPLATE_PATH, 'utf8');
  const match = raw.match(/## Body \(plain text\)\s+([\s\S]*?)(?=\n---|\n## |$)/);
  if (!match) throw new Error('Could not parse body template from markdown');
  return match[1].trim();
}

function firstName(fullName) {
  return fullName.split(/\s+/)[0] || fullName;
}

function applyTemplate(text, target) {
  const vars = {
    contactName: target.contactName,
    firstName: firstName(target.contactName),
    firmName: target.firmName,
    practiceFocus: target.practiceFocus,
    senderName: SENDER_NAME,
  };
  return text.replace(/\{\{(\w+)\}\}/g, (_, key) => vars[key] ?? `{{${key}}}`);
}

function textToHtml(text) {
  return text
    .split('\n\n')
    .map((p) =>
      `<p style="color:#374151;line-height:1.6;margin:0 0 16px;">${p
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`
    )
    .join('\n');
}

function parseArgs(argv) {
  const args = { id: null, all: false, send: false, to: null };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--id') args.id = argv[++i];
    else if (argv[i] === '--to') args.to = argv[++i];
    else if (argv[i] === '--all') args.all = true;
    else if (argv[i] === '--send') args.send = true;
    else if (argv[i] === '--help') args.help = true;
  }
  return args;
}

function getTransporter() {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error(
      'SMTP not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS in .env.local'
    );
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    tls: {
      rejectUnauthorized: true,
      minVersion: 'TLSv1.2',
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 30000,
  });
}

async function sendEmail(transporter, target, subject, bodyText) {
  const mail = {
    from: FROM_EMAIL,
    to: target.email,
    replyTo: REPLY_TO,
    subject,
    text: bodyText,
    html: textToHtml(bodyText),
  };
  if (BCC) mail.bcc = BCC;

  const info = await transporter.sendMail(mail);

  return info;
}

async function main() {
  const args = parseArgs(process.argv);

  if (args.help) {
    console.log(`Trusted Signatures outreach agent (SMTP)

  node scripts/outreach-agent.mjs                 Preview all pending targets
  node scripts/outreach-agent.mjs --id <id>       Preview one target
  node scripts/outreach-agent.mjs --all --send    Send all pending
  node scripts/outreach-agent.mjs --id <id> --send   Send one target
  node scripts/outreach-agent.mjs --id <id> --to <email> --send   Test send (does not update target status)

Requires SMTP_HOST, SMTP_USER, SMTP_PASS in .env.local
`);
    process.exit(0);
  }

  const bodyTemplate = loadBodyTemplate();
  let targets = loadTargets();

  let selected = targets.filter((t) => t.status === 'pending');
  if (args.id) {
    selected = targets.filter((t) => t.id === args.id);
    if (selected.length === 0) {
      console.error(`Target not found: ${args.id}`);
      process.exit(1);
    }
  }

  if (selected.length === 0) {
    console.log('No pending targets to process.');
    process.exit(0);
  }

  console.log(`\n=== Trusted Signatures Outreach (${args.send ? 'SEND' : 'PREVIEW'}) ===\n`);
  console.log(`Targets: ${selected.length}`);
  console.log(`From: ${FROM_EMAIL}`);
  console.log(`Reply-To: ${REPLY_TO}`);
  if (BCC) console.log(`BCC: ${BCC}`);
  if (args.send) {
    console.log(`SMTP: ${SMTP_HOST}:${SMTP_PORT} (secure=${SMTP_SECURE})`);
  }
  console.log('');

  let transporter;
  if (args.send) {
    transporter = getTransporter();
    await transporter.verify();
    console.log('SMTP connection verified.\n');
  }

  const testSend = Boolean(args.to);

  for (const target of selected) {
    const recipient = testSend ? { ...target, email: args.to } : target;
    const subject = applyTemplate(SUBJECT, target);
    const body = applyTemplate(bodyTemplate, target);

    console.log('─'.repeat(60));
    console.log(`ID:      ${target.id}`);
    if (testSend) {
      console.log(`To:      ${target.contactName} <${args.to}> (test override, was ${target.email})`);
    } else {
      console.log(`To:      ${target.contactName} <${target.email}>`);
    }
    console.log(`Firm:    ${target.firmName}`);
    console.log(`Subject: ${subject}`);
    console.log('─'.repeat(60));
    console.log(body);
    console.log('');

    if (args.send) {
      try {
        const result = await sendEmail(transporter, recipient, subject, body);
        console.log(`✓ Sent (messageId: ${result.messageId})`);
        if (!testSend) {
          const idx = targets.findIndex((t) => t.id === target.id);
          if (idx >= 0) {
            targets[idx] = {
              ...targets[idx],
              status: 'sent',
              sentAt: new Date().toISOString(),
              messageId: result.messageId,
            };
          }
        }
      } catch (err) {
        console.error(`✗ Failed: ${err.message}`);
        process.exit(1);
      }
    }
  }

  if (args.send) {
    if (testSend) {
      console.log('Test send complete (target status unchanged).');
    } else {
      saveTargets(targets);
      console.log('Updated law-firms-pilot.json with sent status.');
    }
  } else {
    console.log('Dry run complete. Add --send to deliver via SMTP.');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
