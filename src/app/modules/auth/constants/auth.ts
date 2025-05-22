import type { CountryCode } from "../types/auth"

export const REGISTRATION_STEPS = [
  { number: 1, title: "Account Type", subtitle: "Select your account type" },
  { number: 2, title: "User Information", subtitle: "Your details here" },
  { number: 3, title: "Account Verification", subtitle: "Verify your account" },
]

export const ACCOUNT_TYPES = [
  {
    id: "individual",
    title: "Individual Account",
    description:
      "Verify vehicle customs duty status through VIN checks, track consignments within customs, and search for accredited agents and customs-affiliated bodies.",
    value: "individual account",
    icon: "/icons/company.png",
  },
  {
    id: "agent",
    title: "Agent Account",
    description:
      "Designed for licensed customs agents. Includes all application features, with added access to verification tools and onboarding as an accredited service provider under Customs.",
    value: "agent account/freight forwarders",
    icon: "/icons/agent.png",
  },
  {
    id: "company",
    title: "Company Account",
    description:
      "Built for businesses managing large-scale imports/exports. Unlocks all platform features — including VIN checks, consignment tracking, agent management, and full operational oversight.",
    value: "company account",
    icon: "/icons/individual.png",
  },
]

export const ACCREDIFY_SERVICES = [
  "Freight Forwarders",
  "Customs Clearing Agents",
  "Shippers",
  "Maritime Truckers",
  "Bonded Ports & Terminals",
  "Bonded Warehouses",
  "Carriers/ Transporters",
]

export const SERVICE_DESCRIPTIONS: Record<string, string> = {
  "Customs Clearing Agents":
    "Licensed professionals who handle customs clearance, ensure regulatory compliance, and facilitate import/export processing",
  "Bonded Warehouses":
    "Secure storage facilities where imported goods are held duty-free and cleared for sale or further processing",
  "Bonded Ports & Terminals":
    "Customs-controlled entry points where goods are temporarily stored and processed before clearance",
  "Freight Forwarders/Clearing Agents":
    "Logistics experts who manage customs documentation, coordinate cargo movement, and help navigate regulations",
  "Carriers/ Transporters":
    "Responsible for transporting goods via road, rail, air or sea, ensuring safe and efficient delivery",
  "Freight Forwarders":
    "Logistics experts who manage customs documentation, coordinate cargo movement, and help navigate regulations",
  "Maritime Truckers": "Specialists in transporting shipping containers to and from ports",
  Shippers: "Companies or individuals who send goods via freight transportation",
}

export const COUNTRY_CODES: CountryCode[] = [
  {
    name: "Nigeria",
    code: "NG",
    dialCode: "+234",
    flag: "/flag.svg",
  },
  {
    name: "United States",
    code: "US",
    dialCode: "+1",
    flag: "/flags/us.svg",
  },
  {
    name: "United Kingdom",
    code: "GB",
    dialCode: "+44",
    flag: "/flags/gb.svg",
  },
  {
    name: "France",
    code: "FR",
    dialCode: "+33",
    flag: "/flags/fr.svg",
  },
]

