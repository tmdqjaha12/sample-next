import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // 요청 본문에서 JSON 데이터 추출
  return NextResponse.json({ result: "get success" }, { status: 200 });
}
