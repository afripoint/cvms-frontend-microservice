import type { Feature, Transaction } from "../types/dashboard"





export const features: Feature[] = [
  {
    title: "VIN Search",
    description:
      "Know your vehicle's history in seconds using their vehicle identification numbers (VIN) and verify its payment duty",
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
    description: "Know exactly where your goods are in the customs process. From port arrival to clearance, get real-time updates.",
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

