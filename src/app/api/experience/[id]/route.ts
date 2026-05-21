import { NextRequest, NextResponse } from "next/server";
import { getPortfolioData, savePortfolioData } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuthenticated = await getSession();
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const data = await getPortfolioData();

    const expIndex = data.experience.findIndex((e) => e.id === id);
    if (expIndex === -1) {
      return NextResponse.json({ error: "Experience not found" }, { status: 404 });
    }

    data.experience[expIndex] = {
      ...data.experience[expIndex],
      company: body.company,
      role: body.role,
      description: body.description,
      start_date: body.start_date,
      end_date: body.end_date || undefined,
      is_current: body.is_current || false,
    };

    await savePortfolioData(data);
    return NextResponse.json(data.experience[expIndex]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update experience" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuthenticated = await getSession();
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const data = await getPortfolioData();
    const expIndex = data.experience.findIndex((e) => e.id === id);

    if (expIndex === -1) {
      return NextResponse.json({ error: "Experience not found" }, { status: 404 });
    }

    data.experience.splice(expIndex, 1);
    await savePortfolioData(data);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete experience" }, { status: 500 });
  }
}
