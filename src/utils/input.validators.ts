/***
 ** react-hook-form 사용예시
 * register={register("name", {
      validate: email,
      required: "필수 항목입니다.",
    })}
 */

/**
 ** 입력값의 필수값 체크
 */
const required = (value: string) => {
  return value ? true : "필수 항목입니다.";
};

/**
 ** 입력값의 이메일여부 체크
 */
const email = (value: string) => {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? true : "Email 형식이 아닙니다.";
};

/**
 ** 입력값의 휴대폰 형식 체크 01XxxxxXXXX
 */
const phone = (value: string) => {
  return /(01[016789])([1-9]{1}[0-9]{2,3})([0-9]{4})$/.test(value) ? true : "01XxxxxXXXX 방식으로 입력해주세요";
};

/**
 ** 입력값의 휴대폰 형식 체크 01X-XXXX-XXXX
 */
const hyphenPhone = (value: string) => {
  return /(01[016789])[-]([1-9]{1}[0-9]{2,3})[-]([0-9]{4})$/.test(value) ? true : "01X-XXXX-XXXX 방식으로 입력해주세요";
};

/**
 ** 입력값의 휴대폰 형식 체크 01XxxxxXXXX or 01X-XXXX-XXXX
 */
const phone_or_hyphenPhone = (value: string) => {
  if (phone(value) || hyphenPhone(value)) {
    return true;
  } else {
    return "01XxxxxXXXX or 01X-XXXX-XXXX";
  }
};

/**
 ** 입력값의 url 형식 체크
 */
const url = (value: string) => {
  return /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(value)
    ? true
    : "url만 입력 가능합니다. ex) 'http://www.abc.com'";
};

/**
 ** 입력값의 ip 형식 체크
 */
const ip = (value: string) => {
  return /^(((([*]|[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([*]|[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]){1})|[*]{1})$/.test(
    value
  )
    ? true
    : "ip만 입력 가능합니다. ex) '*', '*.*.*.*', '192.168.0.*', '192.168.0.100'";
};

/**
 ** 입력값의 url 또는 ip 형식 체크
 */
const ip_or_url = (value: string) => {
  if (ip(value) || url(value)) {
    return true;
  } else {
    return "ex) '192.168.0.*', 'http://www.abc.com'";
  }
};

/**
 ** 입력값의 숫자 체크
 */
const numOnly = (value: string) => {
  return /[^0-9]/g.test(value) ? true : "숫자만 입력 가능합니다.";
};

/**
 ** 설정숫자범위 입력값 체크
 * - min <= value <= max
 */
const betweenInteger = (min: number, max: number) => (value: number) => {
  if (min <= value && value <= max) return true;
  return `${min} ~ ${max}`;
};

/**
 ** 설정숫자범위 입력값 체크
 * - min <= value
 */
const minInteger = (min: number) => (value: number) => {
  if (min <= value) return true;
  return `최소 설정: ${min}`;
};

/**
 ** 설정숫자범위 입력값 체크
 * - value <= max
 */
const maxInteger = (max: number) => (value: number) => {
  if (value <= max) return true;
  return `최대 설정: ${max}`;
};

/**
 ** 입력값의 max length 체크
 */
const maxLength = (max: number) => (value: string) => {
  return value.length < max ? true : max + "자 이하 입력해주세요.";
};

/**
 ** 입력값의 min length 체크
 */
const minLength = (min: number) => (value: string) => {
  return value.length > min ? true : min + "자 이상 입력해주세요.";
};

/**
 ** 설정날짜범위 입력값 체크
 * - min <= value
 */
const maxDate = (min: Date) => (value: Date) => {
  if (min <= value) return true;
  return "날짜를 옳바르게 설정해주세요. " + "최소설정: " + new Date(min).toLocaleDateString();
};

/**
 ** 설정날짜범위 입력값 체크
 * - value <= max
 */
const minDate = (max: Date) => (value: Date) => {
  if (value <= max) return true;
  return "날짜를 옳바르게 설정해주세요. " + "최대설정: " + new Date(max).toLocaleDateString();
};

/**
 ** 비밀번호 패턴 체크
 * - 알파벳, 숫자, 특수문자, length
 */
const password_level3 = (min: number, max: number) => (value: string) => {
  const regExp = new RegExp(`(?=.*\\d)(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[~!@#$%^&'*_+?\\\\-]).{${min},${max}}`, "");

  return regExp.test(value) ? true : `알파벳, 숫자, 특수문자( ~!@#$%^&'*_+?- )를 포함 ${min}~${max}자여야 합니다.`;
};

/**
 ** 대소문자, 숫자 조합 패턴
 * - 알파벳, 숫자, length
 */
const password_level2 = (min: number, max: number) => (value: string) => {
  const regExp = new RegExp(`(?=.*\\d)(?=.*[0-9])(?=.*[a-zA-Z]).{${min},${max}}`, "");
  return regExp.test(value) ? true : `알파벳, 숫자를 포함 ${min}~${max}자여야 합니다.`;
};

/**
 ** 비밀번호 동일성 체크
 * - value1 === value2
 */
const compare_password = (value1: string) => (value2: string) => {
  return value1 === value2 ? true : "비밀번호가 정확하지 않습니다.";
};

export {
  betweenInteger,
  compare_password,
  email,
  hyphenPhone,
  ip,
  ip_or_url,
  maxDate,
  maxInteger,
  maxLength,
  minDate,
  minInteger,
  minLength,
  numOnly,
  password_level2,
  password_level3,
  phone,
  phone_or_hyphenPhone,
  required,
  url,
};
