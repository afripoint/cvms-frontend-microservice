"use client"

import { Link } from "react-router-dom"
import MainLayout from "../modules/landing/components/layout/components/MainLayout"
import { ChevronRight } from "lucide-react"

export default function TermsAndConditions() {
  return (
    <MainLayout>
      {/* Green Header */}
      <div className="bg-[#2a9f47] text-white py-12 text-center">
        <h1 className="text-3xl font-bold mb-2">Terms and Conditions of Use</h1>
        <p className="text-sm">Customs Verification Management System (CVMS)</p>
        <p className="text-xs mt-1">Latest Update: 15 May, 2025</p>
      </div>

      <div className="container mx-auto max-w-6xl px-4 flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 py-8 pr-8">
          <nav className="space-y-3">
            <div className="text-sm font-semibold text-gray-700 mb-4">Table of Contents</div>
            <div className="space-y-2 text-sm">
              <a href="#introduction" className="block pl-4 text-gray-600 hover:text-[#2a9f47] hover:underline">1. Introduction</a>
              <a href="#definitions" className="block pl-4 text-gray-600 hover:text-[#2a9f47] hover:underline">2. Definitions</a>
              <a href="#eligibility" className="block pl-4 text-gray-600 hover:text-[#2a9f47] hover:underline">3. User Eligibility</a>
              <a href="#registration" className="block pl-4 text-gray-600 hover:text-[#2a9f47] hover:underline">4. Account Registration</a>
              <a href="#verification" className="block pl-4 text-gray-600 hover:text-[#2a9f47] hover:underline">5. Vehicle Verification</a>
              <a href="#data" className="block pl-4 text-gray-600 hover:text-[#2a9f47] hover:underline">6. Data Collection & Use</a>
              <a href="#conduct" className="block pl-4 text-gray-600 hover:text-[#2a9f47] hover:underline">7. User Conduct</a>
              <a href="#ip" className="block pl-4 text-gray-600 hover:text-[#2a9f47] hover:underline">8. Intellectual Property</a>
              <a href="#liability" className="block pl-4 text-gray-600 hover:text-[#2a9f47] hover:underline">9. Disclaimers & Liability</a>
              <a href="#indemnification" className="block pl-4 text-gray-600 hover:text-[#2a9f47] hover:underline">10. Indemnification</a>
              <a href="#modifications" className="block pl-4 text-gray-600 hover:text-[#2a9f47] hover:underline">11. Modification of Terms</a>
              <a href="#governing" className="block pl-4 text-gray-600 hover:text-[#2a9f47] hover:underline">12. Governing Law</a>
              <a href="#contact" className="block pl-4 text-gray-600 hover:text-[#2a9f47] hover:underline">13. Contact Information</a>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 py-8">
          <div className="mb-6 flex items-center text-sm text-[#667085]">
            <Link to="#" className="hover:underline">
              Resources
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span>Terms and Conditions</span>
          </div>

          <div className="prose max-w-none space-y-8">
            {/* Introduction */}
            <section id="introduction">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms of Use ("Terms") govern your access to and use of the Customs Verification Management System 
                ("CVMS" or "System"), operated by the Nigerian Customs Service ("we," "us," "our"). The CVMS provides 
                authorized personnel and registered users with a platform to verify vehicles, manage associated data, and 
                facilitate secure, efficient customs processes. By accessing or using the CVMS, you ("User," "you," "your") 
                agree to these Terms in full. If you do not agree with any part of these Terms, you must immediately 
                discontinue use of the System.
              </p>
            </section>

            {/* Definitions */}
            <section id="definitions">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Definitions</h2>
              <div className="space-y-3">
                <div>
                  <strong className="text-gray-900">CVMS:</strong>
                  <span className="text-gray-700"> The online and mobile-enabled Customs Vehicle Verification Management System.</span>
                </div>
                <div>
                  <strong className="text-gray-900">Authorized Personnel:</strong>
                  <span className="text-gray-700"> Employees, Personnel, Affiliates or Partners, and Agents of the Nigerian Customs Service granted access credentials.</span>
                </div>
                <div>
                  <strong className="text-gray-900">Registered User:</strong>
                  <span className="text-gray-700"> Any third-party (e.g., companies, clearing agents, importers, exporters) who has created a valid account.</span>
                </div>
                <div>
                  <strong className="text-gray-900">Vehicle Data:</strong>
                  <span className="text-gray-700"> Information collected about a vehicle includes, vehicle Identification, Number (VIN) details, registration details, ownership, and verification status.</span>
                </div>
              </div>
            </section>

            {/* User Eligibility */}
            <section id="eligibility">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Eligibility</h2>
              <p className="text-gray-700 mb-3">By using CVMS, you represent and warrant that:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>You are a duly authorized Personnel, Partner, or Agent of the Nigerian Customs Service or a Registered User with the legal capacity to enter these Terms.</li>
                <li>You are at least 18 years old and compliant with all applicable Nigerian laws governing data access and customs operations.</li>
              </ul>
            </section>

            {/* Account Registration */}
            <section id="registration">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Account Registration and Access</h2>
              
              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">4.1 Registration</h3>
              <p className="text-gray-700">
                To become a Registered User, you must complete the online registration form, providing accurate 
                corporate/business or personal details, and any required licensing information.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">4.2 Credentials</h3>
              <p className="text-gray-700">
                You will receive secure login credentials. You are responsible for maintaining their confidentiality 
                and for all activities under your account.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">4.3 Suspension or Termination</h3>
              <p className="text-gray-700">
                We reserve the right to suspend or terminate your access if we determine, at our sole discretion, 
                that you have violated these Terms or any applicable laws.
              </p>
            </section>

            {/* Vehicle Verification */}
            <section id="verification">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Vehicle Verification Process</h2>
              
              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">5.1 Data Submission</h3>
              <p className="text-gray-700">
                Users may initiate verification by submitting a vehicle's registration number, chassis number, 
                and other required identifiers through the System.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">5.2 Automated Checks</h3>
              <p className="text-gray-700">
                CVMS performs real-time cross-checks against national databases (e.g., police records, insurance registries) 
                to validate authenticity and detect irregularities.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">5.3 Results & Notifications</h3>
              <p className="text-gray-700">
                Verification outcomes ("Found, Not Found, Cleared") are displayed within the System. Users receive 
                in-system alerts and, optionally, email or SMS notifications.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">5.4 Dispute Resolution</h3>
              <p className="text-gray-700">
                If you believe a verification result is incorrect, you may lodge a formal dispute through the System. 
                We will investigate in accordance with Nigerian Customs Service protocols and communicate our determination 
                within five (5) business days.
              </p>
            </section>

            {/* Data Collection */}
            <section id="data">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Collection, Use & Retention</h2>
              
              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">6.1 Purpose Limitation</h3>
              <p className="text-gray-700">
                We collect Vehicle Data solely for customs verification, risk assessment, revenue collection, 
                and compliance monitoring.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">6.2 Confidentiality & Security</h3>
              <p className="text-gray-700">
                All data is encrypted in transit and at rest. Access controls, audit trails, and regular security 
                assessments safeguard against unauthorized access, alteration, or disclosure.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">6.3 Retention Period</h3>
              <p className="text-gray-700">
                Vehicle Data and associated logs are retained for a minimum of six (6) years, or as required by 
                Nigerian Customs Service (NCS) regulations or any other policies, declarations, or regulations in 
                relation to (financial) reporting and/or auditing, after which they are securely purged.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">6.4 Data Sharing</h3>
              <p className="text-gray-700">
                We may share aggregated, non-personally identifiable statistics with Partner agencies; any sharing 
                of personally identifiable or sensitive data shall occur only under lawful processes (e.g., subpoena, 
                mutual legal assistance treaty).
              </p>
            </section>

            {/* User Conduct */}
            <section id="conduct">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. User Conduct & Responsibilities</h2>
              <p className="text-gray-700 mb-3">You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Use CVMS for any unlawful purpose or in violation of Nigerian Customs Service policies, and all other relevant regulations.</li>
                <li>Attempt to circumvent or compromise System security, including but not limited to introducing malware or performing unauthorized scans.</li>
                <li>Share your login credentials or permit third parties to access CVMS under your account.</li>
                <li>Engage in any activity that disrupts System performance or interferes with other users' access.</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section id="ip">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Intellectual Property</h2>
              
              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">8.1 IP Ownership</h3>
              <p className="text-gray-700">
                All software, databases, documentation, and content within CVMS are the exclusive property of 
                the Nigerian Customs Service or its licensors.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">8.2 IP License</h3>
              <p className="text-gray-700">
                Upon registration on the CVMS portal, We grant you a limited, revocable, non-exclusive license 
                to use CVMS in compliance with these Terms. You may not copy, reproduce, distribute, or create 
                derivative works.
              </p>
            </section>

            {/* Disclaimers & Liability */}
            <section id="liability">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Disclaimers & Limitations of Liability</h2>
              
              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">9.1 As-Is Service</h3>
              <p className="text-gray-700">
                CVMS is provided "as is" and "as available." We do not warrant uninterrupted access, error-free 
                performance, or complete accuracy of verification results.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">9.2 Limitation of Liability</h3>
              <p className="text-gray-700">
                To the fullest extent permitted by law, we and our officers, employees, or agents will not be 
                liable for indirect, incidental, special, or consequential damages arising from your use of CVMS.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">9.3 Force Majeure</h3>
              <p className="text-gray-700">
                We are not liable for delays or failures due to events beyond our reasonable control, including 
                natural disasters, government actions, or cyber-attacks.
              </p>
            </section>

            {/* Indemnification */}
            <section id="indemnification">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Indemnification</h2>
              <p className="text-gray-700">
                You agree to indemnify, defend, and hold harmless the Nigerian Customs Service, its officers, agents, 
                and employees from any claims, losses, liabilities, damages, or expenses (including legal fees) arising 
                out of your misuse of CVMS, breach of these Terms, or violation of applicable laws.
              </p>
            </section>

            {/* Modification of Terms */}
            <section id="modifications">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Modification of Terms</h2>
              <p className="text-gray-700">
                We may revise these Terms at any time. Updated Terms take effect immediately upon posting to the CVMS portal. 
                It is your responsibility to review the Terms regularly. Continued use after changes constitutes acceptance.
              </p>
            </section>

            {/* Governing Law */}
            <section id="governing">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law & Dispute Resolution</h2>
              <p className="text-gray-700 mb-4">
                The provisions of these Terms are governed by the laws of the Federal Republic of Nigeria.
              </p>
              <p className="text-gray-700">
                Any dispute arising under these Terms shall first be addressed through internal review by the Nigerian 
                Customs Service. If unresolved, parties may submit to the Lagos State Multi-Door Courthouse for mediation 
                in accordance with the Arbitration and Mediation Act (AMA) 2023. You waive any right to class-action or 
                collective lawsuits.
              </p>
            </section>

            {/* Contact Information */}
            <section id="contact">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                For questions, support, or to report security incidents, please contact:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg space-y-2">
                <div><strong>Email:</strong> cvmsproject@afripointgroup.com</div>
                <div><strong>Phone:</strong> 09076603819</div>
                <div><strong>Address:</strong> National Customs Headquarters, Tafawa Balewa Way, Central Business District, Abuja, Nigeria</div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </MainLayout>
  )
}