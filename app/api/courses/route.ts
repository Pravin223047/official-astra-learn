import { desc, eq } from "drizzle-orm";
import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { NextRequest, NextResponse } from "next/server";

// POST - Get all study materials by user
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { createdBy } = body;

    if (!createdBy || typeof createdBy !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'createdBy' field." },
        { status: 400 }
      );
    }

    const result = await db
      .select()
      .from(STUDY_MATERIAL_TABLE)
      .where(eq(STUDY_MATERIAL_TABLE.createdBy, createdBy))
      .orderBy(desc(STUDY_MATERIAL_TABLE.id));

    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    console.error("Error fetching course outlines:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

// GET - Get study material by courseId
export async function GET(req: NextRequest) {
  try {
    const reqUrl = req.url;
    const { searchParams } = new URL(reqUrl);

    const courseId = searchParams.get("courseId");

    if (!courseId) {
      return NextResponse.json(
        { error: "Missing 'courseId' parameter." },
        { status: 400 }
      );
    }

    const course = await db
      .select()
      .from(STUDY_MATERIAL_TABLE)
      .where(eq(STUDY_MATERIAL_TABLE.courseId, courseId));

    return NextResponse.json({ result: course[0] }, { status: 200 });
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
