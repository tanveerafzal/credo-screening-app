import { Container } from './Canvas';
import { Reveal } from './motion';
import { PixelIcon, type PixelIconName } from './PixelIcon';

export const TRUSTED_BY = ['TRREB / PropTx', 'CoreLogic One Home', 'SkySlope', 'Dominion Lending Centres'];

const CONTROLS: Array<{ icon: PixelIconName; title: string; desc: string }> = [
  { icon: 'globe', title: 'Hosted in Canada', desc: 'All data, including ID images and selfies, is hosted in Canada.' },
  { icon: 'shield', title: 'SOC 2 Type 1', desc: 'Independent SOC 2 Type 1 audit completed.' },
  { icon: 'search', title: 'Penetration tested', desc: 'The platform is tested by an independent third party.' },
  { icon: 'lock', title: 'AES-256 encryption', desc: 'Data encrypted at rest with AES-256 and encrypted in transit.' },
  { icon: 'clock', title: 'Retention you set', desc: 'Each customer decides how long records and images are kept.' },
  { icon: 'id', title: 'FINTRAC client identification', desc: 'Ontario real estate brokerages use Credo through PropTx Verify to identify their clients.' },
];

/** Logo-free customer row. Names are set in type; no borrowed logos. */
export function TrustedByRow() {
  return (
    <section className="border-t border-border px-0 md:px-12" aria-label="Customers">
      <Container className="grid items-center gap-6 px-6 py-8 md:grid-cols-12 md:px-8">
        <p className="text-sm text-tertiary md:col-span-3">Trusted by</p>
        <ul className="flex flex-wrap items-center gap-x-10 gap-y-3 md:col-span-9 md:justify-end">
          {TRUSTED_BY.map((name) => (
            <li key={name} className="text-[1.0625rem] font-medium tracking-[-0.02em] text-foreground-highlight">
              {name}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function TrustSection({ id = 'security' }: { id?: string }) {
  return (
    <section id={id} className="scroll-mt-16 border-t border-border px-0 md:px-12">
      <Container className="grid lg:grid-cols-12">
        <div className="border-b border-border px-6 py-16 md:px-8 md:py-20 lg:col-span-5 lg:border-b-0 lg:border-r">
          <h2 className="text-2xl leading-tight sm:text-[2rem]">Security and compliance</h2>
          <p className="mt-5 max-w-md text-base leading-[1.75] text-muted">
            Credo runs the identity verification and screening behind PropTx Verify, carrying more than 8,000 screening reports a month for TRREB.
          </p>
          <p className="mt-8 text-sm text-tertiary">Trusted by</p>
          <ul className="mt-2 space-y-1">
            {TRUSTED_BY.map((name) => (
              <li key={name} className="font-medium tracking-[-0.015em] text-foreground-highlight">{name}</li>
            ))}
          </ul>
        </div>
        <div className="cells-clip lg:col-span-7">
        <Reveal as="ul" className="reveal-cells cells sm:grid-cols-2">
          {CONTROLS.map((c) => (
            <li key={c.title} className="px-6 py-8 md:px-8">
              <PixelIcon name={c.icon} size={28} />
              <h3 className="mt-4 text-base leading-snug tracking-[-0.015em]">{c.title}</h3>
              <p className="mt-1.5 text-[0.9375rem] leading-[1.65] text-muted">{c.desc}</p>
            </li>
          ))}
        </Reveal>
        </div>
      </Container>
    </section>
  );
}
