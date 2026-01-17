import type { Metadata } from 'next';
import './globals.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://token-generator.example.com';
const SITE_NAME = 'Token Generator';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Token Generator - 다양한 형식의 보안 토큰 생성',
    template: '%s | Token Generator',
  },
  description: 'UUID, API Key, Bearer Token, Base64, Hex 등 15가지 형식의 보안 토큰을 쉽고 빠르게 생성하세요. 개발자를 위한 무료 온라인 토큰 생성기입니다.',
  keywords: [
    '토큰 생성기',
    'token generator',
    'UUID 생성',
    'UUID v4',
    'UUID v7',
    'API Key 생성',
    'Bearer Token',
    'JWT 토큰',
    'Base64 인코딩',
    'Hex 문자열',
    'OTP 생성',
    '랜덤 문자열 생성',
    '보안 토큰',
    '개발자 도구',
    'developer tools',
    'random string generator',
    'secure token',
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    alternateLocale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Token Generator - 다양한 형식의 보안 토큰 생성',
    description: 'UUID, API Key, Bearer Token, Base64, Hex 등 15가지 형식의 보안 토큰을 쉽고 빠르게 생성하세요. 개발자를 위한 무료 온라인 토큰 생성기입니다.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Token Generator - 보안 토큰 생성기',
    description: 'UUID, API Key, Bearer Token 등 15가지 형식의 보안 토큰을 쉽고 빠르게 생성하세요.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      'ko-KR': SITE_URL,
    },
  },
  category: 'technology',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Token Generator',
  description: 'UUID, API Key, Bearer Token, Base64, Hex 등 15가지 형식의 보안 토큰을 생성하는 무료 온라인 도구',
  url: SITE_URL,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'KRW',
  },
  featureList: [
    'UUID v1, v4, v7 생성',
    'API Key 생성',
    'Bearer Token (JWT 스타일) 생성',
    'Base64 문자열 생성',
    'Hex 문자열 생성',
    'OTP 숫자 생성',
    '랜덤 문자열 생성',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a0a0f" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
