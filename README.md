# Token Generator

다양한 형식의 보안 토큰을 생성하는 웹 서비스입니다.

## 기능

- **15가지 토큰 타입 지원**
  - Random (64, 128, 256자)
  - UUID (v1, v4, v7)
  - Hex (32, 64자)
  - Base64 (32, 64자)
  - API Key (`sk_live_xxx` 형식)
  - Bearer Token (JWT 스타일)
  - OTP (6, 8자리)

- **사용자 경험**
  - 카테고리별 필터링
  - 원클릭 복사
  - 키보드 단축키 (Enter: 생성, Ctrl+C: 복사)
  - 반응형 디자인 (모바일/태블릿/데스크톱)

- **접근성**
  - 스크린 리더 지원
  - 키보드 네비게이션
  - 모션 감소 선호 지원

## 기술 스택

- [Next.js 14](https://nextjs.org/) (App Router)
- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- CSS Modules

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

http://localhost:3000 에서 확인할 수 있습니다.

### 빌드

```bash
npm run build
npm start
```

## 프로젝트 구조

```
token-generator/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # 루트 레이아웃 + SEO 메타데이터
│   │   ├── page.tsx        # 메인 페이지
│   │   ├── globals.css     # 전역 스타일
│   │   ├── opengraph-image.tsx  # OG 이미지 생성
│   │   ├── icon.tsx        # Favicon 생성
│   │   ├── robots.ts       # robots.txt
│   │   └── sitemap.ts      # sitemap.xml
│   ├── components/
│   │   ├── TokenGenerator.tsx
│   │   └── TokenGenerator.module.css
│   └── lib/
│       └── token.ts        # 토큰 생성 유틸리티
├── public/
│   └── manifest.json       # PWA 매니페스트
├── next.config.js
├── tsconfig.json
└── package.json
```

## 환경 변수

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 라이선스

MIT License - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.
