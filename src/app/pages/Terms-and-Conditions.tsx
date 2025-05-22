"use client"

import { Link } from "react-router-dom"
import MainLayout from "../modules/landing/components/layout/components/MainLayout"
import { ChevronRight } from "lucide-react"

export default function TermsAndConditions() {
  return (
    <MainLayout>
      {/* Green Header */}
      <div className="bg-[#2a9f47] text-white py-12 text-center">
        <h1 className="text-3xl font-bold mb-2">Terms</h1>
        <p className="text-sm">Latest Update: 15 may, 2025.</p>
      </div>

      <div className="container mx-auto max-w-3xl px-4 flex flex-col md:flex-row">
        {/* Sidebar */}
        {/* <aside className="w-full md:w-64 py-8 pr-8">
          <nav className="space-y-4">
            <div className="border-l-4 border-[#2a9f47] pl-4 font-medium text-[#2a9f47]">Privacy Policy</div>
            <div className="pl-4 text-gray-600 hover:text-[#2a9f47]">
              <Link to="/terms">Terms of Use</Link>
            </div>
            <div className="pl-4 text-gray-600 hover:text-[#2a9f47]">
              <Link to="/faqs">FAQs</Link>
            </div>
            <div className="pl-4 text-gray-600 hover:text-[#2a9f47]">
              <Link to="/guides">User Guides</Link>
            </div>
          </nav>
        </aside> */}

        {/* Main Content */}
        <main className="flex-1  py-8">
          <div className="mb-6 flex items-center text-sm text-[#667085]">
            <Link to="#" className="hover:underline">
              Resources
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span>Terms of use</span>
          </div>

          <div className="prose max-w-none">
            <p>
              Welcome to the Central Vehicle Management System (CVMS). By accessing or using our services, you agree to
              comply with the terms and conditions outlined below. Please read them carefully.
            </p>

            <h2 className="text-xl font-bold mt-6">1. Acceptance of Terms</h2>
            <p>We collect both personal and non-personal data to ensure secure, efficient service delivery.</p>

            <h3 className="text-lg font-medium mt-4">1.1 Agreement</h3>
            <p>By registering for, accessing, or using CVMS, you agree to these Terms of Use and our Privacy Policy.</p>

            <h3 className="text-lg font-medium mt-4">1.2 Eligibility</h3>
            <p>
              You must be at least 18 years old and legally authorized to use the platform on behalf of yourself or your
              organization.
            </p>

            <h2 className="text-xl font-bold mt-6">2. Use of the Platform</h2>
            <p>We collect both personal and non-personal data to ensure secure, efficient service delivery.</p>

            <h3 className="text-lg font-medium mt-4">2.1 Permitted Use</h3>
            <p>You may use CVMS to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Verify Vehicle Identification Numbers (VINs)</li>
              <li>Generate official vehicle reports or certificates</li>
              <li>Submit support tickets and access user guides</li>
              <li>Manage subscriptions and payment plans</li>
              <li>Perform administrative tasks (if authorized)</li>
            </ul>

            <h3 className="text-lg font-medium mt-4">2.2 Prohibited Activities</h3>
            <p>You may not:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Use CVMS for unlawful or fraudulent purposes</li>
              <li>Attempt to gain unauthorized access to the platform or its data</li>
              <li>Interfere with the platform's operation or security</li>
              <li>Upload malicious code, spam, or harmful content</li>
              <li>Use automated scripts without written permission</li>
            </ul>

            <h2 className="text-xl font-bold mt-6">3. User Accounts</h2>

            <h3 className="text-lg font-medium mt-4">3.1 Account Responsibility</h3>
            <p>
              You are responsible for maintaining the confidentiality of your login credentials. CVMS is not liable for
              unauthorized account use due to negligence.
            </p>

            <h3 className="text-lg font-medium mt-4">3.2 Admin Roles</h3>
            <p>
              Admin privileges (e.g., Plan Manager, Super Admin) come with additional responsibilities and may be
              monitored for audit purposes.
            </p>
          </div>
        </main>
      </div>
    </MainLayout>
  )
}
