import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import SuccessPaymentModal from './SuccessPaymentModal';
import { addReport } from '../../../report/redux/slices/certificateSlice';

interface VerifyPaymentProps {
  onVerify?: () => void;
}

interface PaymentData {
  transactionId: string;
  transactionDate: string;
  paymentMethod: string;
  paymentState?: string;
  amount: number;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    type: string;
    vin?: string;
  }>;
  gateway: string;
}

interface PaymentDetails {
  transactionId: string;
  transactionDate: string;
  paymentMethod: string;
  paymentState?: string;
  amount: number;
  verificationStatus: "pending" | "verified" | "failed";
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    type: string;
    vin?: string;
  }>;
}

const VerifyPayment: React.FC<VerifyPaymentProps> = ({ onVerify }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  // const location = useLocation();
  // const {txnId} = location.state
  const urlParams = new URLSearchParams(window.location.search);
const reference = urlParams.get('reference');
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // API instance with token handling
  const getApiInstance = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    return axios.create({
      baseURL: 'https://cvms-staging.afripointdev.com/vin',
      headers: {
        'Authorization': token ? `Bearer ${token}` : undefined
      }
    });
  };

  // Load payment data from sessionStorage on component mount
  useEffect(() => {
    const storedPaymentData = sessionStorage.getItem('pendingPaymentVerification');
    if (storedPaymentData) {
      try {
        const parsedData: PaymentData = JSON.parse(storedPaymentData);
        setPaymentData(parsedData);
        console.log('Loaded payment data for verification:', parsedData);
      } catch (error) {
        console.error('Error parsing payment data:', error);
        toast.error('Invalid payment data. Redirecting to home.');
        navigate('/');
      }
    } else {
      console.log('No pending payment verification found. Redirecting to home.');
      navigate('/');
    }
  }, [navigate]);

  // console.log(reference)

  // Verify payment API call
  const verifyPayment = async (gateway: string) => {
    // console.log(txnId)
    // console.log(gateway)
    try {
      const api = getApiInstance();
      const response = await api.get(`/verify-one-time-payment/${reference}?payment_gateway=${gateway}`);
      return response.data;
    } catch (error) {
      console.error('Payment verification error:', error);
      throw new Error('Failed to verify payment');
    }
  };

  const handleVerify = async (): Promise<void> => {
    if (!paymentData) {
      toast.error('No payment data available for verification');
      return;
    }

    setIsLoading(true);
    
    try {
      console.log('Starting payment verification for:', paymentData.transactionId);
      
      // Call the verification API
      const verificationResult = await verifyPayment(paymentData.gateway);
      console.log('Verification result:', verificationResult);
      
      setIsLoading(false);
      setIsVerified(true);
      
      // Prepare payment details for success modal
      const successPaymentDetails: PaymentDetails = {
        transactionId: paymentData.transactionId,
        transactionDate: paymentData.transactionDate,
        paymentMethod: paymentData.paymentMethod,
        paymentState: paymentData.paymentState,
        amount: paymentData.amount,
        verificationStatus: "verified",
        items: paymentData.items
      };

      setPaymentDetails(successPaymentDetails);

      // Add reports to Redux store
      paymentData.items.forEach((item, index) => {
        if (item.vin || item.id.includes('vin')) {
          const vin = item.vin || `${index + 1}`;
          dispatch(addReport({
            id: Date.now() + index,
            title: item.name,
            vin,
            action: 'download',
            downloadUrl: `/api/reports/${paymentData.transactionId}/download`,
            isCertificate: true,
          }));
        }
      });
      
      // Call optional callback
      if (onVerify) {
        onVerify();
      }

      // Clear the stored payment data
      sessionStorage.removeItem('pendingPaymentVerification');
      
      // Show success modal after a brief delay
      setTimeout(() => {
        setShowSuccessModal(true);
      }, 1000);
      
    } catch (error) {
      console.error('Payment verification failed:', error);
      setIsLoading(false);
      
      // Prepare failed verification details
      const failedPaymentDetails: PaymentDetails = {
        transactionId: paymentData.transactionId,
        transactionDate: paymentData.transactionDate,
        paymentMethod: paymentData.paymentMethod,
        paymentState: paymentData.paymentState,
        amount: paymentData.amount,
        verificationStatus: "failed",
        items: paymentData.items
      };

      setPaymentDetails(failedPaymentDetails);
      
      toast.error('Payment verification failed. Please contact support.');
      
      // Show success modal even for failed verification (to show the failed status)
      setTimeout(() => {
        setShowSuccessModal(true);
      }, 1000);
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate('/'); // Navigate to home or appropriate page
  };

  const getButtonText = (): string => {
    if (isLoading) return 'Verifying...';
    if (isVerified) return '✓ Verified';
    return 'Verify Payment';
  };

  const getButtonClass = (): string => {
    const baseClass = 'px-12 py-4 text-lg font-semibold rounded-xl cursor-pointer transition-all duration-300 ease-in-out relative overflow-hidden shadow-lg';
    
    if (isLoading) {
      return `${baseClass} bg-green-600 text-white opacity-70 cursor-not-allowed`;
    }
    
    if (isVerified) {
      return `${baseClass} bg-green-700 text-white shadow-green-500/40`;
    }
    
    return `${baseClass} bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:shadow-green-500/50 hover:-translate-y-1 active:translate-y-0 shadow-green-500/40`;
  };

  return (
    <>
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="bg-gray-100 backdrop-blur-sm rounded-3xl p-12 text-center shadow-2xl border border-white/20 max-w-md w-full animate-fade-in">
          {/* Icon */}
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-500/30">
            <svg 
              className="w-10 h-10 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={3} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Payment Verification
          </h1>

          {/* Subtitle */}
          <p className="text-gray-600 mb-10 leading-relaxed">
            {paymentData ? (
              <>
                Please verify your payment of <strong>₦{paymentData.amount.toLocaleString()}</strong>
                <br />
                Transaction ID: <strong>{paymentData.transactionId}</strong>
              </>
            ) : (
              'Loading payment information...'
            )}
          </p>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={isLoading || !paymentData}
            className={getButtonClass()}
          >
            <span className="relative z-10">
              {getButtonText()}
            </span>
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </button>

          {/* Success Message */}
          {isVerified && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg animate-fade-in">
              <div className="flex items-center justify-center text-green-700 font-semibold">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Verification completed successfully!
              </div>
            </div>
          )}

          {/* Loading Spinner */}
          {isLoading && (
            <div className="mt-6 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            </div>
          )}

          {/* Cancel Button */}
          <div className="mt-6">
            <button
              onClick={() => navigate('/')}
              className="text-sm text-gray-600 hover:text-gray-800 underline"
              disabled={isLoading}
            >
              Cancel and Return Home
            </button>
          </div>
        </div>
      </div>

      {/* Success Payment Modal */}
      {showSuccessModal && paymentDetails && (
        <SuccessPaymentModal
          isOpen={showSuccessModal}
          onClose={handleModalClose}
          amount={paymentDetails.amount}
          transactionId={paymentDetails.transactionId}
          transactionDate={paymentDetails.transactionDate}
          paymentMethod={paymentDetails.paymentMethod}
          items={paymentDetails.items}
          verificationStatus={paymentDetails.verificationStatus}
        />
      )}
    </>
  );
};

export default VerifyPayment;