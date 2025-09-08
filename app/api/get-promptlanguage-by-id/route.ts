import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const languagepromptId = searchParams.get("languagepromptId");
    const userId = searchParams.get("userId");

    if (!languagepromptId || !userId) {
      return NextResponse.json(
        { error: "Story Prompt ID and User ID are required." },
        { status: 400 }
      );
    }

    // Fetch stories based on storypromptId and userId
    const languages = await db.languageprompt.findMany({
      where: {
        id: languagepromptId, // Assuming `id` is the correct field for the prompt ID
        languagepromptId: userId, // Ensure `userId` exists in your schema
      },
    });

    if (!languages.length) {
      return NextResponse.json(
        { error: "No languages found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ languages }, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching languages:", error);
    return NextResponse.json(
      { error: "Failed to fetch languages." },
      { status: 500 }
    );
  }
}
