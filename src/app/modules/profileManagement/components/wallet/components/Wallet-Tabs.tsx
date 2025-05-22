import { useSelector } from 'react-redux';
import WalletCard from './WalletCard';
import { selectWalletData } from '../../../redux/selectors';
import TransactionItem from '../../transactions/TransactionItem';

const WalletTab = () => {
  const walletData = useSelector(selectWalletData);

  return (
    <div className="py-4 sm:py-6 px-3 sm:px-4">
      <WalletCard 
        tier={walletData.tier}
        balance={walletData.balance}
        vinSearches={walletData.vinSearches}
        vinSearchLimit={walletData.vinSearchLimit}
      />
      
      <div className="w-full max-w-md mx-auto">
        <h3 className="text-sm sm:text-md font-medium mb-4 sm:mb-6 border-black border-b-2 text-black w-36 sm:w-44 pb-1 sm:pb-2">
          Recent Transactions
        </h3>
        
        <div className="w-full">
          {walletData.transactions.length > 0 ? (
            walletData.transactions.map(transaction => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))
          ) : (
            <p className="text-gray-500 text-sm">No recent transactions</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletTab;