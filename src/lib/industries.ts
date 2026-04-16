import {
  Landmark, Banknote, Shield, Heart, Coins, Laptop,
  ShoppingCart, Factory, Gamepad2, Briefcase, Home, HandHeart
} from 'lucide-react';

export interface IndustryConfig {
  slug: string;
  label: string;
  shortDesc: string;
  icon: typeof Landmark;
  hero: {
    badge: string;
    title: string;
    subtitle: string;
  };
  painPoints: Array<{ title: string; desc: string }>;
  useCases: string[];
}

export const INDUSTRIES: Record<string, IndustryConfig> = {
  'financial-institutions': {
    slug: 'financial-institutions',
    label: 'Financial Institutions',
    shortDesc: 'Banks, credit unions, wealth managers',
    icon: Landmark,
    hero: {
      badge: 'Regulated Finance',
      title: 'AML Screening for Financial Institutions',
      subtitle: 'From community banks to global investment firms — our screening solutions meet the strictest regulatory requirements.',
    },
    painPoints: [
      { title: 'Regulatory Penalties', desc: 'FinCEN, OCC, and FCA fines for AML failures can reach hundreds of millions. We keep you compliant.' },
      { title: 'Onboarding Friction', desc: 'Instant screening lets you approve compliant customers in seconds without manual review.' },
      { title: 'Ongoing Monitoring', desc: 'Continuously re-screen your entire customer base to catch sanctions additions between onboarding and transactions.' },
    ],
    useCases: ['Customer onboarding', 'Correspondent banking', 'Wire transfer screening', 'Beneficial ownership checks', 'Portfolio monitoring'],
  },
  'fintech': {
    slug: 'fintech',
    label: 'FinTech',
    shortDesc: 'Payments, lending, neobanks',
    icon: Banknote,
    hero: {
      badge: 'Fast-Moving Fintech',
      title: 'AML Screening for FinTechs',
      subtitle: 'Developer-friendly API that fits your stack. Screen customers at onboarding and transaction time without slowing down your growth.',
    },
    painPoints: [
      { title: 'Scale Without Limits', desc: 'From 100 to 1 million customers — our API scales with you. No platform migrations needed.' },
      { title: 'Developer Experience', desc: 'REST API, webhook callbacks, comprehensive docs. Get integrated in an afternoon.' },
      { title: 'Cost-Effective Compliance', desc: 'Usage-based pricing — pay only for what you screen. No per-seat licenses or minimum commitments.' },
    ],
    useCases: ['KYC onboarding', 'Transaction monitoring', 'Merchant screening', 'P2P payment screening', 'Lending due diligence'],
  },
  'insurance': {
    slug: 'insurance',
    label: 'Insurance',
    shortDesc: 'Carriers, MGAs, brokers',
    icon: Shield,
    hero: {
      badge: 'Insurance Compliance',
      title: 'AML Screening for Insurance',
      subtitle: 'Mitigate regulatory risk across life, P&C, and reinsurance. Screen policyholders, beneficiaries, and intermediaries in seconds.',
    },
    painPoints: [
      { title: 'Beneficiary Screening', desc: 'Screen all beneficiaries and intermediaries, not just primary policyholders.' },
      { title: 'Claims Processing', desc: 'Screen claim payees before disbursing funds to avoid sanctions violations.' },
      { title: 'Agent & Broker Due Diligence', desc: 'Screen all producers in your network before appointment.' },
    ],
    useCases: ['Policy issuance', 'Claim payee screening', 'Broker appointment', 'Reinsurance placement', 'Annuitant screening'],
  },
  'insurtech': {
    slug: 'insurtech',
    label: 'InsurTech',
    shortDesc: 'Digital insurance platforms',
    icon: Heart,
    hero: {
      badge: 'Digital-First Insurance',
      title: 'AML Screening for InsurTechs',
      subtitle: 'API-first screening for innovative insurance platforms. Embed compliance into your digital customer journey.',
    },
    painPoints: [
      { title: 'Instant Quote-to-Bind', desc: 'Screen in the background without disrupting the user flow. Results in under 3 seconds.' },
      { title: 'Embedded Compliance', desc: 'Make screening part of your white-label insurance offering.' },
      { title: 'No Platform Lock-In', desc: 'Simple REST API works with any tech stack — Node, Python, Go, Ruby, whatever.' },
    ],
    useCases: ['Embedded insurance', 'Direct-to-consumer platforms', 'Aggregator websites', 'Parametric insurance', 'Usage-based insurance'],
  },
  'crypto': {
    slug: 'crypto',
    label: 'Crypto',
    shortDesc: 'Exchanges, wallets, DeFi',
    icon: Coins,
    hero: {
      badge: 'Crypto Compliance',
      title: 'AML Screening for Crypto',
      subtitle: 'OFAC-compliant screening for exchanges, wallets, and DeFi platforms. Screen users, counterparties, and wallet addresses.',
    },
    painPoints: [
      { title: 'FATF Travel Rule', desc: 'Screen both originator and beneficiary for crypto transfers above the FATF threshold.' },
      { title: 'Sanctioned Addresses', desc: 'Check wallet addresses against OFAC SDN\'s crypto address list.' },
      { title: 'Low Data Signups', desc: 'Screen with just name and email — our fuzzy matching handles incomplete identity data.' },
    ],
    useCases: ['User KYC', 'Travel Rule compliance', 'Wallet screening', 'OTC trading', 'Institutional onboarding'],
  },
  'saas': {
    slug: 'saas',
    label: 'SaaS',
    shortDesc: 'B2B software platforms',
    icon: Laptop,
    hero: {
      badge: 'SaaS Compliance',
      title: 'AML Screening for SaaS',
      subtitle: 'Screen your B2B customers and their end-users. Prevent sanctioned entities from using your platform.',
    },
    painPoints: [
      { title: 'Sanctions Enforcement', desc: 'US, EU, and UK regulators increasingly fine SaaS providers for serving sanctioned customers.' },
      { title: 'Multi-Tenant Architecture', desc: 'Screen company admins, tenant users, and billing contacts separately.' },
      { title: 'Global Expansion', desc: 'Entering new markets means new compliance requirements. Our global coverage has you covered.' },
    ],
    useCases: ['Customer onboarding', 'Tenant admin screening', 'End-user verification', 'Expansion to regulated markets', 'Export control compliance'],
  },
  'retail': {
    slug: 'retail',
    label: 'Retail',
    shortDesc: 'E-commerce & marketplaces',
    icon: ShoppingCart,
    hero: {
      badge: 'Retail & E-commerce',
      title: 'AML Screening for Retail',
      subtitle: 'Screen high-value customers, marketplace sellers, and international buyers for sanctions compliance.',
    },
    painPoints: [
      { title: 'High-Value Purchases', desc: 'Luxury goods, jewelry, art, and electronics are high-risk for sanctions evasion.' },
      { title: 'Marketplace Sellers', desc: 'Vet third-party sellers on your platform before allowing product listings.' },
      { title: 'Cross-Border Shipping', desc: 'Ensure recipient addresses aren\'t on restricted country/entity lists.' },
    ],
    useCases: ['High-value checkout', 'Marketplace seller onboarding', 'B2B wholesale orders', 'International shipping', 'Return fraud screening'],
  },
  'manufacturing': {
    slug: 'manufacturing',
    label: 'Manufacturing',
    shortDesc: 'Supply chain & vendor screening',
    icon: Factory,
    hero: {
      badge: 'Supply Chain',
      title: 'Supply Chain Screening for Manufacturers',
      subtitle: 'Screen suppliers, distributors, and end-customers to comply with export controls and economic sanctions.',
    },
    painPoints: [
      { title: 'Export Control Violations', desc: 'BIS, EAR, and ITAR violations result in massive fines and loss of export privileges.' },
      { title: 'Vendor Risk', desc: 'One sanctioned supplier can halt your production. Screen before contracting.' },
      { title: 'Distributor Networks', desc: 'Screen all parties in your distribution chain to ensure end-use compliance.' },
    ],
    useCases: ['Supplier onboarding', 'Customer due diligence', 'End-use verification', 'Distributor screening', 'Export control compliance'],
  },
  'gaming-gambling': {
    slug: 'gaming-gambling',
    label: 'Gaming & Gambling',
    shortDesc: 'Online gambling & sportsbooks',
    icon: Gamepad2,
    hero: {
      badge: 'iGaming Compliance',
      title: 'AML Screening for Gaming & Gambling',
      subtitle: 'Tightening regulations demand robust KYC. Screen players at signup and high-value transactions.',
    },
    painPoints: [
      { title: 'Regulatory Scrutiny', desc: 'Gaming regulators are increasingly demanding robust AML controls. Avoid license risks.' },
      { title: 'PEP Identification', desc: 'Politically exposed players require enhanced due diligence.' },
      { title: 'Cross-Jurisdiction Play', desc: 'Screen across global PEP and sanctions databases for international players.' },
    ],
    useCases: ['Player onboarding', 'High-value deposit/withdrawal', 'VIP player screening', 'Affiliate due diligence', 'License renewal'],
  },
  'professional-services': {
    slug: 'professional-services',
    label: 'Professional Services',
    shortDesc: 'Law, accounting, consulting',
    icon: Briefcase,
    hero: {
      badge: 'Professional Services',
      title: 'Client Screening for Professional Services',
      subtitle: 'Law firms, accounting firms, and consultancies — screen clients to meet KYC/AML obligations.',
    },
    painPoints: [
      { title: 'Client Intake Obligations', desc: 'Bar associations and accounting bodies increasingly require client screening.' },
      { title: 'Beneficial Ownership', desc: 'Identify UBOs behind corporate clients to comply with beneficial ownership rules.' },
      { title: 'PEP Due Diligence', desc: 'Enhanced screening for politically exposed clients and their family members.' },
    ],
    useCases: ['Client onboarding', 'UBO screening', 'M&A target due diligence', 'Litigation counterparty checks', 'PEP identification'],
  },
  'real-estate': {
    slug: 'real-estate',
    label: 'Real Estate',
    shortDesc: 'Brokers, developers, agents',
    icon: Home,
    hero: {
      badge: 'Real Estate Compliance',
      title: 'AML Screening for Real Estate',
      subtitle: 'High-value transactions demand rigorous buyer screening. Comply with real estate AML regulations globally.',
    },
    painPoints: [
      { title: 'All-Cash Purchases', desc: 'High-risk transactions that require enhanced buyer due diligence.' },
      { title: 'Foreign Buyers', desc: 'International buyers require screening against global sanctions and PEP databases.' },
      { title: 'Title Company Exposure', desc: 'Title companies and escrow agents face direct liability for AML failures.' },
    ],
    useCases: ['Buyer screening', 'Seller verification', 'UBO on corporate buyers', 'Commercial real estate deals', 'International buyer due diligence'],
  },
  'ngo': {
    slug: 'ngo',
    label: 'NGO / Non-Profit',
    shortDesc: 'Charities & foundations',
    icon: HandHeart,
    hero: {
      badge: 'NGO Compliance',
      title: 'Screening for NGOs and Non-Profits',
      subtitle: 'Protect your mission from being misused for money laundering or terrorist financing. Screen donors, grantees, and partners.',
    },
    painPoints: [
      { title: 'Donor Screening', desc: 'Ensure large donations aren\'t from sanctioned individuals or organizations.' },
      { title: 'Grantee Due Diligence', desc: 'Verify grant recipients aren\'t on terrorism-related watchlists.' },
      { title: 'Partner Vetting', desc: 'Screen implementation partners in high-risk jurisdictions.' },
    ],
    useCases: ['Large donor screening', 'Grantee vetting', 'Implementation partner checks', 'High-risk country operations', 'Board member screening'],
  },
};

export const INDUSTRIES_LIST = Object.values(INDUSTRIES);
