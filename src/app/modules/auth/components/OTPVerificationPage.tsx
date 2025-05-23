// "use client";

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import type { AppDispatch, RootState } from "../../../core/store";
// import { resendOtp, verifyOtp } from "../redux/slices/authSlice";
// import { setCurrentStep } from "../redux/slices/uiSlice";

// const OTPVerificationPage: React.FC = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch<AppDispatch>();
//   const { isLoading, isAuthenticated, error } = useSelector(
//     (state: RootState) => state.auth
//   );

//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [deliveryMethod, setDeliveryMethod] = useState<"email" | "sms">(
//     "email"
//   );
//   const [countdown, setCountdown] = useState(60);
//   const [resendDisabled, setResendDisabled] = useState(true);
//   const [otpExpired, setOtpExpired] = useState(false);
//   const [otpSentTime, setOtpSentTime] = useState<number>(Date.now());
//   const [successMessage, setSuccessMessage] = useState("");

//   // Set up refs for each input field
//   const inputRefs = Array(6)
//     .fill(0)
//     .map(() => React.createRef<HTMLInputElement>());

//   useEffect(() => {
//     // Get email, phone number, and delivery method from localStorage
//     const storedEmail = localStorage.getItem("userEmail");
//     const storedPhoneNumber = localStorage.getItem("userPhoneNumber");
//     const storedDeliveryMethod = localStorage.getItem("otpDeliveryMethod") as
//       | "email"
//       | "sms";

//     // Get stored OTP time if exists
//     const storedOtpTime = localStorage.getItem("otpSentTime");
//     if (storedOtpTime) {
//       setOtpSentTime(parseInt(storedOtpTime));
//     } else {
//       // If no stored time, record current time as OTP sent time
//       const currentTime = Date.now();
//       setOtpSentTime(currentTime);
//       localStorage.setItem("otpSentTime", currentTime.toString());
//     }

//     if (storedEmail) {
//       setEmail(storedEmail);
//     } else {
//       // Redirect to signup if email is not found
//       dispatch(setCurrentStep(2)); // Update the current step in UI state
//       navigate("/signup");
//     }

//     if (storedPhoneNumber) {
//       setPhoneNumber(storedPhoneNumber);
//     }

//     if (storedDeliveryMethod) {
//       setDeliveryMethod(storedDeliveryMethod);
//     }

//     // Focus on the first input field
//     if (inputRefs[0]?.current) {
//       inputRefs[0].current.focus();
//     }

//     return () => {};
//   }, [navigate, dispatch]);

//   // Separate useEffect for countdown
//   useEffect(() => {
//     // Calculate remaining time based on stored OTP sent time
//     const calculateRemainingTime = () => {
//       const now = Date.now();
//       const elapsedSeconds = Math.floor((now - otpSentTime) / 1000);
//       const remainingSeconds = Math.max(0, 60 - elapsedSeconds);

//       if (remainingSeconds <= 0) {
//         setOtpExpired(true);
//         setResendDisabled(false);
//         return 0;
//       }

//       return remainingSeconds;
//     };

//     // Initial calculation
//     const initialRemaining = calculateRemainingTime();
//     setCountdown(initialRemaining);
//     setResendDisabled(initialRemaining > 0);

//     // Start countdown for resend button
//     const timer = setInterval(() => {
//       const remaining = calculateRemainingTime();
//       setCountdown(remaining);

//       if (remaining <= 0) {
//         clearInterval(timer);
//         setResendDisabled(false);
//         setOtpExpired(true);
//       }
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [otpSentTime]);

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate("/login");
//     }
//   }, [isAuthenticated, navigate]);

//   // Handle pasted OTP
//   const handlePaste = (
//     e: React.ClipboardEvent<HTMLInputElement>,
//     index: number
//   ) => {
//     e.preventDefault();
//     const pastedData = e.clipboardData.getData("text").trim();

//     // Try to extract digits from pasted text
//     const digits = pastedData.replace(/\D/g, "");

//     // If we have digits, distribute them to input fields
//     if (digits.length > 0) {
//       const newOtp = [...otp];

//       // Fill starting from the current input index
//       for (let i = 0; i < Math.min(digits.length, 6 - index); i++) {
//         newOtp[index + i] = digits[i];
//       }

//       setOtp(newOtp);

//       // Focus on appropriate field after paste
//       const nextIndex = Math.min(index + digits.length, 5);
//       if (inputRefs[nextIndex]?.current) {
//         inputRefs[nextIndex].current?.focus();
//       }
//     }
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     index: number
//   ) => {
//     const value = e.target.value;

//     // Only allow one digit
//     if (value.length > 1) return;

//     // Update the OTP array
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     // Move to next input field if a digit was entered
//     if (value && index < 5 && inputRefs[index + 1]?.current) {
//       inputRefs[index + 1].current?.focus();
//     }
//   };

//   const handleKeyDown = (
//     e: React.KeyboardEvent<HTMLInputElement>,
//     index: number
//   ) => {
//     // Move to previous input field on backspace if current field is empty
//     if (
//       e.key === "Backspace" &&
//       !otp[index] &&
//       index > 0 &&
//       inputRefs[index - 1]?.current
//     ) {
//       inputRefs[index - 1].current?.focus();
//     }
//   };

//   const handleResendOtp = async () => {
//     if (email) {
//       try {
//         // Reset OTP inputs
//         setOtp(["", "", "", "", "", ""]);
//         // Focus on first input
//         if (inputRefs[0]?.current) {
//           inputRefs[0].current.focus();
//         }

//         await dispatch(
//           resendOtp({
//             email,
//             deliveryMethod,
//           })
//         );

//         // Update OTP sent time
//         const currentTime = Date.now();
//         setOtpSentTime(currentTime);
//         localStorage.setItem("otpSentTime", currentTime.toString());

//         // Reset countdown and expiration status
//         setCountdown(60);
//         setResendDisabled(true);
//         setOtpExpired(false);
//       } catch (err) {
//         console.error("Failed to resend OTP:", err);
//       }
//     }
//   };

//   // const handleVerify = async () => {
//   //   const otpValue = otp.join("")

//   //   // Check if OTP is complete
//   //   if (otpValue.length !== 6 || otp.some((digit) => digit === "")) {
//   //     console.error("Incomplete OTP entered")
//   //     return
//   //   }

//   //   // Check if OTP has expired
//   //   if (otpExpired) {
//   //     console.error("OTP has expired. Please request a new one.")
//   //     return
//   //   }

//   //   try {
//   //     const verifyPayload: {
//   //       email: string;
//   //       otp: string;
//   //       phone_number?: string;
//   //     } = {
//   //       email,
//   //       otp: otpValue,
//   //     }

//   //     // Include phone number in payload if available
//   //     if (phoneNumber) {
//   //       verifyPayload.phone_number = phoneNumber
//   //     }

//   //     const resultAction = await dispatch(verifyOtp(verifyPayload))

//   //     // Check if the action was fulfilled
//   //     if (verifyOtp.fulfilled.match(resultAction)) {
//   //       // The API call was successful
//   //       const userData = resultAction.payload.user

//   //       // Clear data from localStorage related to OTP
//   //       localStorage.removeItem("otpDeliveryMethod")
//   //       localStorage.removeItem("userPhoneNumber")
//   //       localStorage.removeItem("otpSentTime")

//   //       if (userData && userData.is_active) {
//   //         // If user is active, redirect to login
//   //         console.log("Account successfully activated, redirecting to login")
//   //         navigate("/login")
//   //       } else {

//   //       }
//   //     }
//   //   } catch (err) {
//   //     console.error("OTP verification failed:", err)
//   //   }
//   // }

//   const handleVerify = async () => {
//     const otpValue = otp.join("");

//     // Check if OTP is complete
//     if (otpValue.length !== 6 || otp.some((digit) => digit === "")) {
//       console.error("Incomplete OTP entered");
//       return;
//     }

//     // Check if OTP has expired
//     if (otpExpired) {
//       console.error("OTP has expired. Please request a new one.");
//       return;
//     }

//     try {
//       const verifyPayload: {
//         email: string;
//         otp: string;
//         phone_number?: string;
//       } = {
//         email,
//         otp: otpValue,
//       };

//       // Include phone number in payload if available
//       if (phoneNumber) {
//         verifyPayload.phone_number = phoneNumber;
//       }

//       const resultAction = await dispatch(verifyOtp(verifyPayload));

//       // Check if the action was fulfilled
//       if (verifyOtp.fulfilled.match(resultAction)) {
//         // Set the success message from the API response
//         setSuccessMessage("Account verified successfully");

//         // The API call was successful
//         const userData = resultAction.payload.user;

//         // Clear data from localStorage related to OTP
//         localStorage.removeItem("otpDeliveryMethod");
//         localStorage.removeItem("userPhoneNumber");
//         localStorage.removeItem("otpSentTime");

//         // Show success message for 2 seconds before redirecting
//         setTimeout(() => {
//           if (userData && userData.is_active) {
//             // If user is active, redirect to login
//             console.log("Account successfully activated, redirecting to login");
//             navigate("/login");
//           }
//         }, 2000);
//       }
//     } catch (err) {
//       console.error("OTP verification failed:", err);
//     }
//   };

//   const handleGoBack = () => {
//     dispatch(setCurrentStep(2)); // Update the current step in UI state
//     navigate("/signup");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
//         <div className="flex justify-center mb-4">
//           <div className="h-12 w-12 flex items-center justify-center">
//             <img src="/images/logo.png" alt="Logo" className="h-8" />
//           </div>
//         </div>

//         <h2 className="text-lg font-semibold text-center mb-1">
//           Verify Your Account
//         </h2>
//         <p className="text-gray-500 text-center text-sm mb-6">
//           {deliveryMethod === "email"
//             ? `We've sent a 6-digit code to your email ${email.replace(
//                 /(.{2})(.*)@(.*)/,
//                 "$1***@$3"
//               )}`
//             : `We've sent a 6-digit code to your phone number`}
//         </p>

//         <div className="mb-6 mr-2">
//           {/* OTP inputs */}
//           <div className="flex justify-between gap-2 mb-4">
//             {otp.map((digit, index) => (
//               <input
//                 key={index}
//                 ref={inputRefs[index]}
//                 type="text"
//                 maxLength={1}
//                 className="w-12 h-12 text-center border rounded-md text-xl font-semibold"
//                 value={digit}
//                 onChange={(e) => handleChange(e, index)}
//                 onKeyDown={(e) => handleKeyDown(e, index)}
//                 onPaste={(e) => handlePaste(e, index)}
//                 inputMode="numeric"
//                 pattern="[0-9]*"
//               />
//             ))}
//           </div>

//           {/* Find this part in your code */}
//           <p className="text-xs text-gray-500 text-center mb-4">
//             You can paste the 6-digit code copied from your email
//           </p>

//           {/* Insert the success message and error message code here */}
//           {successMessage && (
//             <div className="text-green-500 text-center text-sm mb-4 font-semibold">
//               {successMessage}
//             </div>
//           )}

//           {/* Display error from Redux state */}
//           {error && (
//             <div className="text-red-500 text-center text-sm mb-4">{error}</div>
//           )}

//           {/* Display OTP expired message */}
//           {otpExpired && (
//             <div className="text-orange-500 text-center text-sm mb-4">
//               This OTP has expired. Please request a new one.
//             </div>
//           )}

//           <button
//             type="button"
//             className="w-full py-2 px-4 bg-green-500 text-black rounded-md hover:bg-green-600 transition mb-4"
//             onClick={handleVerify}
//             disabled={isLoading || otp.join("").length !== 6 || otpExpired}
//           >
//             {isLoading ? "Verifying..." : "Verify"}
//           </button>

//           <div className="text-center text-sm">
//             <span className="text-gray-500">Didn't receive code? </span>
//             <button
//               type="button"
//               className={`text-green-500 hover:underline ${
//                 resendDisabled ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//               disabled={resendDisabled}
//               onClick={handleResendOtp}
//             >
//               {resendDisabled ? `Resend in ${countdown}s` : "Resend"}
//             </button>
//           </div>
//         </div>

//         <button
//           type="button"
//           onClick={handleGoBack}
//           className="w-full py-2 px-4 border border-gray-200 text-black rounded-md hover:bg-gray-200 transition"
//         >
//           Go back
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OTPVerificationPage;





"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../core/store";
import { resendOtp, verifyOtp } from "../redux/slices/authSlice";
import { setCurrentStep } from "../redux/slices/uiSlice";
import StepIndicator from "./StepIndicator";

const OTPVerificationPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, isAuthenticated, error } = useSelector(
    (state: RootState) => state.auth
  );
  const { currentStep } = useSelector((state: RootState) => state.ui);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState<"email" | "sms">(
    "email"
  );
  const [countdown, setCountdown] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [otpExpired, setOtpExpired] = useState(false);
  const [otpSentTime, setOtpSentTime] = useState<number>(Date.now());
  const [successMessage, setSuccessMessage] = useState("");

  // Set up refs for each input field
  const inputRefs = Array(6)
    .fill(0)
    .map(() => React.createRef<HTMLInputElement>());

  useEffect(() => {
    // Get email, phone number, and delivery method from localStorage
    const storedEmail = localStorage.getItem("userEmail");
    const storedPhoneNumber = localStorage.getItem("userPhoneNumber");
    const storedDeliveryMethod = localStorage.getItem("otpDeliveryMethod") as
      | "email"
      | "sms";

    // Get stored OTP time if exists
    const storedOtpTime = localStorage.getItem("otpSentTime");
    if (storedOtpTime) {
      setOtpSentTime(parseInt(storedOtpTime));
    } else {
      // If no stored time, record current time as OTP sent time
      const currentTime = Date.now();
      setOtpSentTime(currentTime);
      localStorage.setItem("otpSentTime", currentTime.toString());
    }

    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // Redirect to signup if email is not found
      dispatch(setCurrentStep(2)); // Update the current step in UI state
      navigate("/signup");
    }

    if (storedPhoneNumber) {
      setPhoneNumber(storedPhoneNumber);
    }

    if (storedDeliveryMethod) {
      setDeliveryMethod(storedDeliveryMethod);
    }

    // Ensure we're on step 3 when on OTP verification page
    dispatch(setCurrentStep(3));

    // Focus on the first input field
    if (inputRefs[0]?.current) {
      inputRefs[0].current.focus();
    }

    return () => {};
  }, [navigate, dispatch]);

  // Separate useEffect for countdown
  useEffect(() => {
    // Calculate remaining time based on stored OTP sent time
    const calculateRemainingTime = () => {
      const now = Date.now();
      const elapsedSeconds = Math.floor((now - otpSentTime) / 1000);
      const remainingSeconds = Math.max(0, 60 - elapsedSeconds);

      if (remainingSeconds <= 0) {
        setOtpExpired(true);
        setResendDisabled(false);
        return 0;
      }

      return remainingSeconds;
    };

    // Initial calculation
    const initialRemaining = calculateRemainingTime();
    setCountdown(initialRemaining);
    setResendDisabled(initialRemaining > 0);

    // Start countdown for resend button
    const timer = setInterval(() => {
      const remaining = calculateRemainingTime();
      setCountdown(remaining);

      if (remaining <= 0) {
        clearInterval(timer);
        setResendDisabled(false);
        setOtpExpired(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [otpSentTime]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Handle pasted OTP
  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number
  ) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    // Try to extract digits from pasted text
    const digits = pastedData.replace(/\D/g, "");

    // If we have digits, distribute them to input fields
    if (digits.length > 0) {
      const newOtp = [...otp];

      // Fill starting from the current input index
      for (let i = 0; i < Math.min(digits.length, 6 - index); i++) {
        newOtp[index + i] = digits[i];
      }

      setOtp(newOtp);

      // Focus on appropriate field after paste
      const nextIndex = Math.min(index + digits.length, 5);
      if (inputRefs[nextIndex]?.current) {
        inputRefs[nextIndex].current?.focus();
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    // Only allow one digit
    if (value.length > 1) return;

    // Update the OTP array
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input field if a digit was entered
    if (value && index < 5 && inputRefs[index + 1]?.current) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    // Move to previous input field on backspace if current field is empty
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs[index - 1]?.current
    ) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleResendOtp = async () => {
    if (email) {
      try {
        // Reset OTP inputs
        setOtp(["", "", "", "", "", ""]);
        // Focus on first input
        if (inputRefs[0]?.current) {
          inputRefs[0].current.focus();
        }

        await dispatch(
          resendOtp({
            email,
            deliveryMethod,
          })
        );

        // Update OTP sent time
        const currentTime = Date.now();
        setOtpSentTime(currentTime);
        localStorage.setItem("otpSentTime", currentTime.toString());

        // Reset countdown and expiration status
        setCountdown(60);
        setResendDisabled(true);
        setOtpExpired(false);
      } catch (err) {
        console.error("Failed to resend OTP:", err);
      }
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");

    // Check if OTP is complete
    if (otpValue.length !== 6 || otp.some((digit) => digit === "")) {
      console.error("Incomplete OTP entered");
      return;
    }

    // Check if OTP has expired
    if (otpExpired) {
      console.error("OTP has expired. Please request a new one.");
      return;
    }

    try {
      const verifyPayload: {
        email: string;
        otp: string;
        phone_number?: string;
      } = {
        email,
        otp: otpValue,
      };

      // Include phone number in payload if available
      if (phoneNumber) {
        verifyPayload.phone_number = phoneNumber;
      }

      const resultAction = await dispatch(verifyOtp(verifyPayload));

      // Check if the action was fulfilled
      if (verifyOtp.fulfilled.match(resultAction)) {
        // Set the success message from the API response
        setSuccessMessage("Account verified successfully");

        // Mark the current step as completed
        dispatch(setCurrentStep(4)); // Set to a number higher than the last step to mark all as complete

        // The API call was successful
        const userData = resultAction.payload.user;

        // Clear data from localStorage related to OTP
        localStorage.removeItem("otpDeliveryMethod");
        localStorage.removeItem("userPhoneNumber");
        localStorage.removeItem("otpSentTime");

        // Show success message for 2 seconds before redirecting
        setTimeout(() => {
          if (userData && userData.is_active) {
            // If user is active, redirect to login
            console.log("Account successfully activated, redirecting to login");
            navigate("/login");
          }
        }, 2000);
      }
    } catch (err) {
      console.error("OTP verification failed:", err);
    }
  };

  const handleGoBack = () => {
    dispatch(setCurrentStep(2)); // Update the current step in UI state
    navigate("/signup");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Include the step indicator */}
        <StepIndicator currentStep={currentStep} />

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 flex items-center justify-center">
              <img src="/images/logo.png" alt="Logo" className="h-8" />
            </div>
          </div>

          <h2 className="text-lg font-semibold text-center mb-1">
            Verify Your Account
          </h2>
          <p className="text-gray-500 text-center text-sm mb-6">
            {deliveryMethod === "email"
              ? `We've sent a 6-digit code to your email ${email.replace(
                  /(.{2})(.*)@(.*)/,
                  "$1***@$3"
                )}`
              : `We've sent a 6-digit code to your phone number`}
          </p>

          <div className="mb-6 mr-2">
            {/* OTP inputs */}
            <div className="flex justify-between gap-2 mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 text-center border rounded-md text-xl font-semibold"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={(e) => handlePaste(e, index)}
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
              ))}
            </div>

            {/* Find this part in your code */}
            <p className="text-xs text-gray-500 text-center mb-4">
              You can paste the 6-digit code copied from your email
            </p>

            {/* Insert the success message and error message code here */}
            {successMessage && (
              <div className="text-green-500 text-center text-sm mb-4 font-semibold">
                {successMessage}
              </div>
            )}

            {/* Display error from Redux state */}
            {error && (
              <div className="text-red-500 text-center text-sm mb-4">{error}</div>
            )}

            {/* Display OTP expired message */}
            {otpExpired && (
              <div className="text-orange-500 text-center text-sm mb-4">
                This OTP has expired. Please request a new one.
              </div>
            )}

            <button
              type="button"
              className="w-full py-2 px-4 bg-green-500 text-black rounded-md hover:bg-green-600 transition mb-4"
              onClick={handleVerify}
              disabled={isLoading || otp.join("").length !== 6 || otpExpired}
            >
              {isLoading ? "Verifying..." : "Verify"}
            </button>

            <div className="text-center text-sm">
              <span className="text-gray-500">Didn't receive code? </span>
              <button
                type="button"
                className={`text-green-500 hover:underline ${
                  resendDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={resendDisabled}
                onClick={handleResendOtp}
              >
                {resendDisabled ? `Resend in ${countdown}s` : "Resend"}
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoBack}
            className="w-full py-2 px-4 border border-gray-200 text-black rounded-md hover:bg-gray-200 transition"
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationPage;