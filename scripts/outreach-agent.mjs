#!/usr/bin/env node
/**
 * Trusted Signatures outreach agent — preview and send law firm emails via Resend.
 *
 * Usage:
 *   node scripts/outreach-agent.mjs                    # preview all pending
 *   node scripts/outreach-agent.mjs --id <target-id>   # preview one
 *   node scripts/outreach-agent.mjs --all --send       # send all pending
 *   node scripts/outreach-agent.mjs --id <id> --send   # send one
 */

import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const TARGETS_PATH = join(ROOT, 'media/outreach/law-firms-pilot.json');
const TEMPLATE_PATH = join(ROOT, 'media/outreach/email-law-firm-trusted-signatures.md');

const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const FROM_EMAIL = process.env.OUTREACH_FROM_EMAIL || 'TrustCredo <sales@trustcredo.com>';
const REPLY_TO = process.env.OUTREACH_REPLY_TO || 'sales@trustcredo.com';
const SENDER_NAME = process.env.OUTREACH_SENDER_NAME || 'Tanver Afzal';

const SUBJECT = 'Identity-verified signatures for {{firmName}} — stronger evidence, less fraud risk';

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
    .map((p) => `<p style="color:#374151;line-height:1.6;margin:0 0 16px;">${p.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`)
    .join('\n');
}

function parseArgs(argv) {
  const args = { id: null, all: false, send: false };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--id') args.id = argv[++i];
    else if (argv[i] === '--all') args.all = true;
    else if (argv[i] === '--send') args.send = true;
    else if (argv[i] === '--help') args.help = true;
  }
  return args;
}

async function sendEmail(target, subject, bodyText) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [target.email],
      reply_to: REPLY_TO,
      subject,
      text: bodyText,
      html: textToHtml(bodyText),
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Resend HTTP ${res.status}`);
  }

  return res.json();
}

async function main() {
  const args = parseArgs(process.argv);

  if (args.help) {
    console.log(`Trusted Signatures outreach agent

  node scripts/outreach-agent.mjs              Preview all pending targets
  node scripts/outreach-agent.mjs --id <id>  Preview one target
  node scripts/outreach-agent.mjs --all --send   Send all pending (requires RESEND_API_KEY)
  node scripts/outreach-agent.mjs --id <id> --send   Send one target
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
  } else if (!args.all) {
    // default: preview all pending
  }

  if (selected.length === 0) {
    console.log('No pending targets to process.');
    process.exit(0);
  }

  console.log(`\n=== Trusted Signatures Outreach (${args.send ? 'SEND' : 'PREVIEW'}) ===\n`);
  console.log(`Targets: ${selected.length}`);
  console.log(`From: ${FROM_EMAIL}`);
  console.log(`Reply-To: ${REPLY_TO}\n`);

  for (const target of selected) {
    const subject = applyTemplate(SUBJECT, target);
    const body = applyTemplate(bodyTemplate, target);

    console.log('─'.repeat(60));
    console.log(`ID:      ${target.id}`);
    console.log(`To:      ${target.contactName} <${target.email}>`);
    console.log(`Firm:    ${target.firmName}`);
    console.log(`Subject: ${subject}`);
    console.log('─'.repeat(60));
    console.log(body);
    console.log('');

    if (args.send) {
      if (!RESEND_API_KEY) {
        console.error('RESEND_API_KEY is not set. Add it to .env.local or environment.');
        process.exit(1);
      }

      try {
        const result = await sendEmail(target, subject, body);
        console.log(`✓ Sent (Resend id: ${result.id})`);
        const idx = targets.findIndex((t) => t.id === target.id);
        if (idx >= 0) {
          targets[idx] = {
            ...targets[idx],
            status: 'sent',
            sentAt: new Date().toISOString(),
            resendId: result.id,
          };
        }
      } catch (err) {
        console.error(`✗ Failed: ${err.message}`);
        process.exit(1);
      }
    }
  }

  if (args.send) {
    saveTargets(targets);
    console.log('Updated law-firms-pilot.json with sent status.');
  } else {
    console.log('Dry run complete. Add --send to deliver via Resend.');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
