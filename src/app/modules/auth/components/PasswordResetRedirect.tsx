// import React, { useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../../core/store";
// import { setUidb64, setToken, setStep } from "../redux/slices/passwordResetSlice";
// import { resetPasswordTokenCheck } from "../redux/slices/authSlice";
// import { PasswordResetStep } from "../types/auth";

// /**
//  * This component handles redirects from password reset email links
//  * It extracts token and uidb64 from the URL path and redirects to the reset password form
//  */
// const PasswordResetRedirect: React.FC = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch<AppDispatch>();
//   const { uidb64, token } = useParams<{ uidb64: string; token: string }>();

//   useEffect(() => {
//     const handleTokenValidation = async () => {
//       if (!uidb64 || !token) {
//         console.error("Missing uidb64 or token in URL");
//         navigate("/forgot-password");
//         return;
//       }

//       try {
//         console.log("Validating token:", { uidb64, token });
        
//         // Store parameters in Redux
//         dispatch(setUidb64(uidb64));
//         dispatch(setToken(token));
        
//         // Validate the token
//         await dispatch(resetPasswordTokenCheck({ uidb64, token })).unwrap();
        
//         // If validation succeeds, update the step and redirect to reset password form
//         dispatch(setStep(PasswordResetStep.RESET_FORM));
//         console.log("Token Valid and successful, redirecting to the change password page");
//         navigate(`/auth/reset-password?uidb64=${uidb64}&token=${token}`);
//       } catch (error) {
//         console.error("Invalid reset token:", error);
//         alert("Your password reset link is invalid or has expired. Please request a new one.");
//         navigate("/forgot-password");
//       }
//     };

//     handleTokenValidation();
//   }, [dispatch, navigate, token, uidb64]);

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="text-center">
//         <p>Validating your reset link...</p>
//         {/* You could add a loading spinner here */}
//       </div>
//     </div>
//   );
// };

// export default PasswordResetRedirect;