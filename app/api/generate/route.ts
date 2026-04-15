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

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Build detailed prompt
    const prompt = `You are a social media content creator for Cuemath, an ed-tech brand for children aged 6-16. Create content for parents.

Return ONLY a JSON object. No markdown. No backticks. No explanation. Start with { and end with }.

Create ${slideCount} slides for this idea: ${idea}
Format type: ${format}

Rules:
- Slide 1 must be a hook that grabs attention
- Middle slides build the story  
- Last slide has a clear takeaway
- Speak to parents about their children
- Keep headlines under 8 words
- Keep subtext under 25 words
- Use only ASCII characters, no special characters
- callToAction only on the last slide

JSON structure to return:
{"title":"string","slides":[{"slideNumber":1,"headline":"string","subtext":"string","callToAction":null,"icon":"Star","layoutStyle":"center","gradientStyle":"gradient1"}],"hashtags":["#Cuemath"],"suggestedCaption":"string"}

Valid icon values: Star, Brain, Zap, Heart, BookOpen, Trophy, Target, Lightbulb, Users, TrendingUp, Clock, Shield
Valid layoutStyle values: center, split, iconTop, bigText
Valid gradientStyle values: gradient1, gradient2, gradient3, gradient4, gradient5, gradient6
Last slide must have callToAction as a string not null.
Only last slide has callToAction, all others must have callToAction set to null.`;

    // Call Gemini API
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    

    let jsonString = responseText;

    // Remove markdown
    jsonString = jsonString.replace(/```json/gi, "").replace(/```/gi, "").trim();

    // Extract JSON object
    const firstBrace = jsonString.indexOf("{");
    const lastBrace = jsonString.lastIndexOf("}");
    if (firstBrace === -1 || lastBrace === -1) {
      throw new Error("No JSON found in response");
    }
    jsonString = jsonString.substring(firstBrace, lastBrace + 1);

    // Fix trailing commas
    jsonString = jsonString.replace(/,(\s*[}\]])/g, "$1");

    // Remove actual newlines inside string values (replace with space)
    jsonString = jsonString.replace(/(?<=":.*)\n(?=.*")/g, " ");

    // Replace smart quotes with regular quotes
    jsonString = jsonString.replace(/[\u2018\u2019]/g, "'");
    jsonString = jsonString.replace(/[\u201C\u201D]/g, '"');

    // Remove control characters
    jsonString = jsonString.replace(/[\x00-\x1F\x7F]/g, (match) => {
      if (match === '\n' || match === '\r' || match === '\t') return ' ';
      return '';
    });

    let generatedContent;
    try {
      generatedContent = JSON.parse(jsonString);
    } catch (parseError) {
      console.error("JSON parse failed, string was:", jsonString.substring(0, 500));
      throw new Error("Failed to parse Gemini response as JSON");
    }

    if (!generatedContent.slides || !Array.isArray(generatedContent.slides)) {
      throw new Error("Invalid response - no slides array");
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
