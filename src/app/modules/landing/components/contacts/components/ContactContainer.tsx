"use client"
import type React from "react"
import ContactMethodCard from "./ContactMethodCard"

import FormInput from "./FormInput"
import PhoneInput from "./PhoneInput"
import { contactMethods } from "../../../constants/contact"
import { useContactForm } from "../../../hooks/useContactForm"
import { MailIcon, PhoneIcon } from "../../../../shared/components/icons/icons"
import { Link } from "react-router-dom"

const ContactContainer: React.FC = () => {
  const {
    formValues,
    errors,
    agreed,
    isSubmitting,
    submitSuccess,
    submitMessage,
    setAgreed,
    handleInputChange,
    handleSubmit,
    setSubmitSuccess,
  } = useContactForm()

  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case "mail":
        return <MailIcon/>
      case "phone":
        return <PhoneIcon/>
      default:
        return null
    }
  }

  return (
    <main className="flex justify-around gap-6 p-6 py-10 mx-auto my-0 bg-[#F2F2F7] w-full max-md:flex-col max-md:p-4 max-sm:p-3 pb-16">
      <section className="flex flex-col gap-10 w-[320px] max-md:w-full">
        <header className="flex flex-col gap-1">
          <p className="text-sm tracking-normal leading-5 text-green-500">Contact us</p>
          <h1 className="text-3xl font-medium tracking-tight text-black max-sm:text-2xl">Chat with the team</h1>
        </header>

        <div className="flex flex-col gap-2 max-sm:gap-3">
          {contactMethods.map((method, index) => (
            <ContactMethodCard
              key={index}
              icon={renderIcon(method.iconType)}
              title={method.title}
              detail={method.detail}
            />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-5 p-6 bg-white rounded-2xl border-black border-solid border-[2px] w-[550px] max-md:w-full max-sm:gap-3 max-sm:p-4">
        {submitSuccess === true ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-green-100">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-center mb-2">Thank You!</h2>
            <p className="text-center text-gray-600 mb-4">{submitMessage}</p>
            <button
              onClick={() => setSubmitSuccess(null)}
              className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form className="flex flex-col gap-5 max-sm:gap-3" onSubmit={handleSubmit}>
            {submitSuccess === false && submitMessage && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-lg mb-2">
                <p className="text-sm text-red-600">{submitMessage}</p>
              </div>
            )}

            <div className="flex gap-4 w-full max-sm:flex-col max-sm:gap-3">
              <FormInput
                label="First Name"
                placeholder="John"
                required
                value={formValues.firstName}
                onChange={(value) => handleInputChange("firstName", value)}
                error={errors.firstName}
              />
              <FormInput
                label="Last Name"
                placeholder="Doe"
                required
                value={formValues.lastName}
                onChange={(value) => handleInputChange("lastName", value)}
                error={errors.lastName}
              />
            </div>

            <div className="flex gap-4 w-full max-sm:flex-col max-sm:gap-3">
              <FormInput
                label="Email"
                type="email"
                placeholder="john@example.com"
                required
                value={formValues.email}
                onChange={(value) => handleInputChange("email", value)}
                error={errors.email}
              />
              <PhoneInput
                value={formValues.phoneNumber}
                onChange={(value) => handleInputChange("phoneNumber", value)}
                error={errors.phoneNumber}
              />
            </div>

            <FormInput
              label="Company Name"
              placeholder="Enter company name"
              optional
              value={formValues.companyName}
              onChange={(value) => handleInputChange("companyName", value)}
            />

            <div className="flex flex-col flex-1 gap-1">
              <label className="flex gap-px items-center text-xs font-medium leading-5 text-slate-800">
                <span>Message</span>
                <span className="text-xs font-medium text-red-500" aria-hidden="true">
                  *
                </span>
              </label>
              <div
                className={`flex items-center px-3 py-2 bg-white rounded-lg border ${errors.message ? "border-red-500" : "border-gray-300"} border-solid shadow-sm`}
              >
                <textarea
                  placeholder="Enter your message here"
                  className="w-full text-xs leading-5 text-gray-600 resize-none border-[none] h-[100px] focus:outline-none"
                  aria-label="Message"
                  value={formValues.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                />
              </div>
              {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
            </div>

            <label className="flex gap-2 items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <div
                className={`flex items-center justify-center w-5 h-5 border ${!agreed && submitSuccess === false ? "border-red-500" : "border-gray-300"} rounded`}
                aria-hidden="true"
              >
                {agreed && (
                  <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <span className="text-xs tracking-normal leading-5 text-black">
                You agree to our{" "}
                <Link to="/" className="text-green-700 underline">
                  Privacy Policy
                </Link>
              </span>
            </label>

            <button
              type="submit"
              className="px-6 py-3 text-sm font-semibold leading-5 text-white bg-green-500 rounded-lg cursor-pointer border-[none] h-[45px] hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit Message"
              )}
            </button>
          </form>
        )}
      </section>
    </main>
  )
}

export default ContactContainer

