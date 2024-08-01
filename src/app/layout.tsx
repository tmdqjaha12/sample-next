import Head from "next/head";
import Link from "next/link";
import React from "react";
import "../styles/globals.css";

interface LayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="ko">
      {/* html lang 국제화에 맞춤 */}

      <Head>
        {/* {동적 값을 넣어 동적SEO가능} */}
        <title>Sample Next App</title>
        <meta name="description" content="이 페이지에 대한 설명을 여기에 입력하세요." />
        <meta name="keywords" content="키워드1, 키워드2, 키워드3" />
        {/* keywords: 현재 대부분 검색엔진이 이 태그를 미사용하여, 키워드 최적화는 다른 방법이 좋음 */}
        <meta name="robots" content="index, follow" />
        {/* robots: 검색 엔진 로봇(크롤러)이 페이지를 인덱스할지 여부와 페이지에 포함된 링크를 따라갈지 여부를 지정합니다. "noindex, nofollow"크롤링제어 */}
        <meta property="og:title" content="홈페이지 제목" />
        {/* og:title: Open Graph 프로토콜에서 사용되는 메타 태그로, 페이지의 제목을 지정합니다. 페이지가 소셜 미디어 플랫폼에서 공유될 때, 공유 미리보기의 제목으로 사용됩니다. */}
        <meta property="og:description" content="이 페이지에 대한 설명을 여기에 입력하세요." />
        {/* og:description: Open Graph 프로토콜에서 사용되는 메타 태그로, 페이지의 설명을 지정합니다. 페이지가 소셜 미디어 플랫폼에서 공유될 때, 공유 미리보기의 설명으로 사용됩니다. */}
        <meta property="og:image" content="https://example.com/image.jpg" />
        {/* og:image: Open Graph 프로토콜에서 사용되는 메타 태그로, 페이지가 소셜 미디어 플랫폼에서 공유될 때, 공유 미리보기의 이미지로 사용됩니다. 이미지 URL은 전체 URL이어야 하며, 적절한 크기와 비율로 설정하는 것이 좋습니다. */}
        <meta property="og:url" content="https://example.com" />
        {/* og:url: Open Graph 프로토콜에서 사용되는 메타 태그로, 페이지가 소셜 미디어에서 공유될 때, 해당 페이지의 URL을 지정합니다. 중복 콘텐츠 문제를 피하기 위해 정확한 URL을 제공하는 것이 좋습니다.*/}
        <meta property="og:type" content="website" />
        {/* og:type: Open Graph 프로토콜에서 사용되는 메타 태그로, 페이지의 유형을 명시하여 소셜 미디어 플랫폼이 적절한 방식으로 페이지를 표시하도록 돕습니다. 예: website, article, product 등. */}
        <meta property="og:site_name" content="사이트 이름" />
        {/* og:site_name: Open Graph 프로토콜에서 사용되는 메타 태그로, 소셜 미디어에서 페이지를 공유할 때, 페이지가 속한 웹사이트의 이름을 표시합니다. */}
        <link rel="canonical" href="https://example.com" />
        {/* canonical: 페이지의 정규 URL을 지정하는 링크 태그입니다. 중복 콘텐츠 문제를 방지하고 검색 엔진에 이 페이지의 주요 URL을 알려줍니다. 여러 URL이 동일한 콘텐츠를 포함하는 경우, canonical 태그를 사용하여 검색 엔진이 주요 페이지를 인식하도록 돕습니다. */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* viewport: 모바일 최적화 */}

        {/* 이미지 alt */}

        {/* 구조화된 데이터 추가 (JSON-LD 형식) */}
        <script type="application/ld+json">
          {/* {`
        {
          "@context": "https://schema.org", // 구조화된 데이터의 문맥을 정의합니다. https://schema.org는 구조화된 데이터의 의미와 관계를 정의하는 표준 스키마를 참조합니다.
          "@type": "BlogPosting", // 데이터의 유형을 정의합니다. 이 경우, 페이지가 블로그 포스트라는 것을 의미합니다. 
          "headline": "${post.title}", // 블로그 포스트의 제목을 나타냅니다.
          "description": "${post.description}", // 로그 포스트의 요약 또는 설명을 제공합니다
          "image": "${post.image}", // 블로그 포스트에 관련된 이미지의 URL을 제공합니다.
          "author": { // 블로그 포스트의 작성자를 정의합니다.
            "@type": "Person", // 작성자가 사람임을 명시합니다.
            "name": "${post.author}" // 작성자의 이름을 제공합니다.
          },
          "publisher": { // 블로그 포스트를 발행한 출판사를 정의합니다.
            "@type": "Organization",
            "name": "블로그 이름",
            "logo": {
              "@type": "ImageObject",
              "url": "https://example.com/logo.jpg"
            }
          },
          "datePublished": "${post.publishedDate}", // 블로그 포스트가 발행된 날짜를 제공합니다.
          "dateModified": "${post.modifiedDate}" // 블로그 포스트가 수정된 날짜를 제공합니다.
        }
        `} */}
        </script>

        {/* 사이트맵 xml */}
        {/*
        <?xml version="1.0" encoding="UTF-8"?> // XML버전과 인코딩 방식을 정의합니다.
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> // 사이트맵의 루트 요소입니다. `xmlns 속성은 사이트맵 XML 스키마를 정의합니다.
          <url> // 각 URL 항목을 정의합니다.
            <loc>https://example.com/</loc> // 페이지의 URL을 정의합니다
            <lastmod>2024-08-01</lastmod> // 페이지가 마지막으로 수정된 날짜를 정의합니다.
            <changefreq>daily</changefreq> // 페이지가 얼마나 자주 변경될 것으로 예상되는지를 정합니다. (daily, weekly, monthly)
            <priority>1.0</priority> // 페이지의 중요성을 정의합니다. 값은 0.0~1.0 사이
          </url>
          <url>
            <loc>https://example.com/about</loc>
            <lastmod>2024-07-15</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.8</priority>
          </url>
          <!-- 더 많은 URL 항목 추가 -->
        </urlset> 

          1. 사이트맵 생성기 사용: 많은 온라인 사이트맵 생성기가 있으며, 사이트의 URL을 입력하면 자동으로 XML 사이트맵 파일을 생성해 줍니다. 예를 들어, XML-Sitemaps.com 같은 사이트가 있습니다.
          2. CMS 플러그인 사용
          3. 수동 작성

          // 사이트맵파일 업로드: 사이트맵 파일을 생성한 후에는 이를 웹 서버에 업로드해야 합니다. 일반적으로 웹사이트의 루트 디렉터리에 sitemap.xml로 저장합니다.
          // 사이트맵 제출: 구글(구글서치콘솔-> 웹사이트-> sitemap 등록), Bing(빙웹마스터툴-> 웹사이트-> sitemap 등록)
        */}

        {/* 구조화된 데이터: 구조화된 데이터는 검색 엔진이 웹 페이지의 정보를 더 잘 이해할 수 있도록 돕습니다. JSON-LD, Microdata, RDFa 형식이 있으며, 각종 스키마.org 마크업을 사용해 페이지의 주제나 정보를 명확히 표현할 수 있습니다. 예를 들어, 제품, 리뷰, 이벤트, 레시피, FAQ 등의 정보를 구조화하여 검색 결과에서 리치 스니펫으로 표시될 수 있습니다. */}
        {/* 모바일 최적화: 모바일 사용자 경험을 최적화하는 것은 중요합니다. 모바일 친화적인 디자인, 빠른 로딩 시간, 모바일 디스플레이에 맞춘 콘텐츠가 필요합니다. 구글은 모바일 우선 색인(모바일 우선 인덱싱)을 사용하고 있어, 모바일 페이지의 품질이 SEO에 큰 영향을 미칩니다.*/}
        {/* 페이지속도: 구글의 PageSpeed Insights */}
        {/* 콘텐츠 품질 및 최적화: 키워드 연구(관련성과 검색량이 높은 키워드), 콘텐츠의 길이(긴 콘텐츠는 종종 검색 순위에 유리), 내부 링크(페이지 간 관련 링크를 추가하여 사이트 구조를 개선) */}
        {/* 키워드 최적화: 적절한 키워드를 페이지의 제목, 헤딩, 본문, URL 및 메타 태그에 포함시킵니다. 키워드는 사용자가 검색할 가능성이 있는 단어나 구문을 포함해야 하며, 자연스럽게 콘텐츠에 통합되어야 합니다. */}
        {/* 백링크: 타 사이트의 귀하의 사이트로 링크가 걸려있으면 ,검색 엔진에서 사이트의 권위와 신뢰도를 높이는데 도움이 됩니다. */}
        {/* 소셜미디어통합: 소셜 미디어에서의 활동은 간접적으로 SEO에 영향을 줄 수 있습니다. */}
        {/* 깔끔한URL구조 */}
        {/* 헤딩 태그 최적화: h1, h2, h3 등 */}
        {/* SSL 인증서 */}
        {/* 사용자 경험: 웹사이트 디자인, 내비게이션, 모바일 반응형 디자인 */}
        {/* 구글 서치 콘솔 및 애널리틱스 활용: 데이터를 토대로 SEO 전략을 조정합니다. */}
      </Head>
      <body>
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-white via-gray-100 to-gray-200 text-white">
          <header className="flex justify-between items-center p-4 bg-opacity-40 bg-gray-800 shadow-lg">
            <h1 className="text-2xl font-bold">Task Selector</h1>
            <nav className="absolute top-4 right-4 md:relative md:top-auto md:right-auto">
              <ul className="flex space-x-4">
                <li>
                  <Link href="/" className="hover:text-gray-300">
                    Home
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
          <main className="flex-grow flex justify-center items-center">{children}</main>
          <footer className="p-4 bg-opacity-40 bg-gray-800 text-center">
            <p>&copy; 2024 Task Selector. All rights reserved.</p>
          </footer>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
