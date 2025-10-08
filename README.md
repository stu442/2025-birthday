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

## 타임라인 메타데이터 관리

- `/public/timeline` 폴더의 이미지 EXIF를 파싱해 `public/data/timeline-media.json`으로 내보내는 스크립트를 제공합니다.
- 필요한 경우 `public/data/timeline-overrides.json`을 만들어 특정 사진의 날짜·위치 등을 수동으로 덮어쓸 수 있습니다.
- `timeline.json` 게시글과 추출된 메타데이터를 매핑한 결과는 `public/data/timeline-entries.json`으로 생성됩니다.
- 데이터 갱신은 수동으로 아래 명령을 실행합니다.

```bash
npm run generate:timeline
# EXIF 추출과 엔트리 매핑을 한 번에 실행
```

- 필요하다면 세부 단계별로 `npm run extract:timeline`, `npm run build:timeline-data`를 개별 실행할 수도 있습니다.
- 실행이 끝나면 `timeline-entries.json`에 게시글별 `mediaId`·위치 정보가 정리되어 있어 캘린더/지도 기능 구현 시 바로 사용할 수 있습니다.

## 컴포넌트

- `Header`: 타이틀과 폭죽 효과를 포함한 헤더 컴포넌트
- `CircleImage`: 원형 이미지 표시 컴포넌트
- `Description`: 텍스트 설명을 위한 컴포넌트
- `Firework`: 폭죽 애니메이션 효과 컴포넌트

## 환경 설정

- Node.js 18+ 버전 필요
- 모던 브라우저 지원 (Chrome, Firefox, Safari, Edge)
