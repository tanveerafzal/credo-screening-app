import Script from 'next/script';

const DEFAULT_GA_ID = 'G-YRBBRJSSHG';

function resolveGaId(): string | undefined {
  const fromEnv = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  if (fromEnv) return fromEnv;
  if (process.env.NODE_ENV === 'production') return DEFAULT_GA_ID;
  return undefined;
}

export function GoogleAnalytics() {
  const gaId = resolveGaId();
  if (!gaId) return null;

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
