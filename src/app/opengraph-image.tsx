import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Token Generator - 다양한 형식의 보안 토큰 생성';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%)',
          position: 'relative',
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #a855f7, #ec4899)',
            opacity: 0.3,
            filter: 'blur(80px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -80,
            left: -80,
            width: 350,
            height: 350,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #00f5ff, #a855f7)',
            opacity: 0.3,
            filter: 'blur(80px)',
          }}
        />

        {/* Icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 120,
            height: 120,
            borderRadius: 28,
            background: 'linear-gradient(135deg, #00f5ff, #a855f7)',
            marginBottom: 32,
            boxShadow: '0 0 60px rgba(0, 245, 255, 0.5)',
          }}
        >
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            fontSize: 72,
            fontWeight: 700,
            color: '#f0f0f5',
            letterSpacing: '-0.02em',
            marginBottom: 16,
          }}
        >
          Token Generator
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: 'flex',
            fontSize: 32,
            color: '#a0a0b0',
            marginBottom: 48,
          }}
        >
          다양한 형식의 보안 토큰 생성
        </div>

        {/* Feature tags */}
        <div
          style={{
            display: 'flex',
            gap: 16,
          }}
        >
          {['UUID', 'API Key', 'JWT', 'Base64', 'Hex', 'OTP'].map((tag) => (
            <div
              key={tag}
              style={{
                padding: '12px 24px',
                borderRadius: 12,
                background: 'rgba(168, 85, 247, 0.2)',
                border: '1px solid rgba(168, 85, 247, 0.4)',
                color: '#a855f7',
                fontSize: 24,
                fontWeight: 600,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
