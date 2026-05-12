import Image from 'next/image';

interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export function Logo({ size = 32, className = '', showText = true }: LogoProps) {
  const height = 110;
  // The logo image has a ~2.2:1 aspect ratio
  const width = Math.round(height * 2.2);

  return (
    <div className={`flex items-center ${className}`}>
      {showText ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src="/trustcredo_logo.png"
          alt="Credo — Trusted Background & Verification Screening Services"
          width={width}
          height={height}
          className="hidden sm:block"
        />
      ) : null}
      {/* Mobile: show just the shield icon */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.svg"
        alt="Credo"
        width={size}
        height={size}
        className={showText ? 'sm:hidden' : ''}
      />
    </div>
  );
}

export function LogoIcon({ size = 32, className = '' }: { size?: number; className?: string }) {
  return <Image src="/logo.svg" alt="Credo" width={size} height={size} className={className} />;
}
