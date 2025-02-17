import { NextResponse } from "next/server"

export async function GET() {
  const response = await fetch("https://raw.githubusercontent.com/yourusername/yourrepo/main/content.md")
  const content = await response.text()
  return new NextResponse(content)
}

