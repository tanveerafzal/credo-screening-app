#!/usr/bin/env node
/**
 * Check Tanveer@trustcredo.com inbox for replies to sent outreach emails.
 *
 * Usage:
 *   node scripts/outreach-reply-check.mjs
 *   node scripts/outreach-reply-check.mjs --wait-minutes 30
 *   node scripts/outreach-reply-check.mjs --id blaney-mcmurtry-shawn-wolfson
 */

import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { ImapFlow } from 'imapflow';
import { loadEnv } from './load-env.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

loadEnv(ROOT);

const TARGETS_PATH = join(ROOT, 'media/outreach/law-firms-pilot.json');

const SMTP_HOST = process.env.SMTP_HOST || '';
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const IMAP_HOST =
  process.env.IMAP_HOST ||
  (SMTP_HOST.includes('netsol-smtp')
    ? 'netsol-imap-oxcs.hostingplatform.com'
    : SMTP_HOST.replace('smtp', 'imap') || '');
const IMAP_PORT = parseInt(process.env.IMAP_PORT || '993', 10);
const IMAP_SECURE = process.env.IMAP_SECURE !== 'false';
const IMAP_USER = process.env.IMAP_USER || SMTP_USER;
const IMAP_PASS = process.env.IMAP_PASS || SMTP_PASS;

function loadTargets() {
  return JSON.parse(readFileSync(TARGETS_PATH, 'utf8'));
}

function saveTargets(targets) {
  writeFileSync(TARGETS_PATH, JSON.stringify(targets, null, 2) + '\n');
}

function parseArgs(argv) {
  const args = { id: null, waitMinutes: 0, help: false };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--id') args.id = argv[++i];
    else if (argv[i] === '--wait-minutes') args.waitMinutes = parseInt(argv[++i], 10);
    else if (argv[i] === '--help') args.help = true;
  }
  return args;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeMessageId(id) {
  if (!id) return '';
  return id.replace(/^<|>$/g, '').toLowerCase();
}

function formatWait(minutes) {
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'}`;
  const hours = Math.floor(minutes / 60);
  const rem = minutes % 60;
  if (!rem) return `${hours} hour${hours === 1 ? '' : 's'}`;
  return `${hours}h ${rem}m`;
}

async function findReply(client, target) {
  const since = target.sentAt ? new Date(target.sentAt) : new Date(Date.now() - 7 * 86400000);
  const ourMessageId = normalizeMessageId(target.messageId);

  const uids = await client.search({
    since,
    or: [{ from: target.email }, { from: target.email.toLowerCase() }],
  });

  if (!uids.length) return null;

  let best = null;

  for (const uid of uids) {
    const message = await client.fetchOne(
      uid,
      { envelope: true, headers: ['in-reply-to', 'references'] },
      { uid: true }
    );
    if (!message) continue;

    const inReplyTo = message.headers.get('in-reply-to')?.toString() || '';
    const references = message.headers.get('references')?.toString() || '';
    const matchesThread =
      ourMessageId &&
      (normalizeMessageId(inReplyTo).includes(ourMessageId) ||
        references.toLowerCase().includes(ourMessageId));

    const candidate = {
      uid,
      subject: message.envelope.subject || '(no subject)',
      from: message.envelope.from?.[0]?.address || target.email,
      date: message.envelope.date?.toISOString() || new Date().toISOString(),
      matchesThread,
    };

    if (!best || candidate.matchesThread || candidate.date > best.date) {
      best = candidate;
    }
  }

  return best;
}

async function main() {
  const args = parseArgs(process.argv);

  if (args.help) {
    console.log(`Outreach reply checker (IMAP)

  node scripts/outreach-reply-check.mjs
  node scripts/outreach-reply-check.mjs --wait-minutes 30
  node scripts/outreach-reply-check.mjs --id <target-id>

Requires IMAP_USER/IMAP_PASS (defaults to SMTP creds) in .env.local
`);
    process.exit(0);
  }

  if (!IMAP_HOST || !IMAP_USER || !IMAP_PASS) {
    throw new Error(
      'IMAP not configured. Set IMAP_HOST, IMAP_USER, and IMAP_PASS (or SMTP_* creds) in .env.local'
    );
  }

  if (args.waitMinutes > 0) {
    console.log(`Waiting ${formatWait(args.waitMinutes)} before checking inbox...`);
    await sleep(args.waitMinutes * 60 * 1000);
  }

  let targets = loadTargets();
  let selected = targets.filter((t) => t.status === 'sent' || t.status === 'replied');
  if (args.id) {
    selected = targets.filter((t) => t.id === args.id);
    if (!selected.length) {
      console.error(`Target not found: ${args.id}`);
      process.exit(1);
    }
  } else {
    selected = selected.filter((t) => t.status === 'sent');
  }

  if (!selected.length) {
    console.log('No sent targets to check for replies.');
    process.exit(0);
  }

  console.log(`\n=== Outreach Reply Check ===\n`);
  console.log(`IMAP: ${IMAP_USER} @ ${IMAP_HOST}:${IMAP_PORT}`);
  console.log(`Targets: ${selected.length}\n`);

  const client = new ImapFlow({
    host: IMAP_HOST,
    port: IMAP_PORT,
    secure: IMAP_SECURE,
    auth: { user: IMAP_USER, pass: IMAP_PASS },
    logger: false,
  });

  let updated = 0;

  try {
    await client.connect();
    const lock = await client.getMailboxLock('INBOX');

    try {
      for (const target of selected) {
        const reply = await findReply(client, target);
        const idx = targets.findIndex((t) => t.id === target.id);

        if (!reply) {
          console.log(`○ ${target.firmName} (${target.email}) — no reply yet`);
          continue;
        }

        const alreadyReplied = target.status === 'replied';
        console.log(`${alreadyReplied ? '↻' : '✓'} ${target.firmName} (${target.email})`);
        console.log(`  Subject: ${reply.subject}`);
        console.log(`  Date:    ${reply.date}`);
        if (reply.matchesThread) console.log(`  Thread:  matched original message`);

        if (idx >= 0 && !alreadyReplied) {
          targets[idx] = {
            ...targets[idx],
            status: 'replied',
            repliedAt: reply.date,
            replySubject: reply.subject,
          };
          updated++;
        }
      }
    } finally {
      lock.release();
    }
  } finally {
    await client.logout();
  }

  if (updated > 0) {
    saveTargets(targets);
    console.log(`\nUpdated ${updated} target(s) to replied in law-firms-pilot.json.`);
  } else {
    console.log('\nNo new replies found.');
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
