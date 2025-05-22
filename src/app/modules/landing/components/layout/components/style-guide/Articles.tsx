
import { ChevronRight, Clock} from "lucide-react"
import { Link } from "react-router-dom"
import MainLayout from "../MainLayout"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <MainLayout>

      {/* Hero Section */}
      <section className="bg-[#2a9f47] text-white py-10 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">User Guide</h1>
          <p className="max-w-2xl mx-auto">
            Explore our FAQ section for quick and easy answers
            <br />
            to the most common questions
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-5xl container mx-auto px-4 py-4 flex items-center text-sm text-gray-500">
        <Link to="#" className="hover:text-gray-700">
          Resources
        </Link>
        <ChevronRight className="h-3 w-3 mx-2" />
        <Link to="#" className="hover:text-gray-700">
          User Guide
        </Link>
        <ChevronRight className="h-3 w-3 mx-2" />
        <span className="text-gray-700">How To Customize your CVMS Dashboard</span>
      </div>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto container px-4 py-6 flex-grow">
        <h1 className="text-2xl font-bold mb-3">How to Customize Your CVMS Dashboard</h1>
        <p className="mb-2">
          New to our platform? This comprehensive guide will walk you through the basics and help you set up your
          account for success.
        </p>
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-8">
          <Clock className="h-4 w-4" />
          <span>7 minutes read</span>
        </div>

        {/* Dashboard Screenshot 1 */}
        <div className=" border border-gray-300 rounded-lg overflow-hidden mb-8 shadow-sm">
          
            {/* <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-[#ff3b30]"></div>
              <div className="h-3 w-3 rounded-full bg-[#f8f8f8]"></div>
              <div className="h-3 w-3 rounded-full bg-[#34c759]"></div>
            </div> */}
            <div className="flex-1"></div>
          
          <img
            src="/images/acredifyscreen.svg"
            alt="CVMS Dashboard Screenshot"
            width={800}
            height={400}
            className="w-full"
          />
        </div>

        <div className="text-gray-800 mb-8">
          <p className="mb-4">
            Your CVMS dashboard is built with flexibility and user preferences in mind, allowing every admin to
            personalize the interface to suit their specific responsibilities and daily workflows. Whether you're a
            Super Admin monitoring overall system activity or a Support Admin focusing on escalations, this guide will
            walk you through the steps to tailor your dashboard for optimal efficiency and clarity.
          </p>

          <h2 className="font-bold text-lg mt-6 mb-2">1. Add or Remove Dashboard Cards</h2>
          <p className="mb-3">
            You have the ability to choose which information cards or widgets appear on your dashboard. This ensures
            that you only see what's most relevant to your role and can avoid unnecessary clutter.
          </p>

          <p className="font-medium mb-2">Steps to add or remove dashboard widgets:</p>
          <ol className="list-decimal pl-6 mb-4 space-y-1">
            <li>
              Click on the "Customize Dashboard" button, located at the top-right corner of the dashboard interface.
            </li>
            <li>
              A list of available widgets will appear, such as "Total Platform Searches," "Revenue Summary," "Flagged
              VINs," and "Support Tickets Overview."
            </li>
            <li>
              Use the toggle switch next to each widget to enable (show) or disable (hide) them from your dashboard
              view.
            </li>
            <li>Once you're satisfied with your selection, click on "Save Changes" to apply your customized layout.</li>
          </ol>

          <h2 className="font-bold text-lg mt-6 mb-2">2. Reorder Widget</h2>
          <p className="mb-3">Arrange the information in an order that makes sense for your daily workflow.</p>

          <p className="font-medium mb-2">Steps:</p>
          <ol className="list-decimal pl-6 mb-4 space-y-1">
            <li>Enter Edit Mode via the Customize Dashboard menu.</li>
            <li>Drag and drop each card to your preferred position.</li>
            <li>Click Save Layout.</li>
          </ol>
        </div>

        {/* Dashboard Screenshot 2 */}
        <div className="border border-gray-300 rounded-lg overflow-hidden mb-8 shadow-sm">
          
            {/* <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-[#ff3b30]"></div>
              <div className="h-3 w-3 rounded-full bg-[#f8f8f8]"></div>
              <div className="h-3 w-3 rounded-full bg-[#34c759]"></div>
            </div> */}
            <div className="flex-1"></div>
          
          <img
            src="/images/acredifyscreen.svg"
            alt="CVMS Dashboard Screenshot"
            width={800}
            height={400}
            className="w-full"
          />
        </div>

        <div className="text-gray-800 mb-8">
          <h2 className="font-bold text-lg mt-6 mb-2">2. The Data We Collect About You</h2>
          <p className="mb-4">
            In the course of using the CVMS platform services provided to you by NCS and/or Subsidiaries to meet your
            needs, through this and other channels available, we collect the information you provide us via consent
            forms, phone calls, and correspondence by mail or emails, service point interfaces, and any other channels
            as listed below, which we may make available to you from time to time.
          </p>
          <p className="mb-4">
            We collect a variety of personal data when you interact with our Services. The types of data we collect
            include:
          </p>
        </div>
      </main>

      {/* Footer */}
      </MainLayout>
    </div>
  )
}
