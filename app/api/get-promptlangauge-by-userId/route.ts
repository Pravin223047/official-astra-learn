import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = user.id;

    // 🔧 Ensure this field matches your DB schema
    const languages = await db.languageprompt.findMany({
      where: { languagepromptId: userId }, // <-- use the correct foreign key field
    });
    return NextResponse.json({ languages }, { status: 200 });
  } catch (error) {
    console.error("❌ Fetching languages failed:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch languages",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  } finally {
    await db.$disconnect();
  }
}
