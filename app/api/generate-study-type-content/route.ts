import { db } from "@/configs/db";
import { STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { chapters, courseId, difficultyLevel, type } = await req.json();
  const PROMPT = `
    
    Generate a set of up to 20 professional-level flashcards focused on the topic of ${chapters}, targeting the ${difficultyLevel} difficulty level. Each flashcard must include a technically challenging question and a concise, clear, and accurate answer. The output should be structured in JSON format, with a topic, difficultyLevel, and an array of flashcards, where each item has a question and answer. Use professional language and ensure all content is technically valid and educationally valuable.
    {
        "topic": "ReactJS",
        "difficultyLevel": "hard",
        "flashcards":
        [
            {
                "question": "What is the difference between React.memo and useMemo?",
                "answer": "React.memo is a higher-order component used to prevent unnecessary re-renders of functional components when props haven’t changed. useMemo is a hook that memoizes the result of a function, optimizing expensive calculations by recalculating only when dependencies change."
            },
            {
                "question": "How does React’s reconciliation algorithm handle keys during list rendering?",
                "answer": "React uses the key prop to identify which items in a list have changed, been added, or removed. Properly assigning unique and stable keys helps React optimize DOM updates by minimizing the number of elements it re-renders or reorders."
            }
                // Add up to 20 total flashcards
        ]
    }
    `;

  const result = await db
    .insert(STUDY_TYPE_CONTENT_TABLE)
    .values({
      courseId: courseId,
      type: type,
    })
    .returning({ id: STUDY_TYPE_CONTENT_TABLE.id });

  inngest.send({
    name: "study.type.content.generate",
    data: {
      studyType: type,
      prompt: PROMPT,
      courseId: courseId,
      recordId: result[0].id,
    },
  });

  return NextResponse.json({
    message: "Study type content generation started",
    status: "success",
    data: result[0].id,
  });
}
