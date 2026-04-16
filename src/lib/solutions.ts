import { Code2, Database, Layers, Activity, Building2, Cloud, ShoppingBag, Mail } from 'lucide-react';

export interface SolutionConfig {
  slug: string;
  label: string;
  shortDesc: string;
  icon: typeof Code2;
  hero: {
    badge: string;
    title: string;
    subtitle: string;
  };
  features: Array<{ icon: typeof Code2; title: string; desc: string }>;
  deepDives: Array<{ title: string; desc: string; bullets?: string[] }>;
  faqs: Array<{ q: string; a: string }>;
}

export const SOLUTIONS: Record<string, SolutionConfig> = {
  'screening-api': {
    slug: 'screening-api',
    label: 'Screening API',
    shortDesc: 'RESTful API for automated screening',
    icon: Code2,
    hero: {
      badge: 'For Developers',
      title: 'Screening API for Automated Compliance',
      subtitle: 'A RESTful API that connects to 1.2M+ sanctioned entities, PEPs, and criminals. Integrate in minutes, screen in under 3 seconds.',
    },
    features: [
      { icon: Code2, title: 'Simple REST API', desc: 'Send a JSON payload, get results. Works with any language or framework.' },
      { icon: Activity, title: '<3s Response Time', desc: 'Real-time screening against 1.2M+ entities with our optimized matching engine.' },
      { icon: Database, title: '80+ Data Sources', desc: 'OFAC, EU, UN, UK, PEP databases, Interpol, and global regulatory lists in one API.' },
      { icon: Layers, title: 'Smart Matching', desc: 'Name variants (Muhammad/Mohammed), phonetic, transliteration, DOB matching built-in.' },
      { icon: Cloud, title: '99.9% Uptime', desc: 'Cloud-hosted on Google Cloud Platform with redundancy and auto-scaling.' },
      { icon: Mail, title: 'Webhook Callbacks', desc: 'Async delivery with HMAC-signed webhooks for high-volume workflows.' },
    ],
    deepDives: [
      {
        title: 'Integrate in Minutes',
        desc: 'Simple `POST /api/v1/screenings` endpoint with firstName, lastName, DOB, and nationality. No SDKs to install, no complex setup.',
        bullets: ['Works with any HTTP client', 'JSON request/response', 'API key authentication', 'Comprehensive documentation'],
      },
      {
        title: 'Built for Scale',
        desc: 'Handle high-volume screening with rate limits of 5,000 requests per 15-minute window. Enterprise plans offer unlimited throughput.',
        bullets: ['Async webhooks for bulk operations', 'Bulk batch endpoints available', 'Connection pooling on our side', 'Automatic retries with exponential backoff'],
      },
    ],
    faqs: [
      { q: 'How fast is the API?', a: 'Median response time is under 3 seconds. 95th percentile under 5 seconds.' },
      { q: 'What data sources do you screen against?', a: 'OFAC SDN, OFAC Consolidated, EU Sanctions, UN Security Council, UK OFSI, and 80+ other global watchlists aggregated via OpenSanctions.' },
      { q: 'How are results delivered?', a: 'Synchronously in the HTTP response, or asynchronously via webhook callbacks if you prefer.' },
      { q: 'Is there a free tier?', a: 'Yes — 10 free screenings per month with full API access.' },
    ],
  },
  'batch-screening': {
    slug: 'batch-screening',
    label: 'Batch Screening',
    shortDesc: 'High-volume screening with webhooks',
    icon: Layers,
    hero: {
      badge: 'For Enterprise',
      title: 'Batch Screening with Webhooks',
      subtitle: 'Screen thousands of entities in parallel. Results delivered via webhook callbacks when complete.',
    },
    features: [
      { icon: Layers, title: 'Bulk Upload', desc: 'Submit up to 10,000 entities per batch via CSV or API.' },
      { icon: Activity, title: 'Parallel Processing', desc: 'Multiple screenings processed concurrently for maximum throughput.' },
      { icon: Mail, title: 'Webhook Delivery', desc: 'Results sent to your endpoint with HMAC-SHA256 signatures.' },
      { icon: Database, title: 'Audit Reports', desc: 'Download full CSV/JSON audit reports for every batch.' },
      { icon: Cloud, title: 'Reliable Delivery', desc: 'Automatic retries with exponential backoff on webhook failures.' },
      { icon: Code2, title: 'Status Dashboard', desc: 'Track batch progress and results from your admin dashboard.' },
    ],
    deepDives: [
      { title: 'Built for Volume', desc: 'Process millions of screenings per month without hitting rate limits. Perfect for onboarding waves, periodic reviews, and portfolio screening.' },
      { title: 'Async Architecture', desc: 'Submit batches, receive webhook callbacks, download reports — all without blocking your application.' },
    ],
    faqs: [
      { q: 'How large can a batch be?', a: 'Up to 10,000 entities per batch. Split larger jobs across multiple batches.' },
      { q: 'How do I receive results?', a: 'Via HMAC-signed webhook callbacks, or fetch from our API when complete.' },
      { q: 'What happens if a webhook fails?', a: 'We retry up to 3 times with exponential backoff (1s, 5s, 15s).' },
    ],
  },
  'manual-screening': {
    slug: 'manual-screening',
    label: 'Manual Screening',
    shortDesc: 'Web portal for compliance teams',
    icon: Building2,
    hero: {
      badge: 'No-Code',
      title: 'Manual Screening Portal',
      subtitle: 'A web portal for compliance teams — screen partners one-by-one or upload a spreadsheet. No integration required.',
    },
    features: [
      { icon: Building2, title: 'Web Interface', desc: 'Screen individuals directly through our dashboard with no coding required.' },
      { icon: Layers, title: 'Excel Upload', desc: 'Bulk screen via CSV or Excel file upload.' },
      { icon: Database, title: 'PDF Reports', desc: 'Generate downloadable PDF audit reports for each screening.' },
      { icon: Activity, title: 'Search History', desc: 'Full searchable history of all screenings performed by your team.' },
      { icon: Cloud, title: 'Team Access', desc: 'Multiple team members with role-based access controls.' },
      { icon: Code2, title: 'Export Options', desc: 'Export results as PDF, CSV, or JSON for compliance records.' },
    ],
    deepDives: [
      { title: 'Zero Implementation', desc: 'Sign up, log in, start screening. No code required, no IT tickets, no SDKs.' },
      { title: 'Audit-Ready Reports', desc: 'Every screening produces a PDF report with timestamp, matched entities, and compliance officer notes.' },
    ],
    faqs: [
      { q: 'Do I need technical skills?', a: 'No. Anyone who can use a web browser can screen and download reports.' },
      { q: 'Can multiple team members use it?', a: 'Yes. Paid plans include team access with individual logins and audit trails.' },
    ],
  },
  'continuous-monitoring': {
    slug: 'continuous-monitoring',
    label: 'Continuous Monitoring',
    shortDesc: 'Stay compliant 24/7',
    icon: Activity,
    hero: {
      badge: 'Always-On Compliance',
      title: 'Continuous Monitoring',
      subtitle: 'Automatically re-screen your entire customer base every time watchlists are updated. Real-time alerts when status changes.',
    },
    features: [
      { icon: Activity, title: '24/7 Monitoring', desc: 'Automatic re-screening every time a watchlist updates (hourly for critical lists).' },
      { icon: Mail, title: 'Real-Time Alerts', desc: 'Webhook or email alerts the moment a customer appears on a watchlist.' },
      { icon: Database, title: 'Allowlists & Denylists', desc: 'Mark known false positives to reduce alert fatigue.' },
      { icon: Layers, title: 'Risk Scoring', desc: 'Prioritize alerts by match confidence and list severity.' },
      { icon: Cloud, title: 'Complete Audit Trail', desc: 'Historical record of every re-screening event for regulatory review.' },
      { icon: Code2, title: 'API Access', desc: 'Programmatically manage monitored entities and alert webhooks.' },
    ],
    deepDives: [
      { title: 'Stay Ahead of Sanctions Changes', desc: 'Sanctions lists change daily. Miss one update and you could be onboarding a newly-sanctioned party.' },
      { title: 'Reduce False Positive Fatigue', desc: 'Smart allowlists let you mark known-clean entities so alerts only fire on genuinely new matches.' },
    ],
    faqs: [
      { q: 'How often are customers re-screened?', a: 'Every time a relevant watchlist updates — critical sanctions lists refresh hourly, others daily.' },
      { q: 'How do I receive alerts?', a: 'Via webhook, email, or both. Configure in your dashboard.' },
    ],
  },
};

export const SOLUTIONS_LIST = Object.values(SOLUTIONS);
