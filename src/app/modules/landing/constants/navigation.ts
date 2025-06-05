import type { NavigationItem } from "../types"

export const navigationItems: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "VIN Check", href: "vin" },
   { label: "Status Tracker", href: "/status-tracker" },
  { label: "Accredify", href: "/accredify" },
  // { label: "Supply Chain", href: "#" },
  { label: "How it Works", href: "#how-it-works" },
]

export const footerNavSections = {
  hotlines: {
    title: "Hotlines",
    links: [
      { text: "+2349076603819", href: "#" },
      { text: "+2349029817913", href: "#" },
      
    ],
  },
  supportAdresses: {
    title: "Support Addresses",
    links: [
      { text: "cvmsproject@afripointgroup.com", href: "#" },
      { text: "support@afripointgroup.com", href: "#" },
      { text: "payments@afripointgroup.com", href: "#" },

      
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { text: "Terms of Use", href: "/terms-of-use" },
      { text: "Privacy Policy", href: "/privacy-policy" },
      { text: "CVMS User Guides", href: "/user-guide" },
      { text: "CVMS Cookie Policy", href: "/cookie-policy" },
      { text: "FAQs", href: "/faq" },
    ],
  },
  
}

export const socialLinks = [
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/5ffb1dcbb5c64e47676f4eed1898be2f42d5f9053a442301ab7307c934f9c18e?placeholderIfAbsent=true&apiKey=fc2525aed0dd41cca84f4f0ce35f4505",
    alt: "Social Media Link 1",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/6ae5b834db9d5b756c716dfd3272b2fce39bff5435417d66b3b7f69115330167?placeholderIfAbsent=true&apiKey=fc2525aed0dd41cca84f4f0ce35f4505",
    alt: "Social Media Link 2",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/1af1ca6c8f7eb4a78f422d1a5e26b427c444095660268832180788c8e7ccc901?placeholderIfAbsent=true&apiKey=fc2525aed0dd41cca84f4f0ce35f4505",
    alt: "Social Media Link 3",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/345d3edeec0bde62915027cede578fcb0d37c19460025c7d8fcfd57aafb69b29?placeholderIfAbsent=true&apiKey=fc2525aed0dd41cca84f4f0ce35f4505",
    alt: "Social Media Link 4",
  },
]

