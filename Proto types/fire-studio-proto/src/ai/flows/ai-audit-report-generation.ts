'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating customizable audit reports.
 *
 * - aiAuditReportGeneration - A function that generates an audit report based on provided data.
 * - AiAuditReportGenerationInput - The input type for the aiAuditReportGeneration function.
 * - AiAuditReportGenerationOutput - The return type for the aiAuditReportGeneration function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiAuditReportGenerationInputSchema = z.object({
  startDate: z.string().describe('The start date for the audit report in YYYY-MM-DD format.'),
  endDate: z.string().describe('The end date for the audit report in YYYY-MM-DD format.'),
  regulationType: z.string().describe('The type of regulation or standard the audit report should adhere to, e.g., "삼성QA", "HACCP".'),
  productionDataSummary: z.string().describe('A concise summary of historical production data relevant to the audit period.'),
  anomalyExplanationsSummary: z.string().describe('A summary of XAI anomaly explanations and insights detected during the audit period.'),
  complianceChecksSummary: z.string().describe('A summary of compliance check results and findings during the audit period.'),
});
export type AiAuditReportGenerationInput = z.infer<typeof AiAuditReportGenerationInputSchema>;

const AiAuditReportGenerationOutputSchema = z.object({
  title: z.string().describe('The title of the generated audit report.'),
  reportContent: z.string().describe('The main content of the audit report, formatted clearly and comprehensively. It should include sections for production overview, anomaly analysis, compliance status, key findings, and recommendations.'),
  summary: z.string().describe('A brief, executive summary highlighting the most important aspects of the report.'),
  flaggedIssues: z.array(z.string()).describe('A list of critical issues or non-conformities identified during the audit.'),
  recommendations: z.array(z.string()).describe('A list of actionable recommendations based on the audit findings.'),
});
export type AiAuditReportGenerationOutput = z.infer<typeof AiAuditReportGenerationOutputSchema>;

export async function aiAuditReportGeneration(input: AiAuditReportGenerationInput): Promise<AiAuditReportGenerationOutput> {
  return aiAuditReportGenerationFlow(input);
}

const auditReportPrompt = ai.definePrompt({
  name: 'auditReportPrompt',
  input: { schema: AiAuditReportGenerationInputSchema },
  output: { schema: AiAuditReportGenerationOutputSchema },
  prompt: `You are an expert AUDITOR for FactoryAI, specializing in manufacturing production and quality control. Your task is to generate a comprehensive audit report based on the provided data for the period from {{startDate}} to {{endDate}}, adhering to the {{regulationType}} regulation.\n\nYour report should intelligently summarize historical production data, XAI anomaly explanations, and compliance checks. The goal is to provide a clear, concise, and actionable report suitable for internal or external review.\n\nUse the following information to construct your report:\n\nHistorical Production Data Summary:\n{{{productionDataSummary}}}\n\nXAI Anomaly Explanations Summary:\n{{{anomalyExplanationsSummary}}}\n\nCompliance Checks Summary:\n{{{complianceChecksSummary}}}\n\nBased on this information, generate an audit report with the following structure:\n1.  **Title**: A clear and descriptive title for the audit report.\n2.  **Summary**: An executive summary outlining the key findings and overall status.\n3.  **Report Content**:\n    *   **1. Production Overview**: Briefly describe the production activities and highlights during the period.\n    *   **2. Anomaly Analysis**: Detail any significant anomalies detected by XAI, their explanations, and their impact.\n    *   **3. Compliance Status**: Assess adherence to the {{regulationType}} regulation, highlighting strengths and weaknesses.\n    *   **4. Key Findings**: List critical observations, non-conformities, or areas requiring attention.\n    *   **5. Recommendations**: Provide specific, actionable recommendations to address findings and improve processes.\n4.  **Flagged Issues**: A list of bullet points for critical issues.\n5.  **Recommendations**: A list of bullet points for key recommendations.\n\nEnsure the report is professional, objective, and focuses on actionable insights. If data is missing or indicates a problem, highlight it appropriately.`,
});

const aiAuditReportGenerationFlow = ai.defineFlow(
  {
    name: 'aiAuditReportGenerationFlow',
    inputSchema: AiAuditReportGenerationInputSchema,
    outputSchema: AiAuditReportGenerationOutputSchema,
  },
  async (input) => {
    const { output } = await auditReportPrompt(input);
    if (!output) {
      throw new Error('Failed to generate audit report.');
    }
    return output;
  }
);
