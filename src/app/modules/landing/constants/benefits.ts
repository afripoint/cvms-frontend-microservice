import type { Benefit, WorkflowStep } from "../types/benefits"

export const benefits: Benefit[] = [
  { text: "24/7 Customer support" },
  { text: "Accurate & reliable verification" },
  { text: "Comprehensive vehicle information" },
  { text: "Secure data management" },
  { text: "Time-efficient processing" },
  { text: "Seamless integration" },
  { text: "Cost-effective solutions" },
]

export const workflowSteps: WorkflowStep[] = [
  {
    id: 1,
    title: "Create Account",
    description:
      "You create an account by either signing up as an individual, company or as an agent to start using the application.",
    icon: "user-check",
  },
  {
    id: 2,
    title: "Search for VINs, Report & more",
    description:
      "Start using the CVMS app to look up VINs, Accredify, status tracking, and records for any of your vehicles.",
    icon: "magnifying-glass",
  },
  {
    id: 3,
    title: "Make Payment",
    description:
      "After looking up your VIN, you then proceed to making payment to download your report.",
    icon: "credit-card",
  },
  {
    id: 4,
    title: "Download Report",
    description:
      "Access your vehicle's information, check your Customs duty payment status and save to device!",
    icon: "file-arrow-down",
  },
]

