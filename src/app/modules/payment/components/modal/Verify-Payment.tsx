import React, { useState } from 'react';

interface VerifyPaymentProps {
  onVerify?: () => void;
}

const VerifyPayment: React.FC<VerifyPaymentProps> = ({ onVerify }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const handleVerify = async (): Promise<void> => {
    setIsLoading(true);
    
    // Simulate verification process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setIsVerified(true);
    
    // Call optional callback
    if (onVerify) {
      onVerify();
    }
    
    // Reset state after 3 seconds
    setTimeout(() => {
      setIsVerified(false);
    }, 3000);
  };

  const getButtonText = (): string => {
    if (isLoading) return 'Verifying...';
    if (isVerified) return '✓ Verified';
    return 'Verify';
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
          Verification Required
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 mb-10 leading-relaxed">
          Please click the button below to verify your identity and continue with the process.
        </p>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={isLoading}
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
      </div>

      
    </div>
  );
};

export default VerifyPayment;