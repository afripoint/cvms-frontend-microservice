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
import UserGuidePage from './app/pages/guides/page';
import AccreditedAgenciesPage from './app/modules/landing/components/layout/components/style-guide/Articles';
import FAQ from './app/pages/Faq';

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
          <Route path="/faq" element={<FAQ/>} />
          <Route path="/user-guide" element={<UserGuidePage />} />
          <Route path="/accredited-agencies" element={<AccreditedAgenciesPage/>} /> 
          

          <Route path="/account-type" element={<AccountType />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/verify-otp" element={<OTPVerificationPage />} />
          <Route path="/login" element={<Login />} />
          
          {/* Password reset flow */}
          <Route path="/forgot-password" element={<PasswordResetContainer />} />
          <Route path="/reset-password-email-sent" element={<PasswordResetContainer />} />
          <Route path="/auth/reset-password" element={<PasswordResetContainer />} />
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
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;