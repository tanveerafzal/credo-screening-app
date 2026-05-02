import Image from 'next/image';

interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export function Logo({ size = 32, className = '', showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <Image src="/logo.svg" alt="Credo" width={size} height={size} />
      {showText && (
        <div className="flex items-center gap-2.5">
          <span className="text-lg font-bold text-accent">Credo</span>
          <span className="hidden sm:block w-px h-5 bg-border" />
          <span className="hidden sm:block text-[11px] text-text-muted leading-tight max-w-[160px]">
            Trusted Background &amp; Verification Screening Services
          </span>
        </div>
      )}
    </div>
  );
}

export function LogoIcon({ size = 32, className = '' }: { size?: number; className?: string }) {
  return <Image src="/logo.svg" alt="Credo" width={size} height={size} className={className} />;
}
