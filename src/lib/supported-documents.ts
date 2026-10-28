export interface SupportedDocument {
  name: string;
  detail: string;
  capture: string;
}

export interface SupportedCountry {
  id: string;
  name: string;
  summary: string;
  documents: SupportedDocument[];
}

/**
 * Documents the verification flow offers.
 * Canada and the United States have their own cards. Every other country is a passport.
 */
export const SUPPORTED_COUNTRIES: SupportedCountry[] = [
  {
    id: 'canada',
    name: 'Canada',
    summary: 'Provincial and federal photo identification.',
    documents: [
      {
        name: "Driver's licence",
        detail:
          'Alberta, British Columbia, Manitoba, New Brunswick, Newfoundland and Labrador, Nova Scotia, Ontario, Prince Edward Island, Quebec, Saskatchewan, Northwest Territories, Nunavut, and Yukon. The barcode is on the back.',
        capture: 'Front and back',
      },
      {
        name: 'Photo card',
        detail: 'Provincial photo identification cards, including the Ontario Photo Card. The barcode is on the back.',
        capture: 'Front and back',
      },
      {
        name: 'Health card',
        detail: 'Provincial health cards, including the BC Services Card and Quebec health insurance card.',
        capture: 'Front and back',
      },
      {
        name: 'Passport',
        detail: 'Canadian passport photo page, including the machine-readable zone.',
        capture: 'Photo page',
      },
      {
        name: 'Permanent resident card',
        detail: 'The photo on the front and the barcode on the back.',
        capture: 'Front and back',
      },
      {
        name: 'Certificate of Indian Status',
        detail: 'Secure Certificate of Indian Status (SCIS).',
        capture: 'Front and back',
      },
    ],
  },
  {
    id: 'united-states',
    name: 'United States',
    summary: 'State and federal photo identification.',
    documents: [
      {
        name: "Driver's licence",
        detail: 'State driver licences. The barcode is on the back.',
        capture: 'Front and back',
      },
      {
        name: 'State ID',
        detail: 'State identification cards.',
        capture: 'Front',
      },
      {
        name: 'Passport',
        detail: 'U.S. passport photo page, including the machine-readable zone.',
        capture: 'Photo page',
      },
      {
        name: 'Passport card',
        detail: 'U.S. passport card.',
        capture: 'Front',
      },
      {
        name: 'Permanent resident card',
        detail: 'Green card.',
        capture: 'Front',
      },
      {
        name: 'Work permit',
        detail: 'Employment authorization document.',
        capture: 'Front',
      },
    ],
  },
  {
    id: 'other-countries',
    name: 'Other countries',
    summary: 'A passport is the document offered for every country other than Canada and the United States.',
    documents: [
      {
        name: 'Passport',
        detail: 'Photo page with the machine-readable zone, for passports issued by other countries.',
        capture: 'Photo page',
      },
    ],
  },
];
