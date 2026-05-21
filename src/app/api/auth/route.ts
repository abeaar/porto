import { NextRequest, NextResponse } from "next/server";
import { verifyCredentials, createSession, destroySession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password, action } = body;

    if (action === "login") {
      const isValid = await verifyCredentials(username, password);

      if (!isValid) {
        return NextResponse.json(
          { error: "Invalid credentials" },
          { status: 401 }
        );
      }

      await createSession();
      return NextResponse.json({ success: true, message: "Logged in successfully" });
    } else if (action === "logout") {
      await destroySession();
      return NextResponse.json({ success: true, message: "Logged out successfully" });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
