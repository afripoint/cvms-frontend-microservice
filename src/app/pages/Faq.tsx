// "use client"

// import { Link } from "react-router-dom"
// import MainLayout from "../modules/landing/components/layout/components/MainLayout"
// import { useState } from "react"
// import { FAQAccordion, faqData } from "../modules/landing/components/layout/components/faq-accordion"
// import { ChevronRight } from "lucide-react"

// type CategoryTab = "General" | "Account" | "Payment" | "Certificates & Reports" | "Support &Trouble shooting" | "Others"

// export default function Faq() {
//   const [activeTab, setActiveTab] = useState<CategoryTab>("General")


//   return (
//     <MainLayout>
     

//     <div className="bg-[#2a9f47] text-white py-12">
//         <div className="container mx-auto px-4 text-center">
//           <h1 className="text-3xl font-bold mb-2">Frequently Asked Questions</h1>
//           <p className="max-w-2xl mx-auto">
//             Explore our FAQ section for quick and easy answers to the most common questions
//           </p>
//         </div>
//       </div>

//       <div className="container mx-auto max-w-3xl px-4 flex flex-col md:flex-row">
        

        

//         {/* Main Content */}
//         <main className="flex-1 py-8">
          

//           <div className="space-y-8">
//             <section>
//               <h2 className="text-xl font-semibold mb-4">1. About this Privacy Policy</h2>
//               <p className="text-gray-700 mb-4">
//                 The Nigeria Customs Services (NCS), through the Customs Verification Management Systems (CVMS) ("we",
//                 "us", "our"), seeks to collect, use, store, and protect your personal data. This policy applies to
//                 customers, corporations, and individual users of our website, mobile application, and related services
//                 (the "Services"). By using our Services, you consent to the collection and use of your personal data in
//                 accordance with this Privacy Notice and the relevant laws, including the Nigerian Data Protection
//                 Regulation (NDPR) and the Nigerian Data Protection Act (NDPA) 2023.
//               </p>
//             </section>

//             <section>
//               <h2 className="text-xl font-semibold mb-4">2. The Data We Collect About You</h2>
//               <p className="text-gray-700 mb-4">
//                 In the course of using the CVMS platform services provided to you by NCS and/or Subsidiaries to meet
//                 your needs, through this and other channels available, we collect the information you provide us via
//                 consent forms, phone calls, and correspondence by mail or emails, service point interfaces, and any
//                 other channels as listed below, which we may make available to you from time to time.
//               </p>
//               <p className="text-gray-700 mb-4">
//                 We collect a variety of personal data when you interact with our Services. The types of data we collect
//                 include:
//               </p>

//               <h3 className="text-lg font-medium mb-2">2.1 Information You Provide to Us</h3>
//               <ul className="list-disc pl-8 space-y-2 text-gray-700 mb-4">
//                 <li>
//                   <span className="font-medium">Identity Data:</span> Full and/or NIN to show name, gender, date of
//                   birth, and nationality.
//                 </li>
//                 <li>
//                   <span className="font-medium">Contact Data:</span> Email address, phone number, postal address.
//                 </li>
//                 <li>
//                   <span className="font-medium">Account Information:</span> User ID, password, purchase history, and
//                   transaction details.
//                 </li>
//               </ul>

//               <h3 className="text-lg font-medium mb-2">2.2 Information Collected Automatically</h3>
//               <p className="text-gray-700 mb-2">To enhance performance and security, we collect:</p>
//               <ul className="list-disc pl-8 space-y-2 text-gray-700 mb-4">
//                 <li>Search and transaction history (e.g., VIN verifications)</li>
//                 <li>IP address, device type, and browser details</li>
//                 <li>Location data (with permission)</li>
//                 <li>Error logs and crash reports</li>
//                 <li>Clickstream and usage behavior on the platform</li>
//               </ul>
//             </section>

//             <section>
//               <h2 className="text-xl font-semibold mb-4">3. Why We Need Your Personal Data</h2>
//               <p className="text-gray-700 mb-4">
//                 The NCS ensures that the personal data collected and processed is necessary for the purpose of
//                 collection, and the NCS shall not collect or process more data than is reasonably required for a
//                 particular processing activity. In addition, every processing purpose has at least one lawful basis for
//                 processing to safeguard the rights of the data subjects, as provided below:
//               </p>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//                 <div className="bg-[#f6fff8] p-4 rounded-md">
//                   <h3 className="text-[#2a9f47] font-medium mb-2">Purpose Of Processing</h3>
//                 </div>
//                 <div className="bg-[#f6fff8] p-4 rounded-md">
//                   <h3 className="text-[#2a9f47] font-medium mb-2">Lawful Basis of Processing</h3>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 border-t pt-4">
//                 <div>
//                   <h4 className="font-medium mb-2">Provision of Services:</h4>
//                   <p className="text-gray-700">
//                     To fulfill orders, process payments, and deliver products and services.
//                   </p>
//                 </div>
//                 <div>
//                   <h4 className="font-medium mb-2">Performance of a Contract:</h4>
//                   <p className="text-gray-700">
//                     Performance of a Contract: Processing personal data is necessary for the performance of contracts to
//                     which the data subject is a party (e.g., opening and maintaining a profile on the CVMS platform).
//                   </p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 border-t pt-4">
//                 <div>
//                   <h4 className="font-medium mb-2">Provision of Services:</h4>
//                   <p className="text-gray-700">
//                     To fulfill orders, process payments, and deliver products and services.
//                   </p>
//                 </div>
//                 <div>
//                   <h4 className="font-medium mb-2">Performance of a Contract:</h4>
//                   <p className="text-gray-700">
//                     Performance of a Contract: Processing personal data is necessary for the performance of contracts to
//                     which the data subject is a party (e.g., opening and maintaining a profile on the CVMS platform).
//                   </p>
//                 </div>
//               </div>
//             </section>

//             <section>
//               <h2 className="text-xl font-semibold mb-4">1.2 Information Collected Automatically</h2>
//               <p className="text-gray-700 mb-2">To enhance performance and security, we collect:</p>
//               <ul className="list-disc pl-8 space-y-2 text-gray-700 mb-4">
//                 <li>Search and transaction history (e.g., VIN verifications)</li>
//                 <li>IP address, device type, and browser details</li>
//                 <li>Location data (with permission)</li>
//                 <li>Error logs and crash reports</li>
//                 <li>Clickstream and usage behavior on the platform</li>
//               </ul>
//             </section>

//             <section>
//               <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
//               <p className="text-gray-700 mb-4">
//                 We collect both personal and non-personal data to ensure secure, efficient service delivery.
//               </p>

//               <h3 className="text-lg font-medium mb-2">1.1 Information You Provide</h3>
//               <p className="text-gray-700 mb-2">When you use CVMS services, you may provide:</p>
//               <ul className="list-disc pl-8 space-y-2 text-gray-700 mb-4">
//                 <li>Full name</li>
//                 <li>Email address and phone number</li>
//                 <li>Organization or agency name</li>
//                 <li>Payment details (via secure third-party providers)</li>
//                 <li>Uploaded files or documents (e.g., support requests)</li>
//               </ul>

//               <h3 className="text-lg font-medium mb-2">1.2 Information Collected Automatically</h3>
//             </section>
//           </div> 
//           <div className="flex-1">
//           {/* Breadcrumb */}
//           <div className="flex items-center gap-2 text-sm mb-6">
//             <Link to="#" className="text-[#667085]">
//               Resources
//             </Link>
//             <ChevronRight className="h-4 w-4 text-[#667085]" />
//             <span className="text-[#667085]">FAQs</span>
//           </div>

//           {/* Tabs */}
//           <div className="flex flex-wrap gap-2 mb-8">
//             {(
//               [
//                 "General",
//                 "Account",
//                 "Payment",
//                 "Certificates & Reports",
//                 "Support &Trouble shooting",
//                 "Others",
//               ] as CategoryTab[]
//             ).map((tab) => (
//               <button
//                 key={tab}
//                 className={`px-4 py-2 rounded-full ${
//                   activeTab === tab ? "bg-[#2a9f47] text-white font-medium" : "text-[#262626] hover:bg-gray-100"
//                 }`}
//                 onClick={() => setActiveTab(tab)}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>

//           {/* FAQ Accordions */}
//           <FAQAccordion faqs={faqData[activeTab] || []} />
//         </div>
//         </main>
//       </div>
//     </MainLayout>
//   )
// }



"use client"

import { useState } from "react"
import MainLayout from "../modules/landing/components/layout/components/MainLayout"
import { CategoryTab } from "../modules/landing/types/faq"
import { FAQHeader } from "../modules/landing/components/layout/components/FAQHeader"
import { Breadcrumb } from "../modules/landing/components/layout/components/Breadcrumb"
import { CategoryTabs } from "../modules/landing/components/layout/components/CategoryTabs"
import { FAQAccordion } from "../modules/landing/components/layout/components/faq-accordion"
import { faqData } from "../modules/landing/components/layout"

export default function FAQ() {
  const [activeTab, setActiveTab] = useState<CategoryTab>("General")

  const breadcrumbItems = [
    { label: "Resources", href: "#" },
    { label: "FAQs" }
  ]

  const handleTabChange = (tab: CategoryTab) => {
    setActiveTab(tab)
  }

  return (
    <MainLayout>
      <FAQHeader />
      
      <div className="container mx-auto max-w-3xl px-4">
        <main className="flex-1 py-8">
          <div className="flex-1">
            <Breadcrumb items={breadcrumbItems} />
            
            <CategoryTabs 
              activeTab={activeTab} 
              onTabChange={handleTabChange} 
            />
            
            <FAQAccordion faqs={faqData[activeTab] || []} />
          </div>
        </main>
      </div>
    </MainLayout>
  )
}