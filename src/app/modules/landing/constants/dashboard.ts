import type { Feature, Transaction } from "../types/dashboard"





export const features: Feature[] = [
  {
    title: "VIN Search",
    description:
      "Decipher any vehicle's history in seconds using their vehicle identification numbers (VIN) and verify its payment duty.",
    icon: "/icons/search.svg",
  },
  {
    title: "Accredify",
    description:
      "Quickly verify accredited agents, terminals, warehouses, and truckers approved by Customs. Work with authorized service providers for your import/export needs.",
    icon:"/icons/accredify.svg",
    
  },
  {
    title: "Status Tracking",
    description: "Stay updated in real-time status alert and track the progress of your goods verifications..",
    icon:"/icons/status.svg",

  },
]

export const sampleTransactions: Transaction[] = [
  {
    id: "1",
    products: "Accredify",
    date: "12-09-2024",
    amount: "$7,500.00",
    status: "completed",
  },
]

