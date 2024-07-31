import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // 요청 본문에서 JSON 데이터 추출
  const body = await request.json();
  const type = body.type;

  // drawNo가 없는 경우 에러 반환
  if (!type) {
    return NextResponse.json({ error: "type field is required in the request body" }, { status: 400 });
  }

  try {
    return NextResponse.json({ result: "" }, { status: 200 });
  } catch (error: any) {
    // 에러 처리
    return NextResponse.json({ error: error.stderr || "An unknown error occurred" }, { status: 500 });
  }
}
