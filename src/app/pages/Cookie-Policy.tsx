"use client"

import { Link } from "react-router-dom"
import MainLayout from "../modules/landing/components/layout/components/MainLayout"
import { ChevronRight, Shield, BarChart3, Settings, Target } from "lucide-react"

export default function CookiePolicy() {
  const cookieTypes = [
    {
      icon: <Shield className="w-5 h-5 text-blue-600" />,
      type: "Necessary or Session Cookies",
      description: "These cookies are essential for you to browse the NCS - CVMS website and use its features, such as accessing secure areas of the site."
    },
    {
      icon: <BarChart3 className="w-5 h-5 text-green-600" />,
      type: "Performance or Analytics Cookies",
      description: "These cookies collect information about how you use the CVMS website, like which pages you visited, and which links you clicked on. None of this information can be used to identify you. It is all aggregated and, therefore, anonymized. Their sole purpose is to improve website functions."
    },
    {
      icon: <Settings className="w-5 h-5 text-purple-600" />,
      type: "Functional Cookies",
      description: "These cookies allow the website to remember choices you have made in the past, like what language you prefer, what region you are in, or what your username and password are, so you can automatically log in."
    },
    {
      icon: <Target className="w-5 h-5 text-orange-600" />,
      type: "Marketing Cookies",
      description: "These cookies track your online activity to help the Company deliver more relevant advertising or to limit how many times you see an ad."
    }
  ];

  const cookieUses = [
    "Provide products and services that you request and to provide a secure online environment.",
    "Manage our marketing relationships.",
    "Improve the performance of our services.",
    "Help us decide which of our products, services and offers may be relevant for your need.",
    "Give you a better online experience and track website performance.",
    "Help us make our website more relevant to you."
  ];

  return (
    <MainLayout>
      {/* Green Header */}
      <div className="bg-[#2a9f47] text-white py-12 text-center">
        <h1 className="text-3xl font-bold mb-2">Cookies Policy</h1>
        <p className="text-sm">Nigeria Customs Services - Customs Verification Management System (NCS-CVMS)</p>
        <p className="text-xs mt-1">Latest Update: 15 May, 2025</p>
      </div>

      <div className="container mx-auto max-w-5xl px-4">
        {/* Main Content */}
        <main className="py-8">
          <div className="mb-6 flex items-center text-sm text-[#667085]">
            <Link to="#" className="hover:underline">
              Resources
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span>Cookies Policy</span>
          </div>

          <div className="prose max-w-none space-y-8">
            {/* Introduction */}
            <section id="introduction">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                When you browse the CVMS website, we use cookies to ensure a seamless user experience 
                across all the functions you access. The contents of this page are meant to explain to 
                you in clear terms what cookies are and how we use them on our site.
              </p>
            </section>

            {/* What are Cookies */}
            <section id="what-are-cookies">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. What are Cookies?</h2>
              <p className="text-gray-700 leading-relaxed">
                A "cookie" is a small text file that is stored on your computer, tablet, or phone when 
                you visit a website. Some cookies are deleted when you close your browser. These are 
                known as session cookies. Others remain on your device until they expire, or you delete 
                them from your cache. These are known as persistent cookies and enable us to remember 
                things about you (such as passwords) as a returning user and/or visitor.
              </p>
            </section>

            {/* Types of Cookies */}
            <section id="types-of-cookies">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Types of Cookies</h2>
              <p className="text-gray-700 mb-6">
                Cookies are used in the following ways on our website:
              </p>
              <div className="space-y-4">
                {cookieTypes.map((cookie, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {cookie.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {cookie.type}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {cookie.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* What We Use Cookies For */}
            <section id="what-we-use-cookies-for">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. What We Use Cookies For</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use cookies to optimize your user experience when you browse our website. If you 
                register a profile with us, we will use cookies to manage the signup process and general 
                administration and manage your browser session while you are logged in. These cookies 
                will usually be deleted when you log out. They may however in some cases remain afterwards 
                to remember your site preferences when you are logged out. Simply put, we use Cookies to:
              </p>
              <div className="bg-[#f6fff8] rounded-lg p-6 border-l-4 border-[#2a9f47]">
                <ul className="space-y-3">
                  {cookieUses.map((use, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#2a9f47] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{use}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Turn Off or Opt-Out */}
            <section id="turn-off-opt-out">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Turn Off or Opt-Out of Cookies</h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  You can manually disable cookies on your computer and devices or delete existing cookies. 
                  Disabling cookies may restrict your browsing experience on CVMS platforms to important 
                  features such as logging in to your profile, navigating webpages etc. CVMS does not 
                  share cookie information with any other website, nor do we sell this data to any third 
                  party without your consent.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  To find out more about cookies, including how to see what cookies have been set and how 
                  to manage and delete them, visit{' '}
                  <a 
                    href="http://www.allaboutcookies.org/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#2a9f47] hover:text-green-700 underline"
                  >
                    All About Cookies
                  </a>.
                </p>
                <p className="text-sm text-gray-600 italic">
                  By clicking and opening the above link you are migrating from CVMS secure site to a 
                  third-party website. We make no representation as to the security features on the site 
                  or the level of security available on the site. It is your responsibility to protect 
                  your device or system through which you access the third party's website. Alternatively, 
                  you can search the internet for other independent information on cookies.
                </p>
              </div>
            </section>

            {/* More Information */}
            <section id="more-information">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. More Information</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Hopefully, this has clarified things for you. As was previously mentioned, if there is 
                something you aren't sure you need, it is usually safer to leave cookies enabled in case 
                it does interact with one of the features you use on our site. Please feel free to contact 
                us if you have any questions.
              </p>
            </section>

            {/* Contact Information */}
            <section id="contact">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you require more information on how we use cookies or have any questions about this policy, 
                please contact us through the following channels:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg space-y-2">
                <div><strong>Email:</strong> <a href="mailto:cvmsproject@afripointgroup.com" className="text-[#2a9f47] hover:text-green-700 underline">cvmsproject@afripointgroup.com</a></div>
                <div><strong>Phone:</strong> <a href="tel:09076603819" className="text-[#2a9f47] hover:text-green-700 underline">09076603819</a></div>
                <div><strong>Address:</strong> National Customs Headquarters, Tafawa Balewa Way, Central Business District, Abuja, Nigeria</div>
              </div>
              <p className="text-gray-700 mt-4">
                We will respond to your inquiry promptly and provide any additional information you may need.
              </p>
            </section>

            {/* Updates to Cookie Policy */}
            <section id="updates">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Updates to this Cookie Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Cookie Policy from time to time to reflect changes in our practices or 
                for other operational, legal, or regulatory reasons. When we make changes, we will update 
                the "Latest Update" date at the top of this policy.
              </p>
              <p className="text-gray-700">
                By continuing to use our website after any changes to this Cookie Policy, you acknowledge 
                that you have read and understood the updated policy.
              </p>
            </section>
          </div>
        </main>
      </div>
    </MainLayout>
  )
}