import { cookies } from "next/headers";

const SESSION_KEY = "admin_session";
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export async function verifyCredentials(
  username: string,
  password: string
): Promise<boolean> {
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUsername || !adminPassword) {
    console.error("ADMIN_USERNAME or ADMIN_PASSWORD env vars are not set.");
    return false;
  }

  return username === adminUsername && password === adminPassword;
}

export async function createSession(): Promise<void> {
  const cookieStore = await cookies();
  const sessionData = {
    authenticated: true,
    timestamp: Date.now(),
  };

  cookieStore.set(SESSION_KEY, JSON.stringify(sessionData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: SESSION_DURATION,
  });
}

export async function getSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_KEY);

  if (!sessionCookie) return false;

  try {
    const session = JSON.parse(sessionCookie.value);
    const isExpired = Date.now() - session.timestamp > SESSION_DURATION;

    if (isExpired) {
      await destroySession();
      return false;
    }

    return session.authenticated === true;
  } catch {
    return false;
  }
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_KEY);
}
