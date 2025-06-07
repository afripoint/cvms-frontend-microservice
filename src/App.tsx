// import React, { lazy, Suspense } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // import { Provider, useSelector } from 'react-redux'; for NIN
// import { Provider} from 'react-redux';
// // import { RootState, store } from './app/core/store'; For NIN
// import { store } from './app/core/store';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// // import NINVerificationModal from './app/modules/nin/components/NINVerificationModal';
// import Accredify from './app/pages/accredify';
// import StatusTracker from './app/pages/status-tracker';
// import TrackingDetails from './app/pages/status-tracker/tracking-details';

// // Lazy load components
// const Certificate = lazy(() => import('./app/modules/report/pages/CertificatePage'));
// const VerifyCertificatePage = lazy(() => import('./app/modules/report/components/report/Certificate'));
// const CartPage = lazy(() => import('./app/modules/cart').then(module => ({ default: module.CartPage })));
// const PaymentMethodPage = lazy(() => import('./app/pages/payment/PaymentMethodPage'));
// const Home = lazy(() => import('./app/pages/Home'));
// const VinCheckPage = lazy(() => import('./app/pages/vin/VinCheckPage'));
// const AccountType = lazy(() => import('./app/modules/auth/components/AccountTypeStep'));
// const SignUpForm = lazy(() => import('./app/modules/auth/components/SignupForm'));
// const Login = lazy(() => import('./app/modules/auth/components/Login'));
// const OTPVerificationPage = lazy(() => import('./app/modules/auth/components/OTPVerificationPage'));
// const PasswordResetContainer = lazy(() => import('./app/modules/auth/components/PasswordResetContainer'));
// // Add Settings page
// const SettingsPage = lazy(() => import('./app/pages/profilemanagement/SettingsPage'));

// // Loading component
// const LoadingFallback = () => <div className="flex h-screen items-center justify-center">Loading...</div>;

// // Main App component that doesn't use Redux hooks
// const App: React.FC = () => {
//   return (
//     <Provider store={store}>
//       <AppContent />
//     </Provider>
//   );
// };

// // Inner component that uses Redux hooks
// const AppContent: React.FC = () => {
//   return (
//     <Router>
//       {/* Toast container for notifications */}
//       <ToastContainer position="bottom-right" autoClose={5000} />
      
//       {/* NIN verification will be handled in a separate component */}
//       {/* <NINVerificationCheck /> */}
      
//       <Suspense fallback={<LoadingFallback />}>
//         <Routes>
//           {/* Public routes */}
//           <Route path="/" element={<Home />} />
//           <Route path="/account-type" element={<AccountType />} />
//           <Route path="/signup" element={<SignUpForm />} />
//           <Route path="/verify-otp" element={<OTPVerificationPage />} />
//           <Route path="/login" element={<Login />} />
          
//           {/* Password reset flow */}
//           <Route path="/forgot-password" element={<PasswordResetContainer />} />
//           <Route path="/reset-password-email-sent" element={<PasswordResetContainer />} />
//           <Route path="/auth/reset-password" element={<PasswordResetContainer />} />
//           <Route path="/reset-password-success" element={<PasswordResetContainer />} />
          
//           {/* Add settings page route */}
//           <Route path="/settings" element={<SettingsPage />} />
          
//           {/* VIN check page */}
//           <Route path="/vin" element={<VinCheckPage />} />
//           <Route path="/accredify" element={<Accredify />} />
//           <Route path="/status-tracker" element={<StatusTracker/>} />
//           <Route path="/tracking/:id" element={<TrackingDetails />} />

//           <Route path="/cart" element={<CartPage />} />
//           <Route path="/payment-method" element={<PaymentMethodPage />} />
//           <Route path="/certificate" element={<Certificate />} />
//           <Route path="/verify-certificate" element={<VerifyCertificatePage />} />
          
//           {/* Fallback route */}
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </Suspense>
//     </Router>
//   );
// };

// // Separate component for NIN verification modal logic
// /* 
// const NINVerificationCheck: React.FC = () => {
//   const [showNINModal, setShowNINModal] = React.useState(false);
//   const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

//   // Check for NIN verification status
//   React.useEffect(() => {
//     if (isAuthenticated && user && !user.NINVerified) {
//       // Show modal immediately if NIN isn't verified
//       const lastPrompt = localStorage.getItem('lastNINPrompt');
//       const now = Date.now();
      
//       if (!lastPrompt || now - parseInt(lastPrompt) > 1 * 60 * 1000) {
//         setShowNINModal(true);
//         localStorage.setItem('lastNINPrompt', now.toString());
//       }

//       // Set up periodic checks
//       const interval = setInterval(() => {
//         const lastPrompt = localStorage.getItem('lastNINPrompt');
//         const now = Date.now();
        
//         if (!lastPrompt || now - parseInt(lastPrompt) > 1 * 60 * 1000) {
//           setShowNINModal(true);
//           localStorage.setItem('lastNINPrompt', now.toString());
//         }
//       }, 1 * 60 * 1000);

//       return () => clearInterval(interval);
//     }
//   }, [isAuthenticated, user]);

//   return showNINModal ? (
//     <NINVerificationModal
//       isOpen={showNINModal}
//       onClose={() => setShowNINModal(false)}
//       onSuccess={() => {
//         setShowNINModal(false);
//       }}
//     />
//   ) : null;
// };
// */

// export default App;






import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/core/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Accredify from './app/pages/accredify';
import StatusTracker from './app/pages/status-tracker';
import TrackingDetails from './app/pages/status-tracker/tracking-details';
import PrivacyPolicy from './app/pages/Privacy';
import TermsAndConditions from './app/pages/Terms-and-Conditions';
import Faq from './app/pages/Faq';
import VerifyPayment from './app/modules/payment/components/modal/Verify-Payment';
import UserGuidePage from './app/pages/Guide';
import CookiePolicy from './app/pages/Cookie-Policy';
import Article from './app/modules/landing/components/layout/components/Articles';
// import SuccessPaymentPage from './app/modules/payment/components/modal/SuccessPaymentPage';
// import PaymentCallback from './app/modules/payment/components/modal/paymentCallback';

// Lazy load components
const Certificate = lazy(() => import('./app/modules/report/pages/CertificatePage'));
const VerifyCertificatePage = lazy(() => import('./app/modules/report/components/report/Certificate'));
const CartPage = lazy(() => import('./app/modules/cart').then(module => ({ default: module.CartPage })));
const PaymentMethodPage = lazy(() => import('./app/pages/payment/PaymentMethodPage'));
const Home = lazy(() => import('./app/pages/Home'));
const VinCheckPage = lazy(() => import('./app/pages/vin/VinCheckPage'));
const AccountType = lazy(() => import('./app/modules/auth/components/AccountTypeStep'));
const SignUpForm = lazy(() => import('./app/modules/auth/components/SignupForm'));
const Login = lazy(() => import('./app/modules/auth/components/Login'));
const OTPVerificationPage = lazy(() => import('./app/modules/auth/components/OTPVerificationPage'));
const PasswordResetContainer = lazy(() => import('./app/modules/auth/components/PasswordResetContainer'));
// Add Settings page
const SettingsPage = lazy(() => import('./app/pages/profilemanagement/SettingsPage'));

// Loading component
const LoadingFallback = () => <div className="flex h-screen items-center justify-center">Loading...</div>;

// Hash scroll handler component
const ScrollToHashElement = () => {
  const location = useLocation();

  useEffect(() => {
    // If there's a hash in the URL
    if (location.hash) {
      // Remove the leading # character
      const elementId = location.hash.substring(1);
      
      // Find the element and scroll to it
      const element = document.getElementById(elementId);
      if (element) {
        // Small timeout to ensure the page is loaded
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 200);
      }
    } else {
      // No hash - scroll to top on route change
      window.scrollTo(0, 0);
    }
  }, [location]);

  return null; // This component doesn't render anything
};

// Main App component that doesn't use Redux hooks
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

// Inner component that uses Redux hooks
const AppContent: React.FC = () => {
  return (
    <Router>
      {/* Hash scroll handler */}
      <ScrollToHashElement />
      
      {/* Toast container for notifications */}
      <ToastContainer position="bottom-right" autoClose={5000} />
      
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={< TermsAndConditions/>} />
          <Route path="/faq" element={< Faq/>} />
          <Route path="/user-guide" element={<UserGuidePage/>} />
          <Route path="/cookie-policy" element={<CookiePolicy/>} />
          <Route path="/accredited-agencies" element={<Article/>} /> 

          

          <Route path="/account-type" element={<AccountType />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/verify-otp" element={<OTPVerificationPage />} />
          <Route path="/login" element={<Login />} />
          
          {/* Password reset flow */}
          <Route path="/forgot-password" element={<PasswordResetContainer />} />
          <Route path="/reset-password-email-sent" element={<PasswordResetContainer />} />
          <Route path="/auth/reset-password" element={<PasswordResetContainer />} /> 
          <Route path="/auth/reset-password/:uidb64/:token" element={<PasswordResetContainer />} />
          <Route path="/reset-password-success" element={<PasswordResetContainer />} />
          
          {/* Add settings page route */}
          <Route path="/settings" element={<SettingsPage />} />
          
          {/* Landing page which may contain the how-it-works section */}
          <Route path="/landing-page" element={<Home />} />

          {/* VIN check page */}
          <Route path="/vin" element={<VinCheckPage />} />
          <Route path="/accredify" element={<Accredify />} />
          <Route path="/status-tracker" element={<StatusTracker />} />
          <Route path="/tracking/:id" element={<TrackingDetails />} />

          <Route path="/privacy" element={<PrivacyPolicy />} />

          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment-method" element={<PaymentMethodPage />} />
          <Route path="/certificate" element={<Certificate />} />
          <Route path="/verify-certificate" element={<VerifyCertificatePage />} />
          <Route path="/verifypayment" element={<VerifyPayment/>} />
          {/*<Route path="/paymentcallback" element={<PaymentCallback/>} />
          <Route path="/success" element={<SuccessPaymentPage/>} />  */}




          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;