## 개발 환경

- node: v20.16.0
- react: ^18
- next: 14.2.5

## 라이브러리

- cross-env: 환경변수 설정
- eslint: js용 AST기반 패턴 검사기, 모든 규칙이 플러그인이 되어 런타임에서 규칙을 추가할 수 있음
- eslint-config-next: Next.js에서 사용하는 ESLint 구성
- pdf-lib: PDF문서를 만들고 수정
- @pdf-lib/fontkit: pdf-lib와 같이 사용되는 글꼴 엔진
- postcss: js플로그인으로 스타일을 변환하는 도구(벤더 프리픽스 자동 추가, css최적화 및 압축)
- tailwindcss: 유틸리티 중심 css 프레임워크
- react-icons: ES6 import를 사용하여 React에서 인기있는 아이콘 팩의 SVG아이콘을 사용
- react-hook-form: React Hooks를 위한 성능이 뛰어나고 유연하며 확장 가능한 폼 라이브러리
- date-fns: 날짜 유틸리티 라이브러리
- msw: 브라우저 및 Node.js를 위한 완벽한 REST/GraphQL API 모의 라이브러리
- @faker-js/faker: 더미데이터 생성
- @mswjs/http-middleware: msw를 서버사이드에서 사용할 수 있도록 함. http 미들웨어를 생성, 서버측 요청을 가로채 모의 응답을 제공
- cors: Cross-Origin Resource Sharing (교차출처 리소스 접근 허용)
- express: 웹서버 프레임워크 (라우팅, 미들웨어, 요청 응답 처리)
- webpack-analyzer: Webpack 번들 파일의 구조를 시각적으로 분석하고 이해하는데 도움을 줌(모듈용량, 의존성 등)

## 디렉토리 계층 구조

- /public: 정적 리소스
- /src/app/\*\*/\_components: 컴퍼넌트 디렉토리
- /src/app/api: 서버리스 함수
- /src/app/{name}: 페이지
- /src/constants: 전역 상수
- /src/hooks: 커스텀 훅. React 컴포넌트에서 재사용 가능한 로직을 분리하여 관리
- /src/i18n: 국제화, 다국어처리
- /src/mocks: API 요청 모킹
- /src/store: 상태관리
- /src/styles: 스타일
- /src/utils: 유틸리티 함수

## msw

- npx msw init public/ --save
