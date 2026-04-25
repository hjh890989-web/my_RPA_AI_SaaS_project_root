'use server';
/**
 * @fileOverview A Genkit flow for providing AI-powered explanations of detected anomalies in a factory setting.
 *
 * - explainAnomaly - A function that generates an explanation, potential root causes, and suggested corrective actions for a given anomaly.
 * - AnomalyExplanationInput - The input type for the explainAnomaly function.
 * - AnomalyExplanationOutput - The return type for the explainAnomaly function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const DetectedDataItemSchema = z.object({
  item: z.string().describe('The parameter or item being monitored (e.g., "온도", "압력").'),
  detected: z.string().describe('The value detected for the item (e.g., "182.3°C", "4.5bar").'),
  threshold: z.string().describe('The threshold or normal value for the item (e.g., "180°C", "4.0bar").'),
  deviation: z.string().describe('The deviation from the threshold (e.g., "+2.3", "-0.5").'),
});

const AnomalyExplanationInputSchema = z.object({
  anomalyDescription: z.string().describe('A natural language description of the anomaly, e.g., "CNC-3 온도이상".'),
  detectedData: z.array(DetectedDataItemSchema).describe('Detailed data points highlighting the anomaly with detected, threshold, and deviation values.').optional(),
  context: z.string().describe('Additional context about the anomaly, such as the machine, line, or specific conditions.').optional(),
});
export type AnomalyExplanationInput = z.infer<typeof AnomalyExplanationInputSchema>;

const AnomalyExplanationOutputSchema = z.object({
  explanation: z.string().describe('A clear and concise explanation of the anomaly.'),
  rootCauses: z.array(z.string()).describe('A list of potential root causes for the anomaly.'),
  recommendedActions: z.array(z.string()).describe('A list of suggested corrective actions to address the anomaly.'),
});
export type AnomalyExplanationOutput = z.infer<typeof AnomalyExplanationOutputSchema>;

export async function explainAnomaly(input: AnomalyExplanationInput): Promise<AnomalyExplanationOutput> {
  return anomalyExplanationFlow(input);
}

const anomalyExplanationPrompt = ai.definePrompt({
  name: 'anomalyExplanationPrompt',
  input: { schema: AnomalyExplanationInputSchema },
  output: { schema: AnomalyExplanationOutputSchema },
  prompt: `You are an expert in industrial anomaly detection and explanation for manufacturing plants.
An anomaly has been detected. Your task is to provide a clear, concise explanation of the anomaly, its potential root causes, and suggested corrective actions.

Anomaly Summary: {{{anomalyDescription}}}

{{#if detectedData}}
Detailed Anomaly Data:
{{#each detectedData}}
- Item: {{{item}}}
  Detected: {{{detected}}}
  Threshold: {{{threshold}}}
  Deviation: {{{deviation}}}
{{/each}}
{{/if}}

{{#if context}}
Additional Context: {{{context}}}
{{/if}}

Based on the provided information, please output:
1.  A concise explanation of the anomaly.
2.  A list of potential root causes for this anomaly.
3.  A list of suggested corrective actions.`,
});

const anomalyExplanationFlow = ai.defineFlow(
  {
    name: 'anomalyExplanationFlow',
    inputSchema: AnomalyExplanationInputSchema,
    outputSchema: AnomalyExplanationOutputSchema,
  },
  async (input) => {
    const { output } = await anomalyExplanationPrompt(input);
    return output!;
  }
);