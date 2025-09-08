import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";

export const ingest = action({
  args: {
    splitText: v.any(), // assuming this is an array of metadata objects
    fileId: v.any(),
  },
  handler: async (ctx, args) => {
    await ConvexVectorStore.fromTexts(
      args.splitText, // metadata for each text
      args.fileId, // storage ID
      new GoogleGenerativeAIEmbeddings({
        apiKey: "AIzaSyCqxBA7P8F0P58BhUf0KZGHPXHG1ReheqQ",
        model: "text-embedding-004",
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );
    return "Inserted";
  },
});
