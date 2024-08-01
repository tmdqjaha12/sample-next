/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "postcss-import": {},
    tailwindcss: {},
    autoprefixer: {},
    "postcss-preset-env": {
      stage: 2, // CSS 기능의 변환 정도를 설정합니다. (0-4 단계)
    },
  },
};

export default config;

/**
 ** postcss-import: @import 규칙을 지원하여 CSS 파일을 모듈화하고, 다른 CSS 파일을 쉽게 가져와 사용할 수 있게 합니다.
 *
 ** tailwindcss: Tailwind CSS의 유틸리티 클래스들을 사용하여 CSS를 작성할 수 있게 해줍니다. Tailwind의 기본 클래스가 사용됩니다.
 *
 ** autoprefixer: browserslist 설정을 기반으로 자동으로 브라우저 벤더 프리픽스를 추가하여 CSS 속성이 다양한 브라우저에서 잘 동작하도록 합니다. 프리픽스는 browserslist에 정의된 지원 브라우저에 맞춰 추가됩니다.
 *
 ** postcss-preset-env: 최신 CSS 기능을 구형 브라우저에서도 호환되도록 변환합니다.
 * 0: 실험적인 기능
 * 1: 신뢰할 수 있는 기능/ 더 많은 기능
 * 2: 실험적이지 않고 많은 개발자들이 사용하는 기능/ 보통의 기능
 * 3: 안정적이고 일반적으로 사용되는 기능/ 대부분의 기능 (default)
 * 4. 최신 CSS 표준에 포함된 기능/ 완벽한 지원
 */
