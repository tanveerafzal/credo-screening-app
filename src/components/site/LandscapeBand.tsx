import Image from 'next/image';
import { Container } from './Canvas';

/** Full-canvas art band. The image is decorative; the label names it for assistive tech. */
export function LandscapeBand({
  src = '/art/canadian-shield-band.webp',
  label = 'Engraved landscape of a lake on the Canadian Shield',
  position = 'center 62%',
}: {
  src?: string;
  label?: string;
  position?: string;
}) {
  return (
    <div className="border-t border-border px-0 md:px-12">
      <Container>
        <figure role="img" aria-label={label} className="relative m-0 h-44 overflow-hidden sm:h-60 md:h-72">
          <Image src={src} alt="" fill sizes="(max-width: 1440px) 100vw, 84rem" className="object-cover" style={{ objectPosition: position }} />
        </figure>
      </Container>
    </div>
  );
}
