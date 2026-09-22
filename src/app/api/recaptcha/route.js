import { NextResponse } from "next/server";

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

export async function POST(request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { success: false, error: "No reCAPTCHA token provided" },
        { status: 400 }
      );
    }

    // Verify the reCAPTCHA token with Google's API
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify`;
    const verificationResponse = await fetch(verificationUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: RECAPTCHA_SECRET_KEY,
        response: token,
      }),
    });

    const verificationData = await verificationResponse.json();

    if (verificationData.success && verificationData.score >= 0.5) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: verificationData["error-codes"] || "Low score",
          score: verificationData.score,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
