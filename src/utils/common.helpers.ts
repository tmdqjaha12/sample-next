//!--------------------------------------------------------------------
/**
 ** 빈 값일 경우 true를 반환
 */
const isEmpty = (value: any) => {
  if (value === null || value === undefined) {
    return true;
  }
  if (typeof value === "object") {
    // 빈 객체 확인
    if (Object.keys(value).length === 0 && value.constructor == Object) {
      return true;
    }
    // 빈 배열 확인
    if (Array.isArray(value) && value.length === 0) {
      return true;
    }
  }
  // 빈 문자열 확인
  if (typeof value === "string" && value.trim() === "") {
    return true;
  }
  return false;
};

//!--------------------------------------------------------------------
/**
 ** 입력한 값이 JSON형식인지 판별
 */
const isJSON = (str: string) => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

//!--------------------------------------------------------------------
/**
 ** 원하는 키값의 파라메터를 반환
 */
const getParams = (keys: string[]): (string | null)[] => {
  const params = new URLSearchParams(window.location.search);
  return keys.map((key) => params.get(key));
};

//!--------------------------------------------------------------------
/**
 ** 주소에 있는 param value를, key값을 이용하여 추출하는 함수
 */
const getJSONParam = (key: string): object | null => {
  const paramData = getParams([key]);

  if (paramData[0] && paramData[0].length !== 0) {
    const decodedParam = window.decodeURIComponent(paramData[0]);

    if (isJSON(decodedParam)) {
      try {
        return JSON.parse(decodedParam);
      } catch (error) {
        console.error(`Error in getJSONParam "${key}":`, error);
        return null;
      }
    }
  }

  return null;
};

//!--------------------------------------------------------------------
/**
 ** 제외를 원하는 키값의 파라메터를 제외한 쿼리스트링을 반환
 */
const ignoreParamsQueryString = (keys: string[]): string | undefined => {
  if (keys.length < 1) return;

  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);

  for (let i = 0; i < keys.length; i++) {
    params?.delete(keys[i]);
  }
};

//!--------------------------------------------------------------------
/**
 ** 디자이스 정보를 반환
 */
type DeviceType = "Phone" | "Tablet" | "Desktop" | "Unknown";
type OSName = "iOS" | "Android" | "Windows Phone" | "Windows" | "macOS" | "Unknown";
type BrowserName = "Chrome" | "Firefox" | "Safari" | "Internet Explorer" | "Edge" | "Unknown";
interface DeviceInfo {
  isMobile: boolean;
  deviceType: DeviceType;
  osName: OSName;
  osVersion: string;
  browserName: BrowserName;
  browserVersion: string;
  isTouchDevice: boolean;
}
const getDeviceInfo = (): DeviceInfo => {
  const userAgent = navigator.userAgent;

  // 기본 설정
  let deviceType: DeviceType = "Unknown";
  let osName: OSName = "Unknown";
  let osVersion: string = "Unknown";
  let browserName: BrowserName = "Unknown";
  let browserVersion: string = "Unknown";
  let isTouchDevice: boolean = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  // 모바일 여부
  const isMobile = /iPhone|iPod|Android|Windows Phone/i.test(userAgent);

  // 기기 및 운영 체제 감지
  if (/iPad/i.test(userAgent)) {
    deviceType = "Tablet";
    osName = "iOS";
  } else if (/iPhone|iPod/i.test(userAgent)) {
    deviceType = "Phone";
    osName = "iOS";
  } else if (/Android/i.test(userAgent)) {
    deviceType = /Mobile/i.test(userAgent) ? "Phone" : "Tablet";
    osName = "Android";
  } else if (/Windows Phone/i.test(userAgent)) {
    deviceType = "Phone";
    osName = "Windows Phone";
  } else if (/Macintosh/i.test(userAgent)) {
    deviceType = "Desktop";
    osName = "macOS";
  } else if (/Windows NT/i.test(userAgent)) {
    deviceType = "Desktop";
    osName = "Windows";
  }

  // 운영 체제 버전 감지
  const osVersionMatch = userAgent.match(/(iOS|Android|Windows Phone|Windows NT|Mac OS X) ([\d._]+)/);
  if (osVersionMatch) {
    osVersion = osVersionMatch[2] || "Unknown";
  }

  // 브라우저 감지 및 버전 추출
  const browserMatch = userAgent.match(/(Chrome|Firefox|Safari|MSIE|Trident|Edge)\/([\d.]+)/);
  if (browserMatch) {
    browserName = browserMatch[1] as BrowserName;
    browserVersion = browserMatch[2];
  } else {
    if (/Safari/i.test(userAgent) && !/Chrome/i.test(userAgent)) {
      browserName = "Safari";
      const safariMatch = userAgent.match(/Version\/([\d.]+)/);
      if (safariMatch) {
        browserVersion = safariMatch[1];
      }
    }
  }

  return {
    isMobile,
    deviceType,
    osName,
    osVersion,
    browserName,
    browserVersion,
    isTouchDevice,
  };
};

//!--------------------------------------------------------------------
/**
 ** 현재 브라우저의 온/오프라인 상태 여부 확인
 */
const inOnline = () => {
  return navigator.onLine;
};

//!--------------------------------------------------------------------
/**
 ** 현재 thread 수 확인
 */
const howManyThread = () => {
  return navigator.hardwareConcurrency;
};

//!--------------------------------------------------------------------
/**
 ** 언어 종류 확인
 * - 'ko-KR' 등등
 */
const whatLanguage = () => {
  return navigator.language;
};

//!--------------------------------------------------------------------
/**
 ** 기기 가로세로 확인
 * - desktop(pc), portrait(세로), landscape(가로)
 */
const whatOrientation = () => {
  return !navigator.maxTouchPoints ? "desktop" : !window.orientation ? "portrait" : "landscape";
};

//!--------------------------------------------------------------------
/**
 ** 로컬스토리지에 데이터 저장
 */
const saveToLocalStorage = (key: string, value: any) => {
  if (isEmpty(value)) return;
  if (value === null) return; // 불필요하나 타입에러때문에 작성해둠

  isJSON(value) ? localStorage.setItem(key, JSON.stringify(value)) : localStorage.setItem(key, value);
};

//!--------------------------------------------------------------------
/**
 ** 로컬스토리지 데이터 가져오기
 */
const getFromLocalStorage = (key: string): any => {
  const value = localStorage.getItem(key);
  if (isEmpty(value)) return "";
  if (value === null) return ""; // 불필요하나 타입에러때문에 작성해둠

  return isJSON(value) ? JSON.parse(value) : value;
};

//!--------------------------------------------------------------------
/**
 ** 로컬스토리지 업데이트하기
 */
const updateLocalStorage = (key: string, newValue: any) => {
  const currentValue = getFromLocalStorage(key);
  if (currentValue !== null) {
    saveToLocalStorage(key, newValue);
  }
};

//!--------------------------------------------------------------------
/**
 * @param {string} key
 ** 로컬스토리지 삭제하기
 */
const removeFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

//!--------------------------------------------------------------------
/**
 ** 세션스토리지에 데이터 저장
 */
const saveToSessionStorage = (key: string, value: any) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

//!--------------------------------------------------------------------
/**
 ** 세션스토리지 데이터 가져오기
 */
const getFromSessionStorage = (key: string): any => {
  const value = sessionStorage.getItem(key);
  if (isEmpty(value)) return "";
  if (value === null) return ""; // 불필요하나 타입에러때문에 작성해둠

  return isJSON(value) ? JSON.parse(value) : value;
};

//!--------------------------------------------------------------------
/**
 ** 세션스토리지 업데이트하기
 */
const updateSessionStorage = (key: string, newValue: any) => {
  const currentValue = getFromSessionStorage(key);
  if (currentValue !== null) {
    saveToSessionStorage(key, newValue);
  }
};

//!--------------------------------------------------------------------
/**
 ** 세션스토리지 삭제하기
 */
const removeFromSessionStorage = (key: string) => {
  sessionStorage.removeItem(key);
};

//!--------------------------------------------------------------------
/**
 ** 쿠키 저장
 */
const setCookie = (name: string, value: string | number | boolean, days: number) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
};

//!--------------------------------------------------------------------
/**
 ** 쿠키 가져오기
 */
const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const [cookieName, cookieValue] = cookies[i].split("=");
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
};

//!--------------------------------------------------------------------
/**
 * @param {string} id
 * @returns {} clientHeight: number, offsetHeight: number, scrollHeight: number
 * 요소의 높이 가져오기
 * - clientHeight 는 요소의 내부 높이입니다. 패딩 값은 포함되며, 스크롤바, 테두리, 마진은 제외됩니다.
 * - offsetHeight 는 요소의 높이입니다. 패딩, 스크롤 바, 테두리(Border)가 포함됩니다. 마진은 제외됩니다.
 * - scrollHeight  는 요소에 들어있는 컨텐츠의 전체 높이입니다. 패딩과 테두리가 포함됩니다. 마진은 제외됩니다.
 */
const getElementSizeById = (
  id: string
): {
  clientHeight: number | undefined;
  offsetHeight: number | undefined;
  scrollHeight: number | undefined;
} => {
  const element = document.getElementById(id);
  const clientHeight = element?.clientHeight;
  const offsetHeight = element?.offsetHeight;
  const scrollHeight = element?.scrollHeight;

  return { clientHeight, offsetHeight, scrollHeight };
};

//!--------------------------------------------------------------------
/**
 ** 원하는 응답 헤더 정보를 반환
 * - 예시(content-type, cross-origin-opener-policy, date
 */
const getHeaderData = async (key: string): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", window.location.href);
    xhr.onload = function () {
      const headers = xhr.getAllResponseHeaders();
      const headerLines = headers.split("\r\n");
      for (let i = 0; i < headerLines.length; i++) {
        const line = headerLines[i];
        if (line.startsWith(key)) {
          const value = line.substring(key.length + 2);
          resolve(value);
          return;
        }
      }
      resolve(null);
    };
    xhr.send();
  });
};

//!--------------------------------------------------------------------
/**
 ** a tag href attr -> tel excute
 */
const callNumber = (number: string) => {
  if (number.length < 1) return;
  window.location.href = "tel:" + number;
};

//!--------------------------------------------------------------------
/**
 ** 원하는 길이의 영문 랜덤문자열 생성
 */
const generateRandomString = (length: number) => {
  const charecters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charecters.length);
    randomString += charecters.charAt(randomIndex);
  }
  return randomString;
};

//!--------------------------------------------------------------------
/**
 * 원하는 구간의 랜덤 숫자 반환
 */
const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//!--------------------------------------------------------------------
/**
 ** 지정된 지연 시간 후 콜백 함수를 실행
 */
const delayExecution = async (callback: () => void, delay: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    const timerId = setTimeout(() => {
      try {
        callback();
        resolve();
      } catch (error) {
        console.error("#Error indelayExecution: ", error);
        reject(error);
      }
    }, delay);
  });
};

//!--------------------------------------------------------------------
/**
 ** 첫 번째 호출 시 콜백 함수를 바로 실행하지 않고, 지정 지연 시간이 지난 후에 실행합니다.
 */
let timerId: NodeJS.Timeout | null = null;
const delayThrottleExecution = async (callback: any, delay: number) => {
  if (!timerId) {
    timerId = setTimeout(() => {
      try {
        callback();
      } catch (error) {
        console.error("Error in delayExecution: ", error);
      }
      timerId = null;
    }, delay);
  }
};

//!--------------------------------------------------------------------
/**
 ** 첫 번째 호출 시 콜백 함수를 바로 실행하고, 이후 지정 지연 시간 동안 추가 호출을 무시합니다.
 */
let isThrottled = false;
const throttleExecution = (callback: () => void, delay: number) => {
  if (!isThrottled) {
    isThrottled = true;
    try {
      callback();
    } catch (error) {
      console.error("Error in throttleExecution:", error);
    }
    setTimeout(() => {
      isThrottled = false;
    }, delay);
  }
};

//!--------------------------------------------------------------------
/**
 ** 함수 주기 실행
 */
const periodicExecution = async (callback: () => Promise<void> | void, interval: number) => {
  const timerId = setInterval(async () => {
    try {
      await callback();
    } catch (error) {
      console.error("Error in periodicExecution: ", error);
    }
  }, interval);

  return function stopExecution() {
    clearInterval(timerId);
  };
};

//!--------------------------------------------------------------------
/**
 ** script태그를 재귀적으로 생성
 */
type ScriptAttributes = Partial<HTMLScriptElement>;
const scriptImportRecursive = async (position: "body" | "head", scripts: ScriptAttributes[]) => {
  if (scripts.length === 0) return;

  const firstElement = scripts[0];
  const script: HTMLScriptElement = document.createElement("script");

  for (const key in firstElement) {
    if (Object.prototype.hasOwnProperty.call(firstElement, key)) {
      // `key`를 `keyof HTMLScriptElement`로 캐스팅하여 사용합니다.
      const typedKey = key as keyof HTMLScriptElement;
      // `script` 객체의 속성에 안전하게 접근합니다.
      (script as any)[typedKey] = firstElement[typedKey];
    }
  }

  script.async = true;
  document[position].appendChild(script);

  script.addEventListener("load", () => {
    const remainingArray = scripts.slice(1);
    scriptImportRecursive(position, remainingArray);
  });
};

//!--------------------------------------------------------------------
/**
 ** 원하는 길이의 임의의 문자열 postfix를 생성
 */
const generateRandomStringPostfix = (length: number) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

//!--------------------------------------------------------------------
/**
 ** 원하는 길이의 임의의 숫자 postfix를 생성
 */
const generateRandomNumberPostfix = (length: number) => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10).toString();
  }
  return result;
};

//!--------------------------------------------------------------------
/**
 ** 숫자를 한글로 변환
 */
const geKoreanNumber = (number: number) => {
  const koreanNumber = ["", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"];
  const tenUnit = ["", "십", "백", "천"];
  const tenThousandUnit = ["조", "억", "만", ""];
  const unit = 10000;

  let answer: any = "";

  while (number > 0) {
    const mod = number % unit;
    const modToArray = mod.toString().split("");
    const length = modToArray.length - 1;

    const modToKorean = modToArray.reduce((acc, value, index) => {
      const valueToNumber = +value;
      if (!valueToNumber) return acc;
      // 단위가 십 이상인 '일'글자는 출력하지 않는다. ex) 일십 -> 십
      const numberToKorean = index < length && valueToNumber === 1 ? "" : koreanNumber[valueToNumber];
      return `${acc}${numberToKorean}${tenUnit[length - index]}`;
    }, "");

    answer = `${modToKorean}${tenThousandUnit.pop()} ${answer}`;
    number = Math.floor(number / unit);
  }

  return answer.replace();
};

//!--------------------------------------------------------------------
/**
 ** 오늘 날자 요일문자열로 변경
 */
type DayOfWeek = "일" | "월" | "화" | "수" | "목" | "금" | "토";
const getTodayDayOfWeek = () => {
  const daysOfWeek: DayOfWeek[] = ["일", "월", "화", "수", "목", "금", "토"];
  const now = new Date();
  const dayOfWeekIndex = now.getDay();
  return daysOfWeek[dayOfWeekIndex];
};

//!--------------------------------------------------------------------
/**
 ** 주말여부 확인
 * - 주말: true
 */
const isWeekend = () => {
  var today = new Date();
  var dayOfWeek = today.getDay();
  return dayOfWeek === 0 || dayOfWeek === 6; // 0은 일요일, 6은 토요일을 나타냅니다.
};

//!--------------------------------------------------------------------
/**
 *
 ** base64 window.btoa(암호화)
 */
const encodeBase64 = (value: any) => {
  return window.btoa(value);
  // Buffer.from(param.ci).toString("base64");
};

//!--------------------------------------------------------------------
/**
 ** base64 window.btoa(복호화)
 */
const decodeBase64 = (value: any) => {
  return window.btoa(value);
  // Buffer.from(liiv01, "base64").toString("utf-8")
};

//!--------------------------------------------------------------------
/**
 ** 원하는 길이의 dot을 반환
 */
const getDotNumString = (num: number) => {
  let dot = "";
  for (let i = 0; i < num; i++) {
    dot += ".";
  }
  return dot;
};

//!--------------------------------------------------------------------
/**
 ** 매개변수로 전달받은 문자열에 원하는 간격마다 원하는 문자열을 추가한다
 * - ex입력) formatAddXString("20240202", "422", "-");
 * - ex결과) "2024-02-24"
 */
const formatAddXString = (str: string, xPosition: string, x: string) => {
  if (str.length < 1) {
    console.error("Error in formatAddXString: check first argument");
    return;
  }

  const strLength = str.length;
  const splitXPosition = xPosition.split("");
  let numSplitXPositionItem = 0;
  splitXPosition.map((item) => (numSplitXPositionItem += Number(item)));
  if (strLength !== numSplitXPositionItem) {
    console.error("Error in formatAddXString: check second argument");
    return;
  }

  let regexStr = "";
  let replaceValue = "";
  for (let i = 0; i < splitXPosition.length; i++) {
    regexStr += `(${getDotNumString(Number(splitXPosition[i]))})`;
    replaceValue += `$${i + 1}` + (i !== splitXPosition.length - 1 ? x : "");
  }
  const regex = new RegExp(regexStr, "g");
  const replacedStr = str.replace(regex, replaceValue);

  return replacedStr;
};

//!--------------------------------------------------------------------
/**
 ** 가상요소스타일 수정
 * @param selector  .waiting-box .prog-bar::after
 * @param pseudoElement '::after'
 * @param property 'width'
 * @param value '80%'
 * - If the issue occurs with document.styleSheets, setting up tsconfig.json is mandatory. -> "downlevelIteration": true
 */
const updatePseudoElementStyle = (selector: string, pseudoElement: string, property: string, value: string) => {
  let success = false;

  for (let styleSheet of document.styleSheets) {
    try {
      for (let rule of styleSheet.cssRules) {
        // rule이 CSSStyleRule인지 확인
        if (rule instanceof CSSStyleRule && rule.selectorText.endsWith(`${selector}${pseudoElement}`)) {
          rule.style.setProperty(property, value);
          success = true;
          break; // 원하는 규칙을 찾으면 더 이상 검색하지 않음
        }
      }
    } catch (e) {
      // 외부 스타일 시트 접근 시 예외 처리
      console.warn("Unable to access stylesheet:", e);
    }
  }

  if (!success) {
    console.warn(`No matching rule found for selector: ${selector}${pseudoElement}`);
  }

  return success;
};

//!--------------------------------------------------------------------
/**
 ** HTML 문자열을 HTML요소로 파싱하여 엔티티를 디코딩
 * - 입력: HTML 엔티티를 포함할 수 있는 문자열     ex) "Hello &lt;strong&gt;World&lt;/strong&gt; &amp; welcome to &copy; 2024!";
 * - 출력: HTML 엔티티가 일반 문자로 변환된 문자열 ex) "Hello <strong>World</strong> & welcome to © 2024!"
 */
const decodeHTMLEntities = (str: string) => {
  // 문자열이 null이나 undefined가 아닌지 확인
  if (str === null || str === undefined) {
    return "";
  }

  // HTML 문서로 파싱
  const parser = new DOMParser();
  const dom = parser.parseFromString("<!doctype html><body>" + str, "text/html");

  // 파싱된 HTML 문서의 body에서 textContent를 반환
  return dom.body.textContent ?? "";
};

//!--------------------------------------------------------------------
/**
 ** HTML 문자열에서 HTML엔티티와 HTML태그를 제거하고, 텍스트를 라인별로 분리하여 공백이 아닌 라인만을 반환
 * 1) 정규 표현식을 사용하여 HTML 엔티티(&[^;]+;)와 HTML 태그(<[^>]+>)를 제거합니다.
 * 2) 개행 문자를 기준으로 문자열을 라인별로 분리합니다.
 * 3) 공백이 아닌 라인만 남깁니다.
 */
const extractCleanedText = (str: string) => {
  const cleanedText = str.replace(/&[^;]+;|<[^>]+>/g, "");
  const lines = cleanedText.split("\n");
  const nonEmptyLines = lines.filter((line) => line.trim());
  return nonEmptyLines;
};

//!--------------------------------------------------------------------
/**
 ** HTML 문자열을 처리하여 여러 가지 변환 작업을 수행
 * 1) HTML 엔티티 디코딩: HTML 문자열을 HTML요소로 파싱하여 엔티티를 디코딩 (ex: &lt; -> <)
 * 2) 선택적으로 폰트 타입을 변경
 * 3) 선택적으로 최소 폰트 사이즈를 조정
 * 4) 선택적으로 줄 바꿈을 <br> 태그로 변환하거나 제거
 */
const processHTMLString = (
  str: string,
  newL: boolean = true,
  minFontSize: string,
  font?: { reg: RegExp; replace: string }
) => {
  if (str !== undefined && str !== null && str !== "") {
    const parser = new DOMParser();
    const dom = parser.parseFromString("<!doctype html><body>" + str, "text/html");

    // 폰트 NotoKR, Arial, sans-serif 고정
    if (font) {
      // /font-family:\s*[^;]+;/g,
      // "font-family: NotoKR, Arial, sans-serif;"
      dom.body.textContent = dom.body.textContent?.replace(font.reg, font.replace) ?? "";
    }

    if (!isEmpty(minFontSize)) {
      // 폰트 사이즈 조정
      dom.body.textContent = dom.body.textContent?.replace(/font-size:\s*[^;]+;/g, `font-size: ${minFontSize};`) ?? "";
    }

    if (newL) {
      return dom.body.textContent?.replace(/\n/g, "<br>");
    } else {
      return dom.body.textContent?.replace("<br>", "");
    }
  }
};

//!--------------------------------------------------------------------
/**
 ** 지정된 (작게 보기, 크게 보기) 폰트 사이즈 크기 변환
 * - B(big): 72.5%
 * - S(small): 62.5%
 */
const setFontSize = (type?: "B" | "S") => {
  const html = document.getElementsByTagName("html");

  if (type) {
    saveToLocalStorage("fontSize", type);

    if (type === "B") {
      html[0].style.fontSize = "72.5%";
    } else {
      html[0].style.fontSize = "62.5%";
    }
  } else {
    const fontSize = getFromLocalStorage("fontSize");

    if (fontSize === "B") {
      html[0].style.fontSize = "72.5%";
    } else {
      html[0].style.fontSize = "62.5%";
    }
  }
};

//!--------------------------------------------------------------------
/**
 ** 무작위로 섞인 배열을 반환
 * - Fisher-Yates shuffle
 */
const shuffleArray = (array: any[]) => {
  for (let i = array?.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

//!--------------------------------------------------------------------
/**
 ** 숫자가 십의 자리 이상이면 그대로 반환하고, 일의 자리 숫자라면 앞에 0을 붙여서 두 자리 형식으로 반환합니다.
 */
const formatToTwoDigits = (num: number) => {
  if (num >= 10) {
    return num.toString();
  } else {
    return "0" + num.toString();
  }
};

//!--------------------------------------------------------------------
/**
 ** 에디터로 작성되지 않은 문자열에 url형식의 문자열이 있다면 a태그로 변환
 */
const wrapUrlWithATag = (text: string) => {
  const urlPattern = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;

  return (
    text?.replace(urlPattern, (url) => {
      let prefix = url?.startsWith("http") ? "" : "http://";
      return `<a href="${prefix}${url}" target="_blank">${url}</a>`;
    }) ?? ""
  );
};

//!--------------------------------------------------------------------
/**
 ** 두 날짜 사이의 차이를 일 단위로 계산합니다.
 * @param {string | Date} date1 - 첫 번째 날짜 (문자열 또는 Date 객체)
 * @param {string | Date} date2 - 두 번째 날짜 (문자열 또는 Date 객체)
 * @returns {number} - 두 날짜 사이의 차이 (일 단위)
 */
const calculateDateDifference = (date1: string | Date, date2: string | Date) => {
  // 입력이 문자열인 경우 Date 객체로 변환
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  // 두 날짜의 타임스탬프 차이를 밀리초 단위로 계산
  const timeDifference = Math.abs(d2.getTime() - d1.getTime());

  // 밀리초를 일 단위로 변환
  const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return dayDifference;
};

//!--------------------------------------------------------------------
/**
 ** 오늘이 두 날짜 사이에 포함되는지 확인합니다.
 * @param {string | Date} date1 - 첫 번째 날짜 (문자열 또는 Date 객체)
 * @param {string | Date} date2 - 두 번째 날짜 (문자열 또는 Date 객체)
 * @returns {boolean} - 오늘이 두 날짜 사이에 포함되면 true, 그렇지 않으면 false
 */
const isTodayBetweenDates = (date1: string | Date, date2: string | Date) => {
  const today = new Date();
  const startDate = new Date(date1);
  const endDate = new Date(date2);

  // 오늘이 startDate와 endDate 사이에 있는지 확인
  return startDate <= today && today <= endDate;
};

//!--------------------------------------------------------------------
/**
 ** 할인율 계산
 */
const calcDiscountPercentage = (originalPrice: number, discountedPrice: number) => {
  if (originalPrice === 0) return 0;
  return Math.floor(((originalPrice - discountedPrice) / originalPrice) * 100);
};

//!--------------------------------------------------------------------
/**
 ** 날짜 계산 M/DD
 * - fill.month(default:false): 1의자리 0 채우기
 * - fill.day(default:false): 1의자리 0 채우기
 */
const calcMDD = (date: string | Date, fill: { month: boolean; day: boolean } = { month: false, day: false }) => {
  const d = new Date(date);
  let month: string | number = d.getMonth() + 1; // 월은 0부터 시작하므로 +1
  let day: string | number = d.getDate();

  if (fill.month) {
    month = formatToTwoDigits(month);
  }
  if (fill.day) {
    day = formatToTwoDigits(day);
  }

  return `${month}/${day}`;
};
//!--------------------------------------------------------------------
/**
 ** 오전 오후 시간 계산
 */
const calcAH = (date: string | Date) => {
  const d = new Date(date);
  const hours = d.getHours();

  const period = hours >= 12 ? "오후" : "오전";
  const hourIn12Format = hours % 12 || 12; // 12시를 0으로 변환 방지

  return `${period} ${hourIn12Format}시`;
};

//!--------------------------------------------------------------------
/**
 ** 오전 오후 시간 분 계산
 */
const calcAHM = (date: string | Date) => {
  const d = new Date(date);
  const hours = d.getHours();
  const minutes = d.getMinutes();

  const period = hours >= 12 ? "오후" : "오전";
  const hourIn12Format = hours % 12 || 12; // 12시를 0으로 변환 방지

  return `${period} ${hourIn12Format}시 ${minutes}분`;
};

//!--------------------------------------------------------------------
/**
 ** 현재 시간과, 미래의 특정 시간 사이의 (시간, 분, 초) 차이
 * @param {string} targetTime - 목표 시간 (ISO 8601 형식의 날짜 문자열)
 * @param {Date} currentTime - 현재 시간
 * @returns {Object} - 남은 시간
 */
interface RemainingTime {
  isPassedTime: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
const remainingTime = (targetTime: string | Date, currentTime: string | Date): RemainingTime => {
  const targetDate = new Date(targetTime);
  const currentDate = new Date(currentTime);

  // 목표 시간이 이미 지났는지 확인
  if (targetDate <= currentDate) {
    return {
      isPassedTime: true,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  // 남은 시간 계산
  const diffInMillis = targetDate.getTime() - currentDate.getTime();

  const seconds = Math.floor(diffInMillis / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  return {
    isPassedTime: false,
    days: days,
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: seconds % 60,
  };
};

//!--------------------------------------------------------------------
interface TimeAgoResult {
  timeAgo: string;
}
/**
 * @param {string} inputTime - 입력 시간 (ISO 8601 형식의 날짜 문자열)
 * @returns {TimeAgoResult} - 상대적인 시간 문자열
 */
const timeAgo = (inputTime: string): TimeAgoResult => {
  const inputDate = new Date(inputTime);
  const now = new Date();

  // 입력 시간과 현재 시간 사이의 차이를 밀리초 단위로 계산
  const diffInMillis = now.getTime() - inputDate.getTime();

  // 차이를 초, 분, 시간, 일, 월, 년으로 변환
  const seconds = Math.floor(diffInMillis / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30); // 대략적인 월 계산
  const years = Math.floor(days / 365); // 대략적인 년 계산

  // 차이에 따라 적절한 문자열 반환
  if (seconds < 60) {
    return { timeAgo: `${seconds}초 전` };
  } else if (minutes < 60) {
    return { timeAgo: `${minutes}분 전` };
  } else if (hours < 24) {
    return { timeAgo: `${hours}시간 전` };
  } else if (days < 30) {
    return { timeAgo: `${days}일 전` };
  } else if (months < 12) {
    return { timeAgo: `${months}개월 전` };
  } else {
    return { timeAgo: `${years}년 전` };
  }
};

//!--------------------------------------------------------------------
/**
 ** HTML 문자열에서 태그를 제외한 순수 텍스트의 길이를 계산
 * @param {string} htmlString - HTML 형식의 문자열
 * @returns {number} - 순수 텍스트의 길이
 */
const getTextLength = (htmlString: string) => {
  // HTML 태그를 제거하기 위한 정규 표현식
  const textOnly = htmlString.replace(/<[^>]*>/g, "");
  // 텍스트의 길이를 반환
  return textOnly.length;
};

interface DDayResult {
  days: number;
  isPassedTime: boolean;
}
/**
 * 주어진 목표 날짜까지 남은 D-Day를 계산합니다.
 * @param {string} targetDate - 목표 날짜 (ISO 8601 형식의 날짜 문자열)
 * @param {Date} [currentDate] - 현재 날짜 (기본값은 현재 시스템 시간)
 * @returns {DDayResult} - D-Day 결과 객체
 * 1) targetDate가 미래 날짜일 경우, days는 목표 날짜까지 남은 일수를 반환합니다.
 * 2) targetDate가 현재 날짜와 같거나 이전 날짜일 경우, days는 0으로 설정되고 isPassedTime은 true로 설정됩니다.
 */
const calculateDDay = (targetDate: string, currentDate: Date = new Date()): DDayResult => {
  const target = new Date(targetDate);
  const now = currentDate;

  // 목표 날짜가 현재 날짜보다 이전인지 확인
  if (target <= now) {
    return {
      days: 0,
      isPassedTime: true,
    };
  }

  // 목표 날짜와 현재 날짜 사이의 차이를 계산 (밀리초 단위)
  const diffInMillis = target.getTime() - now.getTime();

  // 밀리초를 일 단위로 변환
  const days = Math.ceil(diffInMillis / (1000 * 60 * 60 * 24));

  return {
    days: days,
    isPassedTime: false,
  };
};

//!--------------------------------------------------------------------
/**
 ** 바코드 하이픈 추가
 */
const addHypenBarcode = (value: string) => {
  if (!value || value.length === 0) return;

  if (value.length === 9) {
    return formatAddXString(value, "333", "-");
  }
  if (value.length === 10) {
    return formatAddXString(value, "334", "-");
  }
  if (value.length === 11) {
    return formatAddXString(value, "344", "-");
  }
  if (value.length === 12) {
    return formatAddXString(value, "444", "-");
  }
  if (value.length === 13) {
    return formatAddXString(value, "445", "-");
  }
  if (value.length === 14) {
    return formatAddXString(value, "455", "-");
  }
  if (value.length === 15) {
    return formatAddXString(value, "555", "-");
  }
  if (value.length === 16) {
    return formatAddXString(value, "4444", "-");
  }
  if (value.length === 17) {
    return formatAddXString(value, "4445", "-");
  }
  if (value.length === 18) {
    return formatAddXString(value, "4455", "-");
  }

  return value;
};

export {
  addHypenBarcode,
  calcAH,
  calcAHM,
  calcDiscountPercentage,
  calcMDD,
  calculateDDay,
  calculateDateDifference,
  callNumber,
  decodeBase64,
  decodeHTMLEntities,
  delayExecution,
  delayThrottleExecution,
  encodeBase64,
  extractCleanedText,
  formatAddXString,
  formatToTwoDigits,
  geKoreanNumber,
  generateRandomNumberPostfix,
  generateRandomString,
  generateRandomStringPostfix,
  getCookie,
  getDeviceInfo,
  getDotNumString,
  getElementSizeById,
  getFromLocalStorage,
  getFromSessionStorage,
  getHeaderData,
  getJSONParam,
  getParams,
  getRandomNumber,
  getTextLength,
  getTodayDayOfWeek,
  howManyThread,
  ignoreParamsQueryString,
  inOnline,
  isEmpty,
  isJSON,
  isTodayBetweenDates,
  isWeekend,
  periodicExecution,
  processHTMLString,
  remainingTime,
  removeFromLocalStorage,
  removeFromSessionStorage,
  saveToLocalStorage,
  saveToSessionStorage,
  scriptImportRecursive,
  setCookie,
  setFontSize,
  shuffleArray,
  throttleExecution,
  timeAgo,
  updateLocalStorage,
  updatePseudoElementStyle,
  updateSessionStorage,
  whatLanguage,
  whatOrientation,
  wrapUrlWithATag,
};
