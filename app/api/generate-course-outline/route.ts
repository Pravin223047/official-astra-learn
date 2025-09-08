import { courseOutline } from "@/configs/AiModel";
import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { courseId, topic, courseType, difficultyLevel, createdBy } = body;

    // Basic validation
    if (!courseId || !topic || !courseType || !difficultyLevel || !createdBy) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    console.log("Generating course outline for:", {
      courseId,
      topic,
      courseType,
      difficultyLevel,
      createdBy,
    });

    // Generate AI response
    const prompt = `Generate study material for the ${topic} programming language tailored for ${courseType} preparation. The difficulty level should be set to '${difficultyLevel}'. Include a concise course summary, a list of at least 10 chapters, a programming main language one-word keyword given in "programming_keyword" (e.g. python, java, web_development, ai, ml, etc.). If the topic covers multiple areas, use mix as the "programming_keyword". Also, include a detailed breakdown of topics within each chapter with the relevant emoji and short summary of the chapters. Provide all results in structured JSON format only.`;

    const aiResponse = await courseOutline.sendMessage(prompt);
    const aiResultText = await aiResponse.response.text();

    let jsonResponse;
    try {
      jsonResponse = JSON.parse(aiResultText);
    } catch (parseError) {
      console.error("AI response is not valid JSON:", aiResultText);
      return NextResponse.json(
        { error: "Failed to parse AI response as JSON." },
        { status: 500 }
      );
    }

    // Save to DB
    const result = await db
      .insert(STUDY_MATERIAL_TABLE)
      .values({
        courseId,
        topic,
        courseType,
        difficultyLevel,
        courseLayout: JSON.stringify(jsonResponse),
        createdBy,
      })
      .returning();

    //Trigger the inngest function to generate chapter notes

    const triggerresult = await inngest.send({
      name: "notes.generate",
      data: {
        course: result[0],
      },
    });
    console.log("Inngest function triggered:", triggerresult);

    return NextResponse.json(
      { success: true, data: triggerresult },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server error while generating course outline:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
