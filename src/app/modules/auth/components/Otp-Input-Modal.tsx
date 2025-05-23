import React, { useState, useEffect, useRef } from "react";

interface OTPInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (otp: string) => void;
  email: string;
  deliveryMethod: "email" | "sms";
  onResend: () => void;
  errorMessage?: string;
  isLoading?: boolean;
}

const OTPInputModal: React.FC<OTPInputModalProps> = ({
  isOpen,
  onClose,
  onVerify,
//   email,
  deliveryMethod,
  onResend,
  errorMessage,
  isLoading = false,
}) => {
  const [otp, setOtp] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Handle OTP change
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const value = e.target.value.replace(/[^0-9]/g, "");
    setOtp(value);
  };

  // Handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length >= 4) {
      onVerify(otp);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-center mb-4">Verify Your Identity</h2>
          
          <p className="text-sm text-gray-600 mb-6 text-center">
            Please enter the verification code sent to your {deliveryMethod === "email" ? "email" : "phone"}.
          </p>
          
          {errorMessage && (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4" role="alert">
              <p className="text-sm">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="otpInput" className="block text-sm font-medium text-gray-700 mb-1">
                Verification Code
              </label>
              <input
                ref={inputRef}
                id="otpInput"
                type="text"
                value={otp}
                onChange={handleOtpChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Enter your verification code"
                maxLength={6}
                required
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 py-2 px-4 border border-gray-200 text-black rounded-md hover:bg-gray-200 transition text-sm disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || otp.length < 4}
                className="flex-1 py-2 px-4 bg-green-500 text-black rounded-md hover:bg-green-600 transition text-sm disabled:opacity-50 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </>
                ) : (
                  "Verify"
                )}
              </button>
            </div>
            
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={onResend}
                className="text-sm text-green-600 hover:text-green-800"
                disabled={isLoading}
              >
                Resend code
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTPInputModal;