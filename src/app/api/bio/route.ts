import { NextRequest, NextResponse } from "next/server";
import { getPortfolioData, savePortfolioData } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const data = await getPortfolioData();
    // Return bio + skills together so the Settings page has everything in one request
    return NextResponse.json({ bio: data.bio, skills: data.skills });
  } catch {
    return NextResponse.json({ error: "Failed to fetch bio" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const isAuthenticated = await getSession();
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const data = await getPortfolioData();

    data.bio = {
      name: body.name || data.bio.name,
      title: body.title || data.bio.title,
      bio: body.bio || data.bio.bio,
      avatar: body.avatar || data.bio.avatar,
    };

    if (Array.isArray(body.skills)) {
      data.skills = body.skills;
    }

    await savePortfolioData(data);
    return NextResponse.json({ bio: data.bio, skills: data.skills });
  } catch {
    return NextResponse.json({ error: "Failed to update bio" }, { status: 500 });
  }
}
