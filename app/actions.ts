"use server";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";
import { generateObject } from "ai";
const groq = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});
export async function generateBio(
  input: string,
  temperature: number,
  model: string
) {
  const { object: data } = await generateObject({
    model: groq(model),
    system: "You generate three notifications for a messages app.",
    prompt: input,
    maxTokens: 1024,
    temperature: temperature,
    schema: z.object({
      data: z.array(
        z.object({
          bio: z.string().describe("Add generated bio here"),
        })
      ),
    }),
  });

  return { data };
}
