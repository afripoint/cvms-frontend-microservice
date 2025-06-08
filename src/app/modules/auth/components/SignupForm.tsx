"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../core/store";
import StepIndicator from "./StepIndicator";
import CountryCodeSelector from "../../shared/components/ui/CountryCode";
import OTPDeliveryModal from "./OTPDeliveryModal";
import { RegistrationData, SignUpFormData } from "../types/auth";
import { COUNTRY_CODES } from "../constants/auth";
import { useFormValidation } from "../hooks/useFormValidation";
import { registerUser } from "../redux/slices/authSlice";
import { setCurrentStep } from "../redux/slices/uiSlice";
import { County, useStatesAndCounties } from '../hooks/useStatesAndLGAs';

const SignUpForm: React.FC = () => {
  const { role, is_accredify, selectedServices } = useSelector(
    (state: RootState) => state.auth
  );
  const [registrationError, setRegistrationError] = useState<string | null>(
    null
  );
  const { currentStep } = useSelector((state: RootState) => state.ui);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { 
    states, 
    loading: locationDataLoading, 
    error: locationDataError,
    getStateUuidByName,
    fetchCountiesForState
  } = useStatesAndCounties();

  // Using the mock data through the hook
  const [filteredCounties, setFilteredCounties] = useState<County[]>([]);
  const [selectedStateUuid, setSelectedStateUuid] = useState<string | null>(null);
  const [countyLoading, setCountyLoading] = useState(false);

  const [formData, setFormData] = useState<SignUpFormData>({
    first_Name: "",
    last_Name: "",
    other_name: "",
    phone_number: "",
    email: "",
    agency_Name: "",
    company_Name: "",
    declarant_Code: "",
    cac: "",
    address: "",
    state: "",
    local_govt: "",
    password: "",
    confirm_Password: "",
    message_choice: "email",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);

  // Update filtered counties when state changes
  useEffect(() => {
    const handleStateChange = async () => {
      if (formData.state) {
        const stateUuid = getStateUuidByName(formData.state);
        if (stateUuid) {
          setSelectedStateUuid(stateUuid);
          
          // Fetch counties for the selected state
          setCountyLoading(true);
          try {
            const stateCounties = await fetchCountiesForState(stateUuid);
            setFilteredCounties(stateCounties);
          } catch (error) {
            console.error("Failed to fetch counties:", error);
          } finally {
            setCountyLoading(false);
          }
        } else {
          setSelectedStateUuid(null);
          setFilteredCounties([]);
        }
      } else {
        setSelectedStateUuid(null);
        setFilteredCounties([]);
      }
    };
  
    handleStateChange();
  }, [formData.state, getStateUuidByName, fetchCountiesForState]);

  const shouldShowField = (fieldName: string) => {
    if (
      fieldName === "firstName" ||
      fieldName === "lastName" ||
      fieldName === "phone" ||
      fieldName === "email" ||
      fieldName === "password" ||
      fieldName === "confirmPassword"
    ) {
      return true;
    }

    if (fieldName === "address") {
      return true;
    }

    if (fieldName === "state" || fieldName === "lga") {
      return is_accredify === true;
    }

    if (fieldName === "agencyName") {
      return role === "agent account/freight forwarders"; // Only show for agent role
    }

    if (fieldName === "companyName" || fieldName === "businessName") {
      return role === "company account"; // Only show for company role
    }
    
    if (fieldName === "businessRegNo"){
      return role === "company account";
    }

    if (fieldName === "declarantCode") {
      return (
        role === "agent account/freight forwarders"
      ); // Show for both agent and company
    }

    return false;
  };

  const { isFormValid, passwordError, emailError } = useFormValidation(
    formData,
    shouldShowField
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    // If changing the state field, also reset the local_govt field
    if (name === "state") {
      setFormData((prev) => ({ 
        ...prev, 
        [name]: value,
        local_govt: ""  // Reset local_govt when state changes
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNextClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      setShowOTPModal(true);
    }
  };

  const handleSubmit = async (message_choice: "email" | "sms") => {
    if (message_choice === "sms" && !formData.phone_number) {
      alert("Please provide a phone number for OTP delivery.");
      return;
    }

    setRegistrationError(null);

    const formattedPhoneNumber = formData.phone_number
      ? `${selectedCountry.dialCode}${formData.phone_number
          .trim()
          .replace(/^\s*0+/, "")}`
      : undefined;

    // Ensure role is a string (not null)
    const userRole = role || "individual account";

    const registrationData: RegistrationData = {
      first_name: formData.first_Name,
      last_name: formData.last_Name,
      other_name: formData.other_name || undefined,
      email: formData.email,
      phone_number: formattedPhoneNumber,
      password: formData.password,
      confirm_password: formData.confirm_Password,
      role: userRole,
      agency_name: formData.agency_Name || undefined,
      company_name: formData.company_Name || undefined,
      declarant_code: formData.declarant_Code || undefined,
      cac: formData.cac || undefined,
      address: formData.address || undefined,
      state: formData.state || undefined,
      local_govt: formData.local_govt || undefined,
      is_accredify: is_accredify,
      accredify_services: is_accredify ? selectedServices : undefined,
      message_choice: message_choice,
    };

    try {
      const resultAction = await dispatch(registerUser(registrationData));
      if (registerUser.fulfilled.match(resultAction)) {
        // Store the email and phone number in localStorage
        localStorage.setItem("userEmail", formData.email);

        // Only store phone number if it exists
        if (formattedPhoneNumber) {
          localStorage.setItem("userPhoneNumber", formattedPhoneNumber);
        }

        // Store the OTP delivery method
        localStorage.setItem("otpDeliveryMethod", message_choice);

        setShowOTPModal(false);
        dispatch(setCurrentStep(3)); // Update the current step in UI state
        navigate("/verify-otp");
      } else if (registerUser.rejected.match(resultAction)) {
        console.error("Registration failed:", resultAction);

        // The payload should now be a properly formatted string message
        setRegistrationError(resultAction.payload as string);
      }
    } catch (err) {
      console.error("Unexpected error during registration:", err);
      setRegistrationError("An unexpected error occurred. Please try again.");
    }
  };

  const handleGoBack = () => {
    dispatch(setCurrentStep(1)); // Update the current step in UI state
    navigate("/account-type");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl transform scale-90">
        <StepIndicator currentStep={currentStep} />

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-center mb-3">
            <div className="h-12 w-12 flex items-center justify-center">
              <img src="/images/logo.png" alt="Logo" className="h-8" />
            </div>
          </div>

          <h2 className="text-lg font-semibold text-center mb-1">Sign up</h2>
          <p className="text-gray-500 text-center text-sm mb-4">
            Enter your details below to create your account and get started.
          </p>

          {locationDataError && (
            <div className="mb-4 p-3 bg-red-50 text-red-500 text-sm rounded border border-red-100">
              <strong>Error:</strong> {locationDataError}
              <div className="mt-1">Please try refreshing the page or contact support if the issue persists.</div>
            </div>
          )}

          <form onSubmit={handleNextClick}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              {shouldShowField("firstName") && (
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    First Name*
                  </label>
                  <input
                    type="text"
                    name="first_Name"
                    value={formData.first_Name}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 border rounded-md text-sm"
                    placeholder="John"
                    required
                  />
                </div>
              )}

              {shouldShowField("lastName") && (
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Last Name*
                  </label>
                  <input
                    type="text"
                    name="last_Name"
                    value={formData.last_Name}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 border rounded-md text-sm"
                    placeholder="Doe"
                    required
                  />
                </div>
              )}

              {shouldShowField("phone") && (
                <div className="">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="flex">
                    <CountryCodeSelector onChange={setSelectedCountry} />
                    <input
                      type="tel"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      className="flex-1 py-1.5 border text-left border-l-0 rounded-r-md text-sm w-2"
                      placeholder={`${selectedCountry.dialCode.slice(
                        1
                      )} 000-0000`}
                    />
                  </div>
                </div>
              )}

              {shouldShowField("email") && (
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-1.5 border rounded-md text-sm ${
                      emailError ? "border-red-500" : ""
                    }`}
                    placeholder="hello@example.com"
                    required
                  />
                  {emailError && (
                    <p className="mt-1 text-xs text-red-500">{emailError}</p>
                  )}
                </div>
              )}

              {shouldShowField("agencyName") && (
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Agency Name*
                  </label>
                  <input
                    type="text"
                    name="agency_Name"
                    value={formData.agency_Name}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 border rounded-md text-sm"
                    placeholder="Enter your agency name"
                    required
                  />
                </div>
              )}

              {shouldShowField("companyName") && (
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Company Name*
                  </label>
                  <input
                    type="text"
                    name="company_Name"
                    value={formData.company_Name}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 border rounded-md text-sm"
                    placeholder="Enter your company name"
                    required
                  />
                </div>
              )}

              {shouldShowField("declarantCode") && (
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Declarant Code*
                  </label>
                  <input
                    type="text"
                    name="declarant_Code"
                    value={formData.declarant_Code}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 border rounded-md text-sm"
                    placeholder="e.g. NCS/AGT/12345"
                    required
                  />
                </div>
              )}

              {/* Removed duplicate declarantCode block */}

              {shouldShowField("businessRegNo") && (
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    CAC Number*
                  </label>
                  <input
                    type="text"
                    name="cac"
                    value={formData.cac}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 border rounded-md text-sm"
                    placeholder="e.g. RC1234567"
                    required
                  />
                </div>
              )}

              {shouldShowField("address") && (
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Address*
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 border rounded-md text-sm"
                    placeholder={
                      role === "individual account"
                        ? "Enter your home address"
                        : "Enter your office address"
                    }
                    required
                  />
                </div>
              )}

              {shouldShowField("state") && (
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    State*
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 border rounded-md text-sm bg-white"
                    required
                    disabled={locationDataLoading || !!locationDataError}
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state.uuid} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                  {locationDataLoading && (
                    <p className="mt-1 text-xs text-gray-500">Loading states...</p>
                  )}
                </div>
              )}

              {shouldShowField("lga") && (
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Local Govt*
                  </label>
                  <select
                    name="local_govt"
                    value={formData.local_govt}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 border rounded-md text-sm bg-white"
                    required
                    disabled={!selectedStateUuid || countyLoading || !!locationDataError}
                  >
                    <option value="">Select Local Govt</option>
                    {filteredCounties.map((county) => (
                      <option key={county.uuid} value={county.name}>
                        {county.name}
                      </option>
                    ))}
                  </select>
                  {!selectedStateUuid && !locationDataError && (
                    <p className="mt-1 text-xs text-gray-500">Please select a state first</p>
                  )}
                  {selectedStateUuid && countyLoading && (
                    <p className="mt-1 text-xs text-gray-500">Loading counties...</p>
                  )}
                </div>
              )}

              {shouldShowField("password") && (
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Password*
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-3 py-1.5 border rounded-md text-sm"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  <div className="mt-0.5 flex items-center">
                    <svg
                      className="w-3 h-3 text-gray-400 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-xs text-gray-500">
                      Must contain 1 uppercase, 1 number, 1 special character, min. 8 characters
                    </span>
                  </div>
                  {passwordError && (
                    <p className="mt-1 text-xs text-red-500">{passwordError}</p>
                  )}
                </div>
              )}

              {shouldShowField("confirmPassword") && (
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Confirm Password*
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirm_Password"
                      value={formData.confirm_Password}
                      onChange={handleChange}
                      className="w-full px-3 py-1.5 border rounded-md text-sm"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-4">
              <button
                type="button"
                onClick={handleGoBack}
                className="flex-1 py-1.5 px-4 border border-gray-200 text-black rounded-md hover:bg-gray-200 transition text-sm"
              >
                Go back
              </button>
              <button
                type="submit"
                className={`flex-1 py-1.5 px-4 ${
                  isFormValid && !locationDataLoading && !locationDataError
                    ? "bg-green-500 hover:bg-green-600 text-black"
                    : "bg-gray-300 text-white cursor-not-allowed"
                } rounded-md transition text-sm`}
                disabled={!isFormValid || locationDataLoading || !!locationDataError}
              >
                Next
              </button>
            </div>

            <div className="mt-3 text-center text-xs">
              <span className="text-gray-500">Already have an account? </span>
              <a href="/login" className="text-green-500 hover:underline">
                Login
              </a>
            </div>
          </form>
        </div>
      </div>

      {/* <OTPDeliveryModal
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        onSubmit={handleSubmit}
        email={formData.email}
        phone={
          formData.phone_number
            ? `${selectedCountry.dialCode} ${formData.phone_number}`
            : ""
        }
        hasPhone={!!formData.phone_number}
        errorMessage={registrationError} // Pass the error message
      /> */}

      <OTPDeliveryModal
  isOpen={showOTPModal}
  onClose={() => setShowOTPModal(false)}
  onSubmit={handleSubmit}
  email={formData.email}
  phone={
    formData.phone_number
      ? `${selectedCountry.dialCode} ${formData.phone_number}`
      : ""
  }
  hasPhone={!!formData.phone_number}
  errorMessage={registrationError} // This is where the error is passed
/>
    </div>
  );
};

export default SignUpForm;