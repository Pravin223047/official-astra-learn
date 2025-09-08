import { db } from "@/configs/db";
import { inngest } from "./client";
import {
  CHAPTER_NOTES_TABLE,
  STUDY_MATERIAL_TABLE,
  STUDY_TYPE_CONTENT_TABLE,
  USER_TABLE,
} from "@/configs/schema";
import { eq } from "drizzle-orm";
import { flashCardOuline, notesOutline } from "@/configs/AiModel";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

export const CreateNewUser = inngest.createFunction(
  { id: "create-user" },
  { event: "user.create" },
  async ({ event, step }) => {
    const user = event.data?.user;
    const userEmail = user?.primaryEmailAddress?.emailAddress || user?.email;

    if (!userEmail) {
      console.warn("No userEmail provided in event data");
      return { message: "No email provided in event data." };
    }

    const result = await step.run("create-user", async () => {
      const existingUsers = await db
        .select()
        .from(USER_TABLE)
        .where(eq(USER_TABLE.email, userEmail));

      if (existingUsers.length === 0) {
        const userResponse = await db
          .insert(USER_TABLE)
          .values({
            userName: user?.fullName || "New User",
            email: userEmail,
            isMember: false,
          })
          .returning({
            id: USER_TABLE.id,
          });

        console.log("User inserted:", userResponse);
        return userResponse[0]; // Return the inserted user
      } else {
        console.log("User already exists:", existingUsers[0]);
        return existingUsers[0];
      }
    });

    return {
      message: `User ${userEmail} processed!`,
      data: result,
    };
  }
);

export const GenerateNotes = inngest.createFunction(
  { id: "generate-notes" },
  { event: "notes.generate" },
  async ({ event, step }) => {
    const { course } = event.data;
    const courseId = course?.courseId;

    if (!courseId) {
      throw new Error("Invalid or missing course Id.");
    }

    // Step 1: Generate notes for each chapter
    const notesResult = await step.run("Generate Chapter Notes", async () => {
      const chapters = course.courseLayout?.chapters || [];

      if (chapters.length === 0) {
        throw new Error("No chapters found in the course layout.");
      }

      for (let index = 0; index < chapters.length; index++) {
        const chapter = chapters[index];

        try {
          const PROMPT = `You are an advanced AI model specialized in generating high-quality, exam-focused academic content. Your task is to produce comprehensive and structured study material for the given chapter, ensuring that every topic and sub-topic is thoroughly covered. The output must be returned as a single JavaScript object with the keys: "chapter_no", "chapter_title", and "html_content". The "html_content" must be in HTML format, styled entirely with Tailwind CSS classes, and must not include the <html>, <head>, <body>, or <title> tags.

The main content container should have the following styles:
- Background color of 'gray-50' in light mode and 'gray-800' in dark mode.
- Text color of 'text-black' in light mode and 'text-white' in dark mode.
- Apply 'rounded-md' for rounded corners to give it a sleek, modern appearance.

Do not use the 'container' class at all; instead, use Tailwind's padding, margin, flex, and grid utilities to create a clean, responsive layout. Ensure generous spacing between sections to enhance readability.

Content should be formatted with appropriate semantic elements like headings, subheadings, paragraphs, and lists. Use vibrant, readable text colors to highlight important points, improving visual engagement and retention. All code blocks must follow this specific styling: in light mode, use a background color of gray-200 with black text; in dark mode, the background must be fully black with white text. Ensure these styles are properly applied using Tailwind's dark mode support (e.g., 'dark:bg-black dark:text-white').

The final output must be visually appealing, accessible, and academically suitable for ${course.courseType} preparation at a ${course.difficultyLevel} difficulty level. Provide only the final HTML content as part of the object in the format {"chapter_no", "chapter_title", "html_content"}. The chapter to be processed is: ${JSON.stringify(chapter)}.`;

          const result = await notesOutline.sendMessage(PROMPT);

          // FIX: Assume `result` is already a string
          const aiResp = result.response.text();

          const dbResult = await db
            .insert(CHAPTER_NOTES_TABLE)
            .values({
              courseId,
              chapterId: `chapter-${index}`,
              notes: aiResp,
            })
            .returning();

          console.log(
            "Chapter",
            dbResult[0]?.chapterId,
            "notes generated successfully"
          );
        } catch (error) {
          console.error(`Error processing chapter ${index}:`, error);
        }
      }

      return "All chapter notes generated.";
    });

    // Step 2: Update course status
    const updateCourseStatus = await step.run(
      "update-course-status",
      async () => {
        try {
          const result = await db
            .update(STUDY_MATERIAL_TABLE)
            .set({ status: "Completed" })
            .where(eq(STUDY_MATERIAL_TABLE.courseId, courseId))
            .returning();

          return { status: "SUCCESS", result };
        } catch (error) {
          console.error("Error updating course status:", error);
          throw new Error("Failed to update course status.");
        }
      }
    );

    return notesResult;
  }
);

export const GenerateStudyTypeContent = inngest.createFunction(
  { id: "generate-study-type-content" },
  { event: "study.type.content.generate" },
  async ({ event, step }) => {
    const { studyType, prompt, courseId, recordId } = event.data;

    const FlashCardContent = await step.run(
      "Generate Flashcard Content",
      async () => {
        const result = await flashCardOuline.sendMessage(prompt);
        const AIResult = JSON.parse(result.response.text());

        return AIResult;
      }
    );

    const dbResult = await step.run("Insert Study Type Content", async () => {
      const result = await db
        .update(STUDY_TYPE_CONTENT_TABLE)
        .set({
          content: FlashCardContent,
          status: "Completed",
        })
        .where(eq(STUDY_TYPE_CONTENT_TABLE.id, recordId))
        .returning();

      if (result.length === 0) {
        throw new Error("No rows updated.");
      }

      return {
        message: "Study Type Content Inserted",
        data: result[0],
      };
    });
  }
);
