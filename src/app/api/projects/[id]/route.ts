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

    const projectIndex = data.projects.findIndex((p) => p.id === id);
    if (projectIndex === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    data.projects[projectIndex] = {
      ...data.projects[projectIndex],
      title: body.title,
      description: body.description,
      slug: body.slug,
      tags: body.tags || [],
      image_url: body.image_url,
      github_url: body.github_url || undefined,
      live_url: body.live_url || undefined,
    };

    await savePortfolioData(data);
    return NextResponse.json(data.projects[projectIndex]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
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
    const projectIndex = data.projects.findIndex((p) => p.id === id);

    if (projectIndex === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    data.projects.splice(projectIndex, 1);
    await savePortfolioData(data);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
