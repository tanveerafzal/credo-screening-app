# Trusted Signatures Outreach Agent

Find law firms, personalize outreach from marketing material, and send pilot emails via SMTP.

## Source material

- Product page: `src/app/trusted-signatures/page.tsx`
- LinkedIn series: `media/linkedin/posts.md` (Trusted Signatures section)
- Pilot targets: `media/outreach/law-firms-pilot.json`
- Email template: `media/outreach/email-law-firm-trusted-signatures.md`

## Agent workflow

### 1. Find prospects

Search for **mid-size law firms** (20–150 lawyers) with:

- Commercial real estate, corporate, litigation, or insurance defence practices
- Public lawyer emails on firm websites
- Toronto, Vancouver, Calgary, or US markets (NYC, Chicago, Dallas) for phase 1

**Good titles:** Managing Partner, Practice Group Chair, Director of Innovation, COO, Real Estate Department Co-Chair.

**Skip:** Generic `info@` unless no alternative; firms under 10 lawyers; Am Law 100 (long enterprise sales cycle for pilot).

Add each prospect to `law-firms-pilot.json` with `status: "pending"`.

### 2. Personalize

Use `practiceFocus` from their bio (one line). Reference their city or a recent deal/ranking only if verified on their website.

**Do not** claim they use DocuSign or have had a breach. **Do** lead with evidentiary value and fraud risk on high-stakes documents.

### 3. Preview before sending

```bash
cd credo-screening-app
npm run outreach:preview
```

### 4. Send (requires SMTP in `.env.local`)

```bash
# Send to one target by id
node scripts/outreach-agent.mjs --id blaney-mcmurtry-shawn-wolfson --send

# Send all pending
node scripts/outreach-agent.mjs --all --send
```

### 5. Check for replies (30 minutes after send)

After sending, run the reply checker. It connects to your inbox via IMAP and marks targets as `replied` when a response arrives.

```bash
# Check now
npm run outreach:check-replies

# Wait 30 minutes, then check (run in background or separate terminal)
npm run outreach:watch-replies

# Or after a specific send:
node scripts/outreach-agent.mjs --id blaney-mcmurtry-shawn-wolfson --send &
node scripts/outreach-reply-check.mjs --wait-minutes 30
```

### 6. Track results

Statuses in `law-firms-pilot.json`:

- `pending` → not sent
- `sent` → email delivered
- `replied` → got a response (auto-detected by reply checker)
- `skipped` → do not contact

## Environment (`.env.local`)

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@trustcredo.com
SMTP_PASS=your-app-password
SMTP_FROM_EMAIL=Kristina <Kristina@trustcredo.com>

OUTREACH_FROM_EMAIL=Kristina <Kristina@trustcredo.com>
OUTREACH_REPLY_TO=Kristina@trustcredo.com
OUTREACH_BCC=your-personal@gmail.com
OUTREACH_SENDER_NAME=Kristina
```

**Common SMTP providers:**

| Provider | Host | Port | Secure |
|----------|------|------|--------|
| Gmail (app password) | `smtp.gmail.com` | 587 | false |
| Microsoft 365 | `smtp.office365.com` | 587 | false |
| Zoho | `smtp.zoho.com` | 587 | false |
| SendGrid SMTP | `smtp.sendgrid.net` | 587 | false |

Use an app-specific password, not your main account password.

## Compliance notes

- Only email **public business addresses** published on firm websites
- Include a clear opt-out line if scaling beyond pilot
- Start with 1–2 emails; wait 5–7 days before follow-up
- Do not send attachments on first touch

## Follow-up (day 5)

Subject: `Re: Identity-verified signatures for {{firmName}}`

Short bump — offer 10-minute demo on a sample retainer PDF. Link: `https://trustcredo.com/contact?product=trusted-signatures`
