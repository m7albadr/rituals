import { NextResponse } from "next/server";

export async function GET() {
  const vcard = `BEGIN:VCARD
VERSION:3.0
N:;Rituals;;;
FN:Rituals
ORG:Rituals
TEL;TYPE=CELL:+96595512717
URL:https://ritualskw.com
NOTE:Premium Chalets in Kuwait
END:VCARD`;

  return new NextResponse(vcard, {
    headers: {
      "Content-Type": "text/vcard",
      "Content-Disposition": "attachment; filename=rituals.vcf",
    },
  });
}
