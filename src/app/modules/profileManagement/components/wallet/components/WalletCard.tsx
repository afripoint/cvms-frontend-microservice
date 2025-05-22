interface WalletCardProps {
  tier: string;
  balance: string;
  vinSearches: number;
  vinSearchLimit: string;
}

const WalletCard: React.FC<WalletCardProps> = ({ 
  tier, 
  balance, 
  vinSearches, 
  vinSearchLimit 
}) => {
  return (
    <div className="bg-black rounded-lg p-4 sm:p-6 w-full max-w-md mx-auto mb-6 sm:mb-10">
      <div className="flex justify-between items-start mb-4 sm:mb-6">
        <div>
          <span className="text-white bg-gray-700 px-2 sm:px-3 py-1 rounded-full text-xs">
            {tier}
          </span>
          <div className="text-white text-xl sm:text-2xl font-bold mt-2 sm:mt-3">
            {balance}
          </div>
        </div>
        <div className="bg-gradient-to-r from-gray-800 to-black rounded-full h-8 w-8 sm:h-10 sm:w-10"></div>
      </div>
      <div className="flex items-center text-white text-xs sm:text-sm mt-4 sm:mt-6">
        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        <span>{vinSearches} VIN Searches</span>
        <span className="text-gray-400 text-xs ml-1">{vinSearchLimit}</span>
      </div>
    </div>
  );
};

export default WalletCard;