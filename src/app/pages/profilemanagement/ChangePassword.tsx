// "use client"

// import { toast } from "react-toastify";
// import { authService } from "../../modules/auth/services";
// import { useEffect, useState } from "react";
// import { useAuth } from "../../modules/auth/hooks";
// import OTPInputModal from "../../modules/auth/components/Otp-Input-Modal";

// interface ChangePasswordModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   email: string;
//   phone_number?: string;
//   hasPhone?: boolean;
// }

// const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ 
//   isOpen, 
//   onClose, 
//   email, 
//   phone_number,
//   // hasPhone,
// }) => {
  
//   const {userData} = useAuth()
//   console.log (phone_number, email, userData)
  
//   // Define steps for the password change flow
//   type Step = "enter-otp" | "change-password";
//   const [currentStep, setCurrentStep] = useState<Step>("enter-otp");
  
//   // OTP related states
//   const [otpDeliveryMethod, _setOtpDeliveryMethod] = useState<"email" | "sms">("email");
//   const [otpError, setOtpError] = useState("");
  
//   // Password form states
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
  
//   // const navigate = useNavigate();

//   // Immediately send OTP when modal opens
//   useEffect(() => {
//     if (isOpen) {
//       // Reset states when modal opens
//       setOtpError("");
//       setError("");
//       setOldPassword("");
//       setNewPassword("");
//       setConfirmPassword("");
      
//       // Default to email delivery, immediate OTP send
//       sendOTP();
//     }
//   }, [isOpen]);

//   // Handle sending OTP - simplified version that doesn't send parameters
//   const sendOTP = async () => {
//     setIsLoading(true);
    
//     try {
//       // Call API to send OTP - no parameters needed
//       await authService.sendOtp();
//       toast.success(`Verification code sent`);
//     } catch (err: any) {
//       setOtpError(err.message || `Failed to send verification code`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle OTP verification
//   const handleOTPVerify = async (otpCode: string ) => {
//     if (!otpCode || otpCode.length < 4) {
//       setOtpError("Please enter a valid verification code");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       // Call API to verify OTP
//       await authService.verifyConfirmPasswordOtp(email, otpCode, userData.phone_number);
//       toast.success("Identity verified successfully");
//       setCurrentStep("change-password");
//       setOtpError("");
//     } catch (err: any) {
//       setOtpError(err.message || "Invalid verification code. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle password change submission
//   const handlePasswordSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (newPassword !== confirmPassword) {
//       setError("New passwords do not match");
//       return;
//     }

//     if (newPassword.length < 8) {
//       setError("Password must be at least 8 characters");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       await authService.changePassword(oldPassword, newPassword);
//       toast.success("Password successfully changed");
//       onClose();
//       // Optionally redirect
//       // navigate("/dashboard");
//     } catch (err: any) {
//       setError(err.message || "Failed to change password");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   // Render OTP input step
//   if (currentStep === "enter-otp") {
//     return (
//       <OTPInputModal
//         isOpen={isOpen}
//         onClose={onClose}
//         onVerify={handleOTPVerify}
//         email={email}
//         deliveryMethod={otpDeliveryMethod}
//         onResend={sendOTP}
//         errorMessage={otpError}
//         isLoading={isLoading}
//       />
//     );
//   }
  
//   // Render password change form
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
//         <div className="p-6">
//           <h2 className="text-lg font-semibold text-center mb-4">Change Password</h2>
          
//           {error && (
//             <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4" role="alert">
//               <p className="text-sm">{error}</p>
//             </div>
//           )}

//           <form onSubmit={handlePasswordSubmit}>
//             <div className="space-y-4 mb-6">
//               <div>
//                 <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 mb-1">
//                   Current Password
//                 </label>
//                 <input
//                   id="oldPassword"
//                   type="password"
//                   value={oldPassword}
//                   onChange={(e) => setOldPassword(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
//                   New Password
//                 </label>
//                 <input
//                   id="newPassword"
//                   type="password"
//                   value={newPassword}
//                   onChange={(e) => setNewPassword(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
//                   Confirm Password
//                 </label>
//                 <input
//                   id="confirmPassword"
//                   type="password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="flex gap-3">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 disabled={isLoading}
//                 className="flex-1 py-2 px-4 border border-gray-200 text-black rounded-md hover:bg-gray-200 transition text-sm disabled:opacity-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="flex-1 py-2 px-4 bg-green-500 text-black rounded-md hover:bg-green-600 transition text-sm disabled:opacity-50 flex items-center justify-center"
//               >
//                 {isLoading ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Changing...
//                   </>
//                 ) : (
//                   "Change Password"
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChangePasswordModal;




// "use client"

// import { toast } from "react-toastify";
// import { authService } from "../../modules/auth/services";
// import { useEffect, useState } from "react";
// import { useAuth } from "../../modules/auth/hooks";
// import OTPInputModal from "../../modules/auth/components/Otp-Input-Modal";

// interface ChangePasswordModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   email: string;
//   phone_number?: string;
//   hasPhone?: boolean;
// }

// const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ 
//   isOpen, 
//   onClose, 
//   email, 
//   phone_number,
//   // hasPhone,
// }) => {
  
//   const {userData} = useAuth()
//   console.log (phone_number, email, userData)
  
//   // Define steps for the password change flow
//   type Step = "enter-otp" | "change-password";
//   const [currentStep, setCurrentStep] = useState<Step>("enter-otp");
  
//   // OTP related states
//   const [otpDeliveryMethod, _setOtpDeliveryMethod] = useState<"email" | "sms">("email");
//   const [otpError, setOtpError] = useState("");
  
//   // Password form states
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const [fieldErrors, setFieldErrors] = useState<{
//     old_password?: string;
//     new_password?: string;
//     general?: string;
//   }>({});
//   const [isLoading, setIsLoading] = useState(false);
  
//   // const navigate = useNavigate();

//   // Enhanced error extraction function
//   const extractPasswordChangeError = (error: any) => {
//     console.log("Password change error:", error);
    
//     if (error?.response?.data) {
//       const errorData = error.response.data;
      
//       // Handle field-specific errors
//       const fieldErrors: any = {};
      
//       // Check for old_password errors
//       if (errorData.old_password && Array.isArray(errorData.old_password)) {
//         fieldErrors.old_password = errorData.old_password[0];
//       }
      
//       // Check for new_password errors  
//       if (errorData.new_password && Array.isArray(errorData.new_password)) {
//         fieldErrors.new_password = errorData.new_password[0];
//       }
      
//       // Check for general error array
//       if (errorData.error && Array.isArray(errorData.error)) {
//         fieldErrors.general = errorData.error[0];
//       }
      
//       // Check for non_field_errors
//       if (errorData.non_field_errors && Array.isArray(errorData.non_field_errors)) {
//         fieldErrors.general = errorData.non_field_errors[0];
//       }
      
//       // Check for detail message
//       if (errorData.detail) {
//         fieldErrors.general = errorData.detail;
//       }
      
//       return fieldErrors;
//     }
    
//     // Fallback for other error formats
//     return { general: error?.message || "An unexpected error occurred" };
//   };

//   // Immediately send OTP when modal opens
//   useEffect(() => {
//     if (isOpen) {
//       // Reset states when modal opens
//       setOtpError("");
//       setError("");
//       setFieldErrors({});
//       setOldPassword("");
//       setNewPassword("");
//       setConfirmPassword("");
      
//       // Default to email delivery, immediate OTP send
//       sendOTP();
//     }
//   }, [isOpen]);

//   // Handle sending OTP - simplified version that doesn't send parameters
//   const sendOTP = async () => {
//     setIsLoading(true);
    
//     try {
//       // Call API to send OTP - no parameters needed
//       await authService.sendOtp();
//       toast.success(`Verification code sent`);
//     } catch (err: any) {
//       setOtpError(err.message || `Failed to send verification code`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle OTP verification
//   const handleOTPVerify = async (otpCode: string ) => {
//     if (!otpCode || otpCode.length < 4) {
//       setOtpError("Please enter a valid verification code");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       // Call API to verify OTP
//       await authService.verifyConfirmPasswordOtp(email, otpCode, userData.phone_number);
//       toast.success("Identity verified successfully");
//       setCurrentStep("change-password");
//       setOtpError("");
//     } catch (err: any) {
//       setOtpError(err.message || "Invalid verification code. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle password change submission
//   const handlePasswordSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Clear previous errors
//     setError("");
//     setFieldErrors({});
    
//     if (newPassword !== confirmPassword) {
//       setFieldErrors({ new_password: "New passwords do not match" });
//       return;
//     }

//     if (newPassword.length < 8) {
//       setFieldErrors({ new_password: "Password must be at least 8 characters" });
//       return;
//     }

//     setIsLoading(true);
//     try {
//       await authService.changePassword(oldPassword, newPassword);
//       toast.success("Password successfully changed");
//       onClose();
//       // Optionally redirect
//       // navigate("/dashboard");
//     } catch (err: any) {
//       const errors = extractPasswordChangeError(err);
//       setFieldErrors(errors);
      
//       // Set general error if no specific field errors
//       if (!errors.old_password && !errors.new_password && errors.general) {
//         setError(errors.general);
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   // Render OTP input step
//   if (currentStep === "enter-otp") {
//     return (
//       <OTPInputModal
//         isOpen={isOpen}
//         onClose={onClose}
//         onVerify={handleOTPVerify}
//         email={email}
//         deliveryMethod={otpDeliveryMethod}
//         onResend={sendOTP}
//         errorMessage={otpError}
//         isLoading={isLoading}
//       />
//     );
//   }
  
//   // Render password change form
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
//         <div className="p-6">
//           <h2 className="text-lg font-semibold text-center mb-4">Change Password</h2>
          
//           {/* General error message */}
//           {error && (
//             <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4" role="alert">
//               <p className="text-sm">{error}</p>
//             </div>
//           )}

//           <form onSubmit={handlePasswordSubmit}>
//             <div className="space-y-4 mb-6">
//               <div>
//                 <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 mb-1">
//                   Current Password
//                 </label>
//                 <input
//                   id="oldPassword"
//                   type="password"
//                   value={oldPassword}
//                   onChange={(e) => setOldPassword(e.target.value)}
//                   className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${
//                     fieldErrors.old_password ? 'border-red-400 bg-red-50' : 'border-gray-300'
//                   }`}
//                   required
//                 />
//                 {fieldErrors.old_password && (
//                   <p className="mt-1 text-sm text-red-600">{fieldErrors.old_password}</p>
//                 )}
//               </div>

//               <div>
//                 <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
//                   New Password
//                 </label>
//                 <input
//                   id="newPassword"
//                   type="password"
//                   value={newPassword}
//                   onChange={(e) => setNewPassword(e.target.value)}
//                   className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${
//                     fieldErrors.new_password ? 'border-red-400 bg-red-50' : 'border-gray-300'
//                   }`}
//                   required
//                 />
//                 {fieldErrors.new_password && (
//                   <p className="mt-1 text-sm text-red-600">{fieldErrors.new_password}</p>
//                 )}
//               </div>

//               <div>
//                 <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
//                   Confirm Password
//                 </label>
//                 <input
//                   id="confirmPassword"
//                   type="password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Display general field error if exists */}
//             {fieldErrors.general && (
//               <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4" role="alert">
//                 <p className="text-sm">{fieldErrors.general}</p>
//               </div>
//             )}

//             <div className="flex gap-3">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 disabled={isLoading}
//                 className="flex-1 py-2 px-4 border border-gray-200 text-black rounded-md hover:bg-gray-200 transition text-sm disabled:opacity-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="flex-1 py-2 px-4 bg-green-500 text-black rounded-md hover:bg-green-600 transition text-sm disabled:opacity-50 flex items-center justify-center"
//               >
//                 {isLoading ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Changing...
//                   </>
//                 ) : (
//                   "Change Password"
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChangePasswordModal;



"use client"

import { toast } from "react-toastify";
import { authService } from "../../modules/auth/services";
import { useEffect, useState } from "react";
import { useAuth } from "../../modules/auth/hooks";
import OTPInputModal from "../../modules/auth/components/Otp-Input-Modal";

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
  const [fieldErrors, setFieldErrors] = useState<{
    old_password?: string;
    new_password?: string;
    general?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  
  // Password visibility states
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // const navigate = useNavigate();

  // Enhanced error extraction function
  const extractPasswordChangeError = (error: any) => {
    console.log("Password change error:", error);
    
    if (error?.response?.data) {
      const errorData = error.response.data;
      
      // Handle field-specific errors
      const fieldErrors: any = {};
      
      // Check for old_password errors
      if (errorData.old_password && Array.isArray(errorData.old_password)) {
        fieldErrors.old_password = errorData.old_password[0];
      }
      
      // Check for new_password errors  
      if (errorData.new_password && Array.isArray(errorData.new_password)) {
        fieldErrors.new_password = errorData.new_password[0];
      }
      
      // Check for general error array
      if (errorData.error && Array.isArray(errorData.error)) {
        fieldErrors.general = errorData.error[0];
      }
      
      // Check for non_field_errors
      if (errorData.non_field_errors && Array.isArray(errorData.non_field_errors)) {
        fieldErrors.general = errorData.non_field_errors[0];
      }
      
      // Check for detail message
      if (errorData.detail) {
        fieldErrors.general = errorData.detail;
      }
      
      return fieldErrors;
    }
    
    // Fallback for other error formats
    return { general: error?.message || "An unexpected error occurred" };
  };

  // Immediately send OTP when modal opens
  useEffect(() => {
    if (isOpen) {
      // Reset states when modal opens
      setOtpError("");
      setError("");
      setFieldErrors({});
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowOldPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);
      
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
    
    // Clear previous errors
    setError("");
    setFieldErrors({});
    
    if (newPassword !== confirmPassword) {
      setFieldErrors({ new_password: "New passwords do not match" });
      return;
    }

    if (newPassword.length < 8) {
      setFieldErrors({ new_password: "Password must be at least 8 characters" });
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
      const errors = extractPasswordChangeError(err);
      setFieldErrors(errors);
      
      // Set general error if no specific field errors
      if (!errors.old_password && !errors.new_password && errors.general) {
        setError(errors.general);
      }
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
          
          {/* General error message */}
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
                <div className="relative">
                  <input
                    id="oldPassword"
                    type={showOldPassword ? "text" : "password"}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className={`w-full px-3 py-2 pr-12 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${
                      fieldErrors.old_password ? 'border-red-400 bg-red-50' : 'border-gray-300'
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showOldPassword ? (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {fieldErrors.old_password && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.old_password}</p>
                )}
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={`w-full px-3 py-2 pr-12 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${
                      fieldErrors.new_password ? 'border-red-400 bg-red-50' : 'border-gray-300'
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {fieldErrors.new_password && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.new_password}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 pr-12 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Display general field error if exists */}
            {fieldErrors.general && (
              <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4" role="alert">
                <p className="text-sm">{fieldErrors.general}</p>
              </div>
            )}

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