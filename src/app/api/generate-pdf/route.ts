// app/api/generate-pdf/route.ts

import fontkit from "@pdf-lib/fontkit";
import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";
import { PDFDocument, rgb } from "pdf-lib";

/**
 * pdfType: PDF문서 타입
 */

export async function POST(request: Request) {
  const { pdfType, name, address, phone } = await request.json();

  // PDF 템플릿 파일의 경로 설정
  const templatePath = path.resolve(`public/pdf/${pdfType}.pdf`);
  const existingPdfBytes = fs.readFileSync(templatePath);

  // JSON 파일의 경로 설정 및 읽기
  const templatesPath = path.resolve("public/pdfTemplates.json");
  const templates = JSON.parse(fs.readFileSync(templatesPath, "utf-8"));

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const page = pdfDoc.getPages()[0];

  const fontfile = "public/fonts/NotoSerifCJKkr-Regular.otf";

  const fontBytes = fs.readFileSync(fontfile);
  pdfDoc.registerFontkit(fontkit);
  await pdfDoc.embedFont(fontBytes);
  const customFont = await pdfDoc.embedFont(fontBytes);

  // 해당 PDF 타입에 맞는 위치 데이터 가져오기
  const positions = templates[pdfType];

  // 공란에 데이터 입력
  if (positions) {
    if (positions.name) {
      page.drawText(name || "", {
        x: positions.name.x,
        y: positions.name.y,
        size: positions.name.size,
        font: customFont,
        color: rgb(0, 0, 0),
      });
    }
    if (positions.address) {
      page.drawText(address || "", {
        x: positions.address.x,
        y: positions.address.y,
        size: positions.address.size,
        font: customFont,
        color: rgb(0, 0, 0),
      });
    }
    if (positions.phone) {
      page.drawText(phone || "", {
        x: positions.phone.x,
        y: positions.phone.y,
        size: positions.phone.size,
        font: customFont,
        color: rgb(0, 0, 0),
      });
    }
  } else {
    return new NextResponse("Invalid PDF type", { status: 400 });
  }

  const pdfBytes = await pdfDoc.save();

  // 클라이언트로 PDF 반환
  return new NextResponse(pdfBytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="filled_template.pdf"',
    },
  });
}
