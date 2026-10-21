import Image from 'next/image';
import { Container } from './Canvas';
import { Reveal } from './motion';
import { PixelIcon, type PixelIconName } from './PixelIcon';

/**
 * Customer logos. Files are the official marks, cropped tight, in a
 * single-colour grey plus the original colours (shown on hover).
 * `height` is the optical size in px at scale 1: wide wordmarks sit lower,
 * stacked marks and the solid DLC badge are set so each carries equal weight.
 */
const TRUSTED_BY: Array<{ name: string; file: string; ratio: number; height: number }> = [
  { name: 'Toronto Regional Real Estate Board (TRREB)', file: 'trreb', ratio: 531.31 / 108, height: 30 },
  { name: 'PropTx Verify', file: 'proptx', ratio: 176.35 / 23.91, height: 17 },
  { name: 'CoreLogic One Home', file: 'corelogic', ratio: 79.56 / 60.78, height: 41 },
  { name: 'SkySlope', file: 'skyslope', ratio: 151.85 / 24.5, height: 22 },
  { name: 'Dominion Lending Centres', file: 'dominion-lending-centres', ratio: 213.96 / 110.4, height: 34 },
];

/** Logo wall. Grey at rest; colour fades in on hover (instant with reduced motion). */
function LogoWall({ className }: { className?: string }) {
  return (
    <ul className={className}>
      {TRUSTED_BY.map((logo) => {
        const w = Math.round(logo.height * logo.ratio);
        const size = { height: `calc(${logo.height}px * var(--logo-scale, 1))`, width: `calc(${w}px * var(--logo-scale, 1))` };
        return (
          <li key={logo.file} className="group relative flex-none" style={size}>
            <Image
              src={`/logos/${logo.file}-mono-grey.svg`}
              alt={logo.name}
              width={w}
              height={logo.height}
              className="absolute inset-0 h-full w-full opacity-80 transition-opacity duration-200 group-hover:opacity-0 motion-reduce:transition-none"
            />
            <Image
              src={`/logos/${logo.file}-color.svg`}
              alt=""
              aria-hidden
              width={w}
              height={logo.height}
              className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-200 group-hover:opacity-100 motion-reduce:transition-none"
            />
          </li>
        );
      })}
    </ul>
  );
}

const CONTROLS: Array<{ icon: PixelIconName; title: string; desc: string }> = [
  { icon: 'globe', title: 'Hosted in Canada', desc: 'All data, including ID images and selfies, is hosted in Canada.' },
  { icon: 'shield', title: 'SOC 2 Type 1', desc: 'Independent SOC 2 Type 1 audit completed.' },
  { icon: 'search', title: 'Penetration tested', desc: 'The platform is tested by an independent third party.' },
  { icon: 'lock', title: 'AES-256 encryption', desc: 'Data encrypted at rest with AES-256 and encrypted in transit.' },
  { icon: 'clock', title: 'Retention you set', desc: 'Each customer decides how long records and images are kept.' },
  { icon: 'id', title: 'FINTRAC client identification', desc: 'Ontario real estate brokerages use Credo through PropTx Verify to identify their clients.' },
];

/** Customer logo row under the hero. */
export function TrustedByRow() {
  return (
    <section className="border-t border-border px-0 md:px-12" aria-label="Customers">
      <Container className="grid items-center gap-6 px-6 py-9 md:px-8 lg:grid-cols-12">
        <p className="text-sm text-tertiary lg:col-span-2">Trusted by</p>
        <LogoWall className="flex flex-wrap items-center gap-x-9 gap-y-7 [--logo-scale:0.82] sm:[--logo-scale:0.95] lg:col-span-10 lg:justify-between lg:gap-x-8 lg:[--logo-scale:1]" />
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
          <p className="mt-10 text-sm text-tertiary">Trusted by</p>
          <LogoWall className="mt-5 grid max-w-md grid-cols-2 items-center justify-items-start gap-x-8 gap-y-7 [--logo-scale:0.82] sm:grid-cols-3 sm:[--logo-scale:0.9]" />
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
