export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  dateLabel: string;
  author: string;
  authorTitle: string;
  category: string;
  keywords: string[];
  body: BlogBlock[];
}

export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] };

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'when-identity-verification-fails',
    title: 'When Identity Verification Fails, It Doesn’t Always Mean the Person Failed.',
    subtitle:
      'How modern identity verification can improve digital success rates without compromising security',
    description:
      'A failed identity check is not always fraud. Credit-based questions leave out newcomers and thin-file applicants. Modern document and biometric verification can confirm more legitimate people digitally.',
    date: '2026-10-24',
    dateLabel: 'October 24, 2026',
    author: 'Muhammad Asim',
    authorTitle: 'Blogger',
    category: 'Identity verification',
    keywords: [
      'identity verification',
      'digital onboarding',
      'knowledge-based authentication',
      'credit-based verification',
      'government ID verification',
      'liveness detection',
    ],
    body: [
      {
        type: 'p',
        text: 'Digital identity verification has become an essential part of onboarding customers, employees, applicants, and citizens.',
      },
      {
        type: 'p',
        text: 'But there’s an important challenge that organizations need to consider: a failed verification doesn’t necessarily mean the individual isn’t legitimate. Sometimes, the verification method simply wasn’t able to verify them.',
      },
      {
        type: 'h2',
        text: 'The limitations of credit-based verification',
      },
      {
        type: 'p',
        text: 'Some digital services rely on knowledge-based authentication, where individuals answer questions generated from information contained in their credit file.',
      },
      {
        type: 'p',
        text: 'For people with established credit histories, this can provide a convenient verification method.',
      },
      {
        type: 'p',
        text: 'But it doesn’t work equally well for everyone.',
      },
      {
        type: 'p',
        text: 'Newcomers may have little or no domestic credit history. Young adults may have thin credit files. Some people intentionally use very little credit. And legitimate users may simply not remember historical financial information accurately.',
      },
      {
        type: 'p',
        text: 'When this happens, an otherwise legitimate applicant may be unable to complete the digital process.',
      },
      {
        type: 'h2',
        text: 'Verification failure is not the same as fraud',
      },
      {
        type: 'p',
        text: 'This distinction is important.',
      },
      {
        type: 'p',
        text: 'An organization shouldn’t have to choose between strong fraud prevention and successfully serving legitimate users.',
      },
      {
        type: 'p',
        text: 'When one identity signal isn’t sufficient, modern identity verification can provide additional trusted methods of establishing identity.',
      },
      {
        type: 'p',
        text: 'Depending on the use case and required assurance level, these can include:',
      },
      {
        type: 'ul',
        items: [
          'Government-issued identity document verification',
          'Document authenticity and security checks',
          'Facial matching and liveness detection',
          'Additional identity and risk signals',
          'Risk-based verification workflows',
        ],
      },
      {
        type: 'p',
        text: 'Instead of treating every unsuccessful verification attempt in the same way, organizations can create secure alternative paths for legitimate users.',
      },
      {
        type: 'h2',
        text: 'The goal: higher assurance with less friction',
      },
      {
        type: 'p',
        text: 'The objective isn’t to make identity verification easier to pass.',
      },
      {
        type: 'p',
        text: 'It’s to verify more legitimate people digitally while maintaining the required level of identity assurance and fraud protection.',
      },
      {
        type: 'p',
        text: 'Done correctly, this can help organizations reduce unnecessary verification failures, decrease manual processing, improve digital completion rates, and provide a more inclusive customer experience.',
      },
      {
        type: 'h2',
        text: 'Identity verification should work for more people',
      },
      {
        type: 'p',
        text: 'Digital services continue to become the primary way organizations interact with customers and citizens.',
      },
      {
        type: 'p',
        text: 'Identity infrastructure needs to evolve with them.',
      },
      {
        type: 'p',
        text: 'A person’s ability to establish their identity digitally shouldn’t depend solely on whether they have an extensive credit history.',
      },
      {
        type: 'p',
        text: 'At Trust Credo, we believe modern identity verification should combine strong security with intelligent verification journeys that help legitimate users prove who they are.',
      },
      {
        type: 'p',
        text: 'High assurance. Less friction. More legitimate users successfully verified.',
      },
    ],
  },
];

export const BLOG_POSTS_MAP = Object.fromEntries(BLOG_POSTS.map((post) => [post.slug, post]));

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS_MAP[slug];
}
