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
              text: `You are an image analyzer. Describe this image in detail, including:

              1. Main subjects or objects
              2. Colors and visual elements
              3. Setting or environment
              4. Any text visible in the image
              5. Overall mood or theme

              Provide a concise but comprehensive analysis in 1-3 sentences.
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
