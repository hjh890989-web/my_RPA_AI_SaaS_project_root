# **App Name**: FactoryAI

## Core Features:

- Secure Authentication & Role-Based Access Control: User login with email/password and quick demo logins, directing users to role-specific dashboards with appropriate access permissions for ADMIN, OPERATOR, AUDITOR, VIEWER, and CISO roles.
- AI-Powered Field Data Ingestion: Allow operators to collect shop floor data via speech-to-text (STT) and image recognition (Vision) from camera, and also through Excel uploads. An AI tool automatically processes and structures this raw data.
- Human-In-The-Loop (HITL) Review System: Provide a dedicated interface for reviewing AI-processed data. Users can approve, reject, or manually correct log entries, adhering to the 'AI-only execution 0 cases' principle before external publication.
- XAI Anomaly Detection Dashboard: Present an Explainable AI (XAI) dashboard for detecting and explaining production anomalies. An AI tool highlights deviations, suggests root causes, and offers recommended actions for quality assurance.
- Dynamic Performance Dashboard: Display key performance indicators (KPIs) and operational charts for factory activities, dynamically adjusting based on user roles (e.g., COO, Quality Director, CFO views) and real-time data.
- Audit Report Generation Tool: Enable one-click generation of customizable audit reports for regulatory compliance, summarizing historical data and XAI explanations, including a process for handling missing data.
- ERP Integration & Monitoring: Connect and synchronize with external ERP systems, displaying connection status, synchronization history, and warning about schema changes. Includes manual synchronization capability for admins.

## Style Guidelines:

- Color scheme: Dark mode, leveraging a deep navy and slate palette to evoke an industrial, professional B2B SaaS environment. Primary brand elements are a deep blue, while interactive components and highlights use a bright mint for clarity and user feedback. Explicitly defined colors like success, warning, critical, and info are used consistently across the application for status indications.
- Primary color: `#1A365D` (deep navy), chosen for its strong association with industry and technology, providing a robust base that contrasts effectively with brighter functional elements.
- Background color: `#0F172A` (very dark blue-gray), selected to create a deep, immersive dark mode experience, complementing the primary and accent colors while reducing eye strain.
- Accent color: `#4ECDC4` (vibrant mint), used for key interactive elements such as call-to-action buttons, active states, progress indicators, and focus outlines, ensuring high visibility and a sense of progress.
- Body and headline font: 'Pretendard' (sans-serif), for a modern and clean appearance. Body text is 14px for readability, with headers ranging from 20px to 24px for hierarchical distinction. Note: currently only Google Fonts are supported.
- Consistent use of modern, functional icons. Dashboards and navigation leverage simplified symbolic icons, with specific status badges (e.g., '🔴', '🟡', '⚠️', 'ℹ️') and emoji-style representations where applicable, enhancing intuitive understanding. Empty states feature guide icons, and responsive layouts introduce an icon-only sidebar for compact views.
- A responsive, grid-based system is employed throughout the application, adapting seamlessly from large dashboards to mobile hamburger menus. Key layouts include a max-width login card, fixed-width sidebars with expand/collapse functionality, two-pane review/detail views, and centrally floating status bars for critical processes like AI analysis. The UI is designed for efficient data display and interaction in an industrial setting.
- Functional and subtle animations enhance user experience, including smooth transitions for page changes and card hovers. Pulsing keyframe animations highlight active states (e.g., active step in steppers, microphone recording), progress bars show loading states (AI processing, synchronization), and slide-in/out effects are used for notifications and specific component disclosures.