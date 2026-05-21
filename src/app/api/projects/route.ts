import { NextRequest, NextResponse } from "next/server";
import { getPortfolioData, savePortfolioData, generateId, getCurrentTimestamp } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { Project } from "@/types";

export async function GET() {
  try {
    const data = await getPortfolioData();
    return NextResponse.json(data.projects);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
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

    const newProject: Project = {
      id: generateId(),
      title: body.title,
      description: body.description,
      slug: body.slug,
      tags: body.tags || [],
      image_url: body.image_url,
      github_url: body.github_url || undefined,
      live_url: body.live_url || undefined,
      created_at: getCurrentTimestamp(),
    };

    data.projects.push(newProject);
    await savePortfolioData(data);

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
