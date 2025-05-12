// src/ai/flows/generate-daily-update-options.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating daily update options for teachers to share classroom activities with parents.
 *
 * - generateDailyUpdateOptions - A function that generates daily update options using AI.
 * - GenerateDailyUpdateOptionsInput - The input type for the generateDailyUpdateOptions function.
 * - GenerateDailyUpdateOptionsOutput - The return type for the generateDailyUpdateOptions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDailyUpdateOptionsInputSchema = z.object({
  activityDescription: z
    .string()
    .describe('Description of the day\'s activities in the classroom.'),
});
export type GenerateDailyUpdateOptionsInput = z.infer<
  typeof GenerateDailyUpdateOptionsInputSchema
>;

const GenerateDailyUpdateOptionsOutputSchema = z.object({
  updateOptions: z
    .array(z.string())
    .describe('An array of possible daily update options.'),
});
export type GenerateDailyUpdateOptionsOutput = z.infer<
  typeof GenerateDailyUpdateOptionsOutputSchema
>;

export async function generateDailyUpdateOptions(
  input: GenerateDailyUpdateOptionsInput
): Promise<GenerateDailyUpdateOptionsOutput> {
  return generateDailyUpdateOptionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDailyUpdateOptionsPrompt',
  input: {schema: GenerateDailyUpdateOptionsInputSchema},
  output: {schema: GenerateDailyUpdateOptionsOutputSchema},
  prompt: `You are a helpful assistant for teachers. Your task is to generate three different options for a daily feed update to parents, based on the provided description of the day's activities.

Description of activities: {{{activityDescription}}}

Your response should be an array of strings. Each string should be a concise and engaging update option suitable for sharing with parents of play school kids.

Format your response as a JSON array of strings.
`,
});

const generateDailyUpdateOptionsFlow = ai.defineFlow(
  {
    name: 'generateDailyUpdateOptionsFlow',
    inputSchema: GenerateDailyUpdateOptionsInputSchema,
    outputSchema: GenerateDailyUpdateOptionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
