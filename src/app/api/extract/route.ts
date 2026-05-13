import Together from "together-ai";
import { NextResponse } from "next/server";

const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY,
});

export async function POST(request: Request) {
  if (!process.env.TOGETHER_API_KEY) {
    return NextResponse.json(
      { error: "Together AI API key not configured" },
      { status: 500 },
    );
  }

  try {
    const { image } = await request.json();
    if (!image) {
      return NextResponse.json(
        { error: "Missing image data" },
        { status: 400 },
      );
    }
    const res = await together.chat.completions.create({
      model: "moonshotai/Kimi-K2.6",
      messages: [
        {
          role: "system",
          content: ``,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `You are an image text extractor. Extract all text visible in this image.

              Only return the text you see, nothing else. Do not include explanations or descriptions.

              If there is no text visible, respond with "No text found in the image."

              Once again, ONLY return the text you see, nothing else & If there is no text visible, respond with "No text found in the image."
              `,
            },
            {
              type: "image_url",
              image_url: {
                url: image,
              },
            },
          ],
        },
      ],
      stream: false,
      max_tokens: 6000,
      temperature: 0.7,
      top_p: 0.9,
    });

    const extractedText = res?.choices?.[0]?.message?.content;

    return Response.json({
      text: extractedText,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to process image",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
