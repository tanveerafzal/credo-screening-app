import { Briefcase, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Job {
  slug: string;
  title: string;
  department: string;
  location: string;
  locationType: string;
  employmentType: string;
  compensation: string;
  icon: LucideIcon;
  shortDesc: string;
  about: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  whyJoin: { title: string; desc: string }[];
}

export const JOBS: Job[] = [
  {
    slug: 'account-executive',
    title: 'Sales Account Executive',
    department: 'Sales',
    location: 'Remote (US & Canada)',
    locationType: 'Remote',
    employmentType: 'Full time',
    compensation: '$65K – $110K • Equity • Commission',
    icon: Briefcase,
    shortDesc: 'Drive new business across fintech, financial services, insurance, crypto, and other regulated industries.',
    about: 'We\'re looking for a high-energy Account Executive to drive new business across our target markets: fintech, financial services, insurance, crypto, SaaS, real estate, and professional services. You\'ll own the full sales cycle — from prospecting to close — selling a product that compliance teams genuinely need and that practically demos itself.\n\nThis isn\'t enterprise sales with 18-month cycles. Our price point ($0.99/check) and self-serve free tier mean you\'re often closing within weeks. The best reps here will combine outbound hustle with a consultative approach, helping prospects understand how CredoScreening fits into their compliance workflow.\n\nYou\'ll be one of the first sales hires — which means you\'ll have an outsized impact on how we sell, who we sell to, and how fast we grow.',
    responsibilities: [
      'Own the full sales cycle from outbound prospecting through close, focusing on mid-market and enterprise accounts',
      'Build and manage pipeline across target industries (fintech, financial services, insurance, crypto, SaaS, real estate)',
      'Run product demos and discovery calls, translating compliance pain points into CredoScreening solutions',
      'Partner with the founding team to shape pricing, packaging, and go-to-market strategy',
      'Develop outbound sequences targeting compliance officers, risk managers, and engineering leads',
      'Close deals ranging from self-serve upgrades to enterprise contracts with custom integrations',
      'Build relationships with key accounts and identify expansion opportunities',
      'Maintain clean CRM hygiene and provide accurate forecasting',
      'Gather customer feedback and competitive intelligence to inform product and marketing decisions',
      'Represent CredoScreening at industry events, conferences, and webinars focused on compliance, AML, and KYC',
    ],
    requirements: [
      '2+ years of B2B SaaS sales experience with a track record of meeting or exceeding quota',
      'Experience selling to compliance, risk, legal, or security buyers — or strong interest in learning the space',
      'Comfort selling a technical product (API, integrations, webhooks) to both technical and non-technical stakeholders',
      'Strong outbound skills — you know how to build pipeline from scratch, not just work inbound leads',
      'Excellent communication and demo skills — you can explain complex compliance concepts in plain language',
      'Self-starter mentality — you thrive with autonomy and don\'t need a playbook handed to you',
      'Familiarity with compliance concepts (AML, KYC, sanctions screening, PEP) is a strong plus but not required',
      'Experience with sales tools such as HubSpot, Apollo, LinkedIn Sales Navigator, and Slack',
    ],
    niceToHave: [
      'Experience selling into regulated industries (finance, insurance, crypto, gaming)',
      'Background in compliance, regtech, or identity verification',
      'Experience as an early sales hire at a startup',
      'Technical aptitude — you can walk through API docs and speak credibly about integrations',
    ],
    whyJoin: [
      { title: 'Early-stage impact', desc: 'You\'ll be one of the first sales hires. Your work will directly shape revenue trajectory and go-to-market strategy.' },
      { title: 'Product that sells itself', desc: '$0.99/check, free trial, instant results. Shorter sales cycles and higher conversion.' },
      { title: 'Massive market', desc: 'Every regulated business needs screening. AML/KYC compliance is mandatory, not optional.' },
      { title: 'Competitive comp', desc: 'Base + uncapped commission + equity. We want you to earn well when you perform.' },
      { title: 'Remote-first', desc: 'Work from anywhere in the US or Canada. We care about results, not office hours.' },
    ],
  },
  {
    slug: 'security-privacy-analyst',
    title: 'Security & Privacy Analyst',
    department: 'Security & Compliance',
    location: 'Remote (US & Canada)',
    locationType: 'Remote',
    employmentType: 'Full time',
    compensation: '$100K – $145K • Equity',
    icon: ShieldCheck,
    shortDesc: 'Build and operationalize our security and privacy compliance programs from the ground up.',
    about: 'We\'re looking for a Security & Privacy Analyst to build and operationalize our security and privacy compliance programs from the ground up.\n\nYou\'ll be responsible for implementing controls, driving audit readiness, managing vendor and customer security assessments, and ensuring CredoScreening meets the compliance bar our regulated customers demand. This means working across engineering, infrastructure, and leadership to embed security and privacy into how we build, ship, and operate.\n\nThis is a hands-on role at an early-stage company. You won\'t just maintain compliance checklists — you\'ll define the policies, build the processes, and work directly with customers who need assurance that their data is handled with the highest standard of care. If you want to own a security program rather than just support one, this is the role.',
    responsibilities: [
      'Build and maintain CredoScreening\'s security and privacy compliance programs (SOC 2, GDPR, CCPA/CPRA)',
      'Implement and monitor security controls across infrastructure, application, and data handling processes',
      'Lead security and privacy audits, assessments, and certification efforts',
      'Own customer security questionnaires, vendor assessments, and due diligence reviews — partnering with sales to unblock enterprise deals',
      'Define and enforce data handling policies for sensitive data: biometric data, government ID images, screening results, and PII',
      'Partner with engineering to ensure secure development practices — encryption, access controls, key management, and data retention',
      'Manage the biometric data lifecycle — ensuring data is encrypted during verification and deleted immediately after',
      'Identify privacy and security risks across the platform and drive remediation',
      'Develop and maintain security documentation: policies, procedures, incident response plans, and data processing agreements',
      'Support customer compliance inquiries — regulated customers will need detailed answers about our security posture',
      'Monitor regulatory changes in data privacy, biometric data laws, and AML/KYC requirements',
      'Manage relationships with external auditors, penetration testers, and security vendors',
    ],
    requirements: [
      '3–6 years of experience in security, privacy, compliance, or risk management',
      'Experience building or contributing to SOC 2, ISO 27001, or similar compliance programs',
      'Familiarity with privacy regulations: GDPR, CCPA/CPRA, BIPA, or other biometric data laws',
      'Understanding of cloud security fundamentals (GCP, AWS, or Azure)',
      'Experience completing security questionnaires and supporting enterprise sales cycles',
      'Strong ability to work cross-functionally with engineering, legal, and leadership',
      'Excellent documentation skills — you can write clear policies, not just check boxes',
      'Comfortable operating with autonomy in a fast-paced, early-stage environment',
    ],
    niceToHave: [
      'Experience at a company handling biometric data, identity verification, or background screening',
      'Familiarity with AML/KYC compliance requirements and how they affect data handling',
      'CIPP, CISSP, CISA, or similar certifications',
      'Experience with GCP security tooling (Cloud Armor, IAM, Security Command Center)',
      'Previous early-stage startup experience — you\'ve built a compliance program from scratch',
      'Experience with penetration testing coordination and vulnerability management',
    ],
    whyJoin: [
      { title: 'Own the program', desc: 'You\'ll define and build CredoScreening\'s security and privacy program from the ground up.' },
      { title: 'High-impact data', desc: 'We handle government IDs, biometrics, and sanctions data. The security work here is real and meaningful.' },
      { title: 'Customer-facing influence', desc: 'Your work directly enables enterprise sales. When a bank asks "are you SOC 2 compliant?", your work is the answer.' },
      { title: 'Growing market', desc: 'AML/KYC compliance is mandatory for regulated industries. As our customer base grows, so does the importance of this role.' },
      { title: 'Remote-first', desc: 'Work from anywhere in the US or Canada.' },
    ],
  },
];

export const JOBS_MAP: Record<string, Job> = Object.fromEntries(
  JOBS.map((j) => [j.slug, j])
);
