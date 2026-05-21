import { NextRequest, NextResponse } from "next/server";
import { getPortfolioData, savePortfolioData, generateId, getCurrentTimestamp } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { Experience } from "@/types";

export async function GET() {
  try {
    const data = await getPortfolioData();
    return NextResponse.json(data.experience);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch experience" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAuthenticated = await getSession();
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const data = await getPortfolioData();

    const newExperience: Experience = {
      id: generateId(),
      company: body.company,
      role: body.role,
      description: body.description,
      start_date: body.start_date,
      end_date: body.end_date || undefined,
      is_current: body.is_current || false,
      created_at: getCurrentTimestamp(),
    };

    data.experience.push(newExperience);
    await savePortfolioData(data);

    return NextResponse.json(newExperience, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create experience" }, { status: 500 });
  }
}
