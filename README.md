# 2025년 선물 교환식 웹사이트 🎁

새해 선물 교환을 위한 인터랙티브 웹사이트입니다. LUSH 제품과 책 선물에 대한 설명을 담고 있습니다.

## 주요 기능

- 🎆 제목 클릭시 폭죽 효과 애니메이션
- 📱 반응형 디자인
- 🖼️ 원형 이미지 컴포넌트
- 📝 설명 텍스트 컴포넌트

## 기술 스택

- React 18
- TypeScript
- Tailwind CSS
- Vite
- react-canvas-confetti (폭죽 효과)

## 시작하기

1. 저장소 클론
```bash
git clone [repository-url]
```

2. 의존성 설치
```bash
npm install
# or
yarn install
```

3. 개발 서버 실행
```bash
npm run dev
# or
yarn dev
```

4. 빌드
```bash
npm run build
# or
yarn build
```

## 프로젝트 구조

```
src/
├── assets/         # 이미지 파일
├── components/     # 재사용 가능한 컴포넌트
├── lib/           # 유틸리티 함수
└── main.tsx       # 앱 진입점
```

## 컴포넌트

- `Header`: 타이틀과 폭죽 효과를 포함한 헤더 컴포넌트
- `CircleImage`: 원형 이미지 표시 컴포넌트
- `Description`: 텍스트 설명을 위한 컴포넌트
- `Firework`: 폭죽 애니메이션 효과 컴포넌트

## 환경 설정

- Node.js 18+ 버전 필요
- 모던 브라우저 지원 (Chrome, Firefox, Safari, Edge)