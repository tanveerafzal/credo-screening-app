# Trusted Signatures Outreach Agent

Find law firms, personalize outreach from marketing material, and send pilot emails via Resend.

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

### 4. Send (requires RESEND_API_KEY)

```bash
# Send to one target by id
npm run outreach:send -- --id blaney-mcmurtry-shawn-wolfson

# Send all pending
npm run outreach:send -- --all

# Actually deliver (default is dry-run)
npm run outreach:send -- --id torkin-leonard-rodness --send
```

### 5. Track results

Update `status` in `law-firms-pilot.json`:

- `pending` → not sent
- `sent` → email delivered
- `replied` → got a response
- `skipped` → do not contact

## Environment

```env
RESEND_API_KEY=re_...
OUTREACH_FROM_EMAIL=Tanver Afzal <tanver@trustcredo.com>
OUTREACH_REPLY_TO=tanver@trustcredo.com
OUTREACH_SENDER_NAME=Tanver Afzal
```

Use a Resend-verified domain for `OUTREACH_FROM_EMAIL`.

## Compliance notes

- Only email **public business addresses** published on firm websites
- Include a clear opt-out line if scaling beyond pilot
- Start with 1–2 emails; wait 5–7 days before follow-up
- Do not send attachments on first touch

## Follow-up (day 5)

Subject: `Re: Identity-verified signatures for {{firmName}}`

Short bump — offer 10-minute demo on a sample retainer PDF. Link: `https://trustcredo.com/contact?product=trusted-signatures`
