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
        <span className="text-lg font-bold text-accent">
          Credo
        </span>
      )}
    </div>
  );
}

export function LogoIcon({ size = 32, className = '' }: { size?: number; className?: string }) {
  return <Image src="/logo.svg" alt="Credo" width={size} height={size} className={className} />;
}
