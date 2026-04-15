import Image from 'next/image';

interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export function Logo({ size = 32, className = '', showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image src="/logo.svg" alt="CredoScreening" width={size} height={size} />
      {showText && (
        <span className="font-bold text-gray-900">
          Credo<span className="text-indigo-600">Screening</span>
        </span>
      )}
    </div>
  );
}

export function LogoIcon({ size = 32, className = '' }: { size?: number; className?: string }) {
  return <Image src="/logo.svg" alt="CredoScreening" width={size} height={size} className={className} />;
}
