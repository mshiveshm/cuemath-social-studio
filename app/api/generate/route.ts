import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

interface GenerateRequest {
  idea: string;
  format: string;
  slideCount: number;
}

interface Slide {
  slideNumber: number;
  headline: string;
  subtext: string;
  callToAction?: string | null;
  icon: string;
  layoutStyle: string;
  gradientStyle: string;
}

interface GenerateResponse {
  title: string;
  slides: Slide[];
  hashtags: string[];
  suggestedCaption: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: GenerateRequest = await request.json();

    // Validate required fields
    if (!body.idea || body.idea.trim().length === 0) {
      return NextResponse.json(
        { error: "idea field is required" },
        { status: 400 }
      );
    }

    const { idea, format, slideCount } = body;

    // Validate API key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY environment variable is not set");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Build detailed prompt
    const prompt = `You are a Cuemath social media content generator designed to create engaging, educational content for parents about their children's learning journey.

Generate a ${format} social media post with ${slideCount} slides based on this idea: "${idea}"

IMPORTANT: Return ONLY valid JSON (no markdown, no code blocks, no explanation).

The JSON structure must be:
{
  "title": "string - compelling post title",
  "slides": [
    {
      "slideNumber": number,
      "headline": "string - max 8 words, punchy and engaging",
      "subtext": "string - max 30 words, warm and encouraging tone directed at parents",
      "callToAction": "string or null - only include on the last slide, encouraging them to learn more",
      "icon": "string - relevant lucide icon name (e.g., Heart, Brain, Lightbulb, TrendingUp, etc.)",
      "layoutStyle": "string - one of: center, split, iconTop, bigText",
      "gradientStyle": "string - one of: gradient1, gradient2, gradient3, gradient4, gradient5, gradient6"
    }
  ],
  "hashtags": ["array of 5 relevant hashtags including #Cuemath"],
  "suggestedCaption": "string - engaging caption for the post"
}

STRUCTURE GUIDELINES:
- Slide 1 (Hook): Grab attention with a surprising fact or common struggle
- Middle Slides: Build the narrative, provide actionable insights for parents
- Last Slide: Powerful takeaway with clear call-to-action encouraging parents to support their child's learning

TONE: Warm, encouraging, educational, parent-focused, emphasizing growth and learning potential.

Generate the JSON now:`;

    // Call Gemini API
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Parse JSON from response - strip markdown code blocks if present
    let jsonString = responseText.trim();

    // Remove markdown code blocks if present
    if (jsonString.startsWith("```json")) {
      jsonString = jsonString.replace(/^```json\n?/, "").replace(/\n?```$/, "");
    } else if (jsonString.startsWith("```")) {
      jsonString = jsonString.replace(/^```\n?/, "").replace(/\n?```$/, "");
    }

    // Parse the JSON
    const generatedContent: GenerateResponse = JSON.parse(jsonString);

    // Validate the response structure
    if (
      !generatedContent.title ||
      !Array.isArray(generatedContent.slides) ||
      !Array.isArray(generatedContent.hashtags) ||
      !generatedContent.suggestedCaption
    ) {
      throw new Error("Invalid response structure from Gemini");
    }

    // Return the generated content
    return NextResponse.json(generatedContent);
  } catch (error) {
    console.error("Error generating content:", error);

    // Determine error message
    const errorMessage =
      error instanceof Error ? error.message : "Failed to generate content";

    return NextResponse.json(
      { error: errorMessage || "Internal server error" },
      { status: 500 }
    );
  }
}
