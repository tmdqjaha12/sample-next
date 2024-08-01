## 개발 환경

- node: v20.16.0
- react: ^18
- next: 14.2.5

## scripts

## 라이브러리

- cross-env: 환경변수 설정
- eslint: js용 AST기반 패턴 검사기, 모든 규칙이 플러그인이 되어 런타임에서 규칙을 추가할 수 있음
- eslint-config-next: Next.js에서 사용하는 ESLint 구성
- pdf-lib: PDF문서를 만들고 수정
- @pdf-lib/fontkit: pdf-lib와 같이 사용되는 글꼴 엔진
- postcss: js플로그인으로 스타일을 변환하는 도구(벤더 프리픽스 자동 추가, css최적화 및 압축)
- tailwindcss: 유틸리티 중심 css 프레임워크(자체적으로 브라우저 호환성 문제를 처리하는 기능은 없으나, PostCSS를 통해 CSS를 최적화하고 변환하는 과정에서 autoprefixer와 같은 플러그인을 함께 사용하므로 브라우저 호환성을 어느정도 지원함. Autoprefixer는 browserlist설정을 기반으로 css속성에 필요한 프리픽스를 자동으로 추가함.)
- react-icons: ES6 import를 사용하여 React에서 인기있는 아이콘 팩의 SVG아이콘을 사용
- react-hook-form: React Hooks를 위한 성능이 뛰어나고 유연하며 확장 가능한 폼 라이브러리
- date-fns: 날짜 유틸리티 라이브러리
- msw: 브라우저 및 Node.js를 위한 완벽한 REST/GraphQL API 모의 라이브러리
- @faker-js/faker: 더미데이터 생성
- @mswjs/http-middleware: msw를 서버사이드에서 사용할 수 있도록 함. http 미들웨어를 생성, 서버측 요청을 가로채 모의 응답을 제공
- cors: Cross-Origin Resource Sharing (교차출처 리소스 접근 허용)
- express: 웹서버 프레임워크 (라우팅, 미들웨어, 요청 응답 처리)
- webpack-analyzer: Webpack 번들 파일의 구조를 시각적으로 분석하고 이해하는데 도움을 줌(모듈용량, 의존성 등)
- Storybook: UI컴퍼넌트를 독립적으로 개발하고 테스트 할수 있는, 컴퍼넌트 기반 개발을 지원하는 오픈소스 도구. 컴퍼넌트를 문서화하고 시각적으로 확인하여 팀원들과 소통에 유용
- postcss-preset-env: PostCSS 플러그인 중 하나로, 최신 CSS 기능을 다양한 브라우저에서 호환되도록 변환해주는 도구
- Browserslist: 웹 개발에서 어떤 브라우저를 지원할지 설정하는 데 사용되는 도구

```bash
  # Browserlist 기본값
  > 1% # 전 세계 시장 점유율이 1% 이상인 브라우저
  last 2 versions # 각 브라우저의 최신 2개 버전
  Firefox ESR # Firefox의 Extended Support Release 버전
  not dead # 더 이상 업데이트되지 않는 브라우저를 제외합니다.
```

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

<!-- https://mswjs.io/ -->

- npx msw init public/ --save
- 디렉토리 구성
- handler 작성
- csr에서 작동할 browser작성
- ssr에서 작동할 http작성 (msw에서 next를 공식적으로 알맞게 지원하는 가이드가 없어서 다음과 같은 방법을 활용)
- 스크립트 작성: "mock": "npx tsx watch ./src/mocks/http.ts"

## storybook

<!-- https://storybook.js.org/ -->

- npx storybook@latest init

  ```md
  ### Storybook에서 적절하게 사용할 수 있는 컴포넌트

  - 공통으로 사용될 컴포넌트 (UI 컴포넌트, 디자인 시스템 )
  - 특정 페이지에서 사용될 독립적인 컴포넌트

  ### Storybook에서 사용하지 않는 것이 더 적절한 컴포넌트

  - 페이지 수준의 컴포넌트가 포함하는 복잡한 비즈니스 로직
  - 실시간 API 호출이 필요한 경우
  - 특정 페이지 컨텍스트나 상태에 강하게 의존하는 경우
  ```

- 스토리북에서 MSW 사용 설정

  ```md
  MSW와 Storybook을 함께 사용하는 경우

  ### 장점

  - 일관된 개발 환경
  - 다양한 상태 테스트
  - 간단한 설정

  ### 단점

  - 복잡성 증가
  - 테스트 분리 어려움

  ---

  MSW와 Storybook을 분리하여 사용하는 경우

  ### 장점

  - 우연성 증가
  - 구성 요소의 명확성
  - 독립적 테스트

  ### 단점

  - 중복 작업 가능성
  - 설정 복잡성
  ```
