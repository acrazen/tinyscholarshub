// src/actions/smart-update-actions.ts
'use server';

import { generateDailyUpdateOptions, type GenerateDailyUpdateOptionsInput } from '@/ai/flows/generate-daily-update-options';

export async function getAIUpdateOptions(input: GenerateDailyUpdateOptionsInput) {
  try {
    const result = await generateDailyUpdateOptions(input);
    if (result && result.updateOptions) {
      return { success: true, data: result.updateOptions };
    }
    // Handle cases where output might be null or not in expected format from AI
    return { success: false, error: "AI did not return valid options.", data: [] };
  } catch (error) {
    console.error("Error generating AI update options:", error);
    // It's good practice to not expose raw error messages to the client
    // For debugging, you might log more details or have different error messages for dev/prod
    let errorMessage = "Failed to generate update options due to an unexpected error.";
    if (error instanceof Error) {
        // Potentially more specific error handling here
        errorMessage = `Failed to generate update options: ${error.message}`;
    }
    return { success: false, error: errorMessage, data: [] };
  }
}
