import { db } from "@/configs/db";
import {
  CHAPTER_NOTES_TABLE,
  STUDY_TYPE_CONTENT_TABLE,
} from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { courseId, studyType } = await req.json();

    if (!courseId || !studyType) {
      return NextResponse.json(
        { error: "Missing courseId or studyType." },
        { status: 400 }
      );
    }

    if (studyType === "ALL") {
      const notes = await db
        .select()
        .from(CHAPTER_NOTES_TABLE)
        .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));

      const contentList = await db
        .select()
        .from(STUDY_TYPE_CONTENT_TABLE)
        .where(eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId));

      return NextResponse.json(
        {
          notes,
          flashcards: contentList.filter((item) => item.type === "flashcards"),
          quiz: null,
          gq: null,
          interview: null,
        },
        { status: 200 }
      );
    } else if (studyType === "notes") {
      const notes = await db
        .select()
        .from(CHAPTER_NOTES_TABLE)
        .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));

      return NextResponse.json(
        {
          notes,
        },
        { status: 200 }
      );
    } else if (studyType === "flashcards") {
      const contentList = await db
        .select()
        .from(STUDY_TYPE_CONTENT_TABLE)
        .where(eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId));

      const flashcards = contentList.filter(
        (item) => item.type === "flashcards"
      );
      return NextResponse.json(
        {
          flashcards,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: `Unsupported studyType: ${studyType}` },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error in POST /api/study-type:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
