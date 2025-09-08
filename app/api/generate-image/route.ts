import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// ✅ Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
  secure_url: string;
}

async function generateImage(title: string, prompt: string): Promise<string> {
  if (!title) throw new Error("Missing title for scene");
  if (!prompt) throw new Error("Missing prompt for scene");

  // Build main prompt
  const mainprompt = `cinematic book cover illustration of ${prompt}, titled "${title}", highly detailed, ultra-realistic, 4K, professional artwork`;

  // Use Stability AI's newer SD3 API
  const apiKey = "sk-ZQNd2SqrKRqI1aGEg6dO81KrBKTHbb7m2d96Qw9mQXAd0bgB";

  if (!apiKey) {
    throw new Error("Missing Stability AI API key");
  }

  let lastError: unknown;
  const maxRetries = 3;
  const retryDelay = 5000;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(
        `🔄 Attempt ${attempt} to generate image with Stability AI SD3`
      );

      // Create form data for the request
      const formData = new FormData();
      formData.append("prompt", mainprompt);
      formData.append("output_format", "jpeg");

      // Negative prompt
      formData.append(
        "negative_prompt",
        "low quality, blurry, pixelated, distorted, deformed, text, watermark, cartoonish, unrealistic"
      );

      // Call Stability AI SD3 API
      const response = await fetch(
        "https://api.stability.ai/v2beta/stable-image/generate/sd3",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            Accept: "image/*",
          },
          body: formData as any,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Stability AI API failed: ${response.status} ${errorText}`
        );
      }

      // Get the image buffer
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // ✅ Upload to Cloudinary
      const uploadResult: CloudinaryUploadResult = await new Promise(
        (resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: "story-images",
              resource_type: "image",
              quality: "auto",
              fetch_format: "auto",
            },
            (error, result) => {
              if (error) {
                reject(
                  new Error(
                    `Failed to upload image to Cloudinary: ${error.message}`
                  )
                );
              } else if (!result?.secure_url) {
                reject(new Error("Cloudinary response missing secure_url"));
              } else {
                resolve(result as CloudinaryUploadResult);
              }
            }
          );
          uploadStream.end(buffer);
        }
      );

      console.log("✅ Successfully generated & uploaded image");
      return uploadResult.secure_url;
    } catch (error) {
      lastError = error;
      console.warn(`⚠️ Attempt ${attempt} failed:`, error);

      if (attempt < maxRetries) {
        console.log(`⏳ Retrying in ${retryDelay / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      }
    }
  }

  console.error("🚨 All retries failed:", lastError);
  throw new Error(
    `Failed to generate scene image after ${maxRetries} attempts: ${lastError instanceof Error ? lastError.message : "Unknown error"}`
  );
}

// ✅ POST handler
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, prompt } = body;

    if (!title || !prompt) {
      console.error("🚨 Invalid input data:", { title, prompt });
      return NextResponse.json(
        { error: "Invalid input: Missing title or prompt" },
        { status: 400 }
      );
    }

    const sceneUrl = await generateImage(title, prompt);

    return NextResponse.json({
      success: true,
      title,
      sceneUrl,
    });
  } catch (error) {
    console.error("❌ Critical image generation failure:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate scene image",
        details: error instanceof Error ? error.message : "Unknown error",
        suggestion:
          "Please try again in a few moments or with a different prompt",
      },
      { status: 500 }
    );
  }
}
