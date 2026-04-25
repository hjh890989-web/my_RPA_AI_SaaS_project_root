'use server';
/**
 * @fileOverview This file implements a Genkit flow for extracting structured operational data from factory floor observations.
 * It takes either a voice note or a camera image (or both) along with context, and uses AI to parse the input
 * into a structured log entry for review.
 *
 * - aiDataStructuring - The main function to call the AI data structuring flow.
 * - AiDataStructuringInput - The input type for the aiDataStructuring function.
 * - AiDataStructuringOutput - The return type for the aiDataStructuring function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiDataStructuringInputSchema = z.object({
  equipmentId: z.string().describe('The ID of the equipment being observed (e.g., "CNC-3", "Press-Line-1").'),
  location: z.string().describe('The location on the factory floor (e.g., "Line 3", "Assembly Area").'),
  operatorName: z.string().describe('The name of the operator making the observation.'),
  voiceNoteDataUri: z.string().optional().describe(
    "Optional: A voice note recording of the observation, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
  ),
  photoDataUri: z.string().optional().describe(
    "Optional: A photo of the observation, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
  ),
  contextNotes: z.string().optional().describe('Any additional text notes or context from the operator.'),
}).refine(data => data.voiceNoteDataUri || data.photoDataUri, {
  message: 'At least one of voiceNoteDataUri or photoDataUri must be provided.',
  path: ['voiceNoteDataUri', 'photoDataUri'], // Attach error to both fields
});

export type AiDataStructuringInput = z.infer<typeof AiDataStructuringInputSchema>;

const AiDataStructuringOutputSchema = z.object({
  equipmentStatus: z.string().describe('The current status of the equipment (e.g., "Running", "Idle", "Maintenance", "Error").'),
  readings: z.record(z.string(), z.string()).optional().describe('Key-value pairs of extracted readings (e.g., {"Temperature": "182°C", "Pressure": "4.5bar"}).'),
  issueDetected: z.boolean().describe('True if an issue or anomaly is detected, false otherwise.'),
  issueDescription: z.string().optional().describe('A description of any detected issue or anomaly.'),
  suggestedAction: z.string().optional().describe('A suggested immediate action based on the observation.'),
  confidenceScore: z.number().min(0).max(100).describe('Confidence score (0-100) of the AI extraction. Higher means more reliable.'),
});

export type AiDataStructuringOutput = z.infer<typeof AiDataStructuringOutputSchema>;

const extractOperationalDataPrompt = ai.definePrompt({
  name: 'extractOperationalDataPrompt',
  input: { schema: AiDataStructuringInputSchema },
  output: { schema: AiDataStructuringOutputSchema },
  prompt: `You are an AI assistant specialized in analyzing factory floor observations. Your task is to extract key operational data from the provided input (which can be a voice note, a photo, or both, along with contextual text) and structure it into a preliminary log entry.

Context provided:
- Equipment ID: {{{equipmentId}}}
- Location: {{{location}}}
- Operator: {{{operatorName}}}
{{#if contextNotes}}- Additional Notes: {{{contextNotes}}}{{/if}}

Observation Input:
{{#if voiceNoteDataUri}}
Voice Note: {{media url=voiceNoteDataUri}}
{{/if}}
{{#if photoDataUri}}
Photo: {{media url=photoDataUri}}
{{/if}}

Based on the above information, extract the following structured data. Pay close attention to details like temperatures, pressures, sounds, visual cues, and operator comments to accurately determine the equipment status, detect any issues, and suggest appropriate actions. Provide a confidence score for your extraction.

If no specific readings are mentioned or visually discernible, omit the 'readings' field.
If no issues are detected, set 'issueDetected' to false and omit 'issueDescription' and 'suggestedAction'.
`
});

const aiDataStructuringFlow = ai.defineFlow(
  {
    name: 'aiDataStructuringFlow',
    inputSchema: AiDataStructuringInputSchema,
    outputSchema: AiDataStructuringOutputSchema,
  },
  async (input) => {
    const { output } = await extractOperationalDataPrompt(input);
    return output!;
  }
);

export async function aiDataStructuring(input: AiDataStructuringInput): Promise<AiDataStructuringOutput> {
  return aiDataStructuringFlow(input);
}
