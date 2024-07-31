import fs from "fs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // JSON 파일 읽기
    const data = fs.readFileSync("sample.json", "utf-8");
    const result = JSON.parse(data);

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.stderr }, { status: 500 });
  }
}
