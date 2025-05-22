import { toast } from "react-toastify";
import { authService } from "../../modules/auth/services";
import OTPInputModal from "../../modules/auth/components/Otp-Input-Modal";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import type { RootState } from "../../core/store";
import { useAuth } from "../../modules/auth/hooks";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  phone_number?: string;
  hasPhone?: boolean;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ 
  isOpen, 
  onClose, 
  email, 
  phone_number,
  // hasPhone,
}) => {
  
  const {userData} = useAuth()
  console.log (phone_number, email, userData)
  
  // Define steps for the password change flow
  type Step = "enter-otp" | "change-password";
  const [currentStep, setCurrentStep] = useState<Step>("enter-otp");
  
  // OTP related states
  const [otpDeliveryMethod, _setOtpDeliveryMethod] = useState<"email" | "sms">("email");
  const [otpError, setOtpError] = useState("");
  
  // Password form states
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // const navigate = useNavigate();

  // Immediately send OTP when modal opens
  useEffect(() => {
    if (isOpen) {
      // Reset states when modal opens
      setOtpError("");
      setError("");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      
      // Default to email delivery, immediate OTP send
      sendOTP();
    }
  }, [isOpen]);

  // Handle sending OTP - simplified version that doesn't send parameters
  const sendOTP = async () => {
    setIsLoading(true);
    
    try {
      // Call API to send OTP - no parameters needed
      await authService.sendOtp();
      toast.success(`Verification code sent`);
    } catch (err: any) {
      setOtpError(err.message || `Failed to send verification code`);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP verification
  const handleOTPVerify = async (otpCode: string ) => {
    if (!otpCode || otpCode.length < 4) {
      setOtpError("Please enter a valid verification code");
      return;
    }

    setIsLoading(true);
    try {
      // Call API to verify OTP
      await authService.verifyConfirmPasswordOtp(email, otpCode, userData.phone_number);
      toast.success("Identity verified successfully");
      setCurrentStep("change-password");
      setOtpError("");
    } catch (err: any) {
      setOtpError(err.message || "Invalid verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle password change submission
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);
    try {
      await authService.changePassword(oldPassword, newPassword);
      toast.success("Password successfully changed");
      onClose();
      // Optionally redirect
      // navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to change password");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  // Render OTP input step
  if (currentStep === "enter-otp") {
    return (
      <OTPInputModal
        isOpen={isOpen}
        onClose={onClose}
        onVerify={handleOTPVerify}
        email={email}
        deliveryMethod={otpDeliveryMethod}
        onResend={sendOTP}
        errorMessage={otpError}
        isLoading={isLoading}
      />
    );
  }
  
  // Render password change form
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-center mb-4">Change Password</h2>
          
          {error && (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4" role="alert">
              <p className="text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handlePasswordSubmit}>
            <div className="space-y-4 mb-6">
              <div>
                <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  id="oldPassword"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
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
                disabled={isLoading}
                className="flex-1 py-2 px-4 bg-green-500 text-black rounded-md hover:bg-green-600 transition text-sm disabled:opacity-50 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Changing...
                  </>
                ) : (
                  "Change Password"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;