"use client"

import { useState } from 'react';
import { Minus, Plus } from "lucide-react";

// Use a regular anchor instead of Link
// This avoids the React Router dependency issue
interface FAQ {
  id: number
  question: string
  answer: string  // Changed from React.ReactNode to string
  isOpen?: boolean
}

interface FAQCategoryData {
  [key: string]: FAQ[]
}

export const faqData: FAQCategoryData = {
  General: [
    {
      id: 1,
      question: "How do I create a CVMS account?",
      answer: "Visit <a href=\"#\" className=\"text-[#2a9f47] hover:underline\">cvms.ng/signup</a>, fill out the registration form with accurate details, and verify your email to activate your account.",
      isOpen: true,
    },
    {
      id: 2,
      question: "I forgot my password. How do I reset it?",
      answer: "Click on the \"Forgot Password\" link on the login page. Enter your registered email address, and we'll send you a password reset link. Follow the instructions in the email to create a new password.",
    },
    {
      id: 3,
      question: "Can multiple users share one account?",
      answer: "No, for security and accountability reasons, each user must have their own account. However, organizations can set up multiple accounts with different permission levels under a single organization profile.",
    },
    {
      id: 4,
      question: "What is a VIN and why is it important?",
      answer: "A Vehicle Identification Number (VIN) is a unique 17-character code assigned to every vehicle. It's important because it serves as the vehicle's fingerprint, containing information about the manufacturer, model, year, and other specifications. CVMS uses VINs to verify vehicle authenticity and history.",
    },
    {
      id: 5,
      question: "How do I search a VIN on CVMS?",
      answer: "Log in to your CVMS account, navigate to the \"VIN Check\" section, enter the 17-character VIN in the search field, and click \"Search\". The system will display all available information about the vehicle associated with that VIN.",
    },
    {
      id: 6,
      question: "Why does my VIN search return no results?",
      answer: "This could happen for several reasons: the VIN may be incorrectly entered, the vehicle may not be registered in our database yet, or there might be a system issue. Double-check the VIN, ensure it's 17 characters long, and try again. If the problem persists, contact our support team.",
    },
    {
      id: 7,
      question: "What plans are available on CVMS?",
      answer: "CVMS offers several subscription plans: Basic (free with limited searches), Standard (monthly subscription with more features), and Premium (full access to all features). Enterprise plans are also available for organizations requiring multiple user accounts and advanced reporting.",
    },
  ],
  Account: [
    {
      id: 8,
      question: "How do I update my account information?",
      answer: "Log in to your account, click on your profile icon in the top right corner, select \"Account Settings,\" and update your information in the relevant fields. Don't forget to save your changes."
    },
    {
      id: 9,
      question: "Can I change my username?",
      answer: "No, usernames cannot be changed once an account is created for security and tracking purposes."
    },
  ],
  Payment: [
    {
      id: 10,
      question: "What payment methods are accepted?",
      answer: "CVMS accepts credit/debit cards, bank transfers, and selected mobile payment options. All payments are processed securely through our payment gateway.",
    },
    {
      id: 11,
      question: "How do I get a receipt for my payment?",
      answer: "Receipts are automatically generated and sent to your registered email address after each successful payment. You can also download receipts from the \"Payment History\" section in your account dashboard.",
    },
  ],
  "Certificates & Reports": [
    {
      id: 12,
      question: "How long are verification certificates valid?",
      answer: "Standard verification certificates are valid for 30 days from the date of issue. Premium certificates have extended validity periods of up to 90 days.",
    },
    {
      id: 13,
      question: "Can I download my verification reports?",
      answer: "Yes, all verification reports can be downloaded as PDF files from your account dashboard under \"My Reports.\" Reports remain available for download for up to 12 months.",
    },
  ],
  "Support &Trouble shooting": [
    {
      id: 14,
      question: "How do I contact customer support?",
      answer: "You can reach our customer support team through the \"Contact Us\" page, by email at support@cvms.ng, or by calling our helpline at +234-1234-5678 during business hours (Monday to Friday, 8am to 5pm WAT).",
    },
    {
      id: 15,
      question: "The system is showing an error. What should I do?",
      answer: "First, try refreshing your browser or clearing your cache. If the problem persists, take a screenshot of the error message and contact our support team with details about what you were doing when the error occurred.",
    },
  ],
  Others: [
    {
      id: 16,
      question: "Is my data secure on CVMS?",
      answer: "Yes, CVMS employs industry-standard encryption and security protocols to protect your data. We do not share your personal information with third parties without your consent, except as required by law.",
    },
    {
      id: 17,
      question: "Can I use CVMS on my mobile device?",
      answer: "Yes, CVMS is fully responsive and works on all modern mobile devices. We also offer dedicated mobile apps for Android and iOS for an enhanced mobile experience.",
    },
  ],
}

interface FAQAccordionProps {
  faqs: FAQ[]
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openFaqs, setOpenFaqs] = useState<number[]>(faqs.filter((faq) => faq.isOpen).map((faq) => faq.id))

  const toggleFaq = (id: number) => {
    setOpenFaqs((prev) => (prev.includes(id) ? prev.filter((faqId) => faqId !== id) : [...prev, id]))
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <div key={faq.id} className="border border-[#dcdcdc] rounded-lg p-4">
          <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFaq(faq.id)}>
            <h3 className="font-medium">{faq.question}</h3>
            <button className="bg-[#2a9f47] rounded-full p-1">
              {openFaqs.includes(faq.id) ? (
                <Minus className="h-5 w-5 text-white" />
              ) : (
                <Plus className="h-5 w-5 text-white" />
              )}
            </button>
          </div>
          {openFaqs.includes(faq.id) && (
            <div className="mt-2" dangerouslySetInnerHTML={{ __html: faq.answer }} />
          )}
        </div>
      ))}
    </div>
  )
}