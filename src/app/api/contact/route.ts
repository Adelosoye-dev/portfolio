import { NextResponse } from "next/server";

/**
 * Stub contact endpoint. Wire this to your mail provider (Resend, Postmark, …)
 * and read the API key from an env var — never hard-code it.
 */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    name?: string;
    email?: string;
    message?: string;
  } | null;

  if (!body?.email || !body?.message) {
    return NextResponse.json(
      { error: "email and message are required" },
      { status: 400 },
    );
  }

  // TODO: send the message.
  return NextResponse.json({ ok: true });
}
