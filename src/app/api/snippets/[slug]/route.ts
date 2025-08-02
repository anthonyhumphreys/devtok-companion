import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const snippet = await prisma.snippet.findUnique({
      where: { slug: params.slug },
      include: {
        user: {
          select: {
            name: true,
            tiktokUsername: true,
            image: true,
          },
        },
      },
    });

    if (!snippet) {
      return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
    }

    // Increment view count
    await prisma.snippet.update({
      where: { slug: params.slug },
      data: { views: { increment: 1 } },
    });

    // Track analytics
    const userAgent = request.headers.get("user-agent") || undefined;
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      undefined;
    const referrer = request.headers.get("referer") || undefined;

    await prisma.analytics.create({
      data: {
        snippetId: snippet.id,
        userId: snippet.userId,
        event: "view",
        userAgent,
        ip: Array.isArray(ip) ? ip[0] : ip,
        referrer,
      },
    });

    return NextResponse.json(snippet);
  } catch (error) {
    console.error("Error fetching snippet:", error);
    return NextResponse.json(
      { error: "Failed to fetch snippet" },
      { status: 500 }
    );
  }
}
