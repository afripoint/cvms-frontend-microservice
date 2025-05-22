// import { Transaction } from "../../types";


// interface TransactionItemProps {
//   transaction: Transaction;
// }

// const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
//   return (
//     <div className="flex justify-between items-center p-6 border-b bg-gray-50 rounded-lg mb-4">
//       <div>
//         <h4 className="font-medium">{transaction.type}</h4>
//         <div className="text-gray-500 text-sm">
//           {transaction.amount} • {transaction.date}
//         </div>
//       </div>
//       <div>
//         {transaction.status === 'Successful' ? (
//           <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">
//             • Successful
//           </span>
//         ) : (
//           <span className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full">
//             • Failed
//           </span>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TransactionItem;



import { Transaction } from "../../types";


interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-6 border-b bg-gray-50 rounded-lg mb-3 sm:mb-4">
      <div className="mb-2 sm:mb-0">
        <h4 className="font-medium text-sm sm:text-base">{transaction.type}</h4>
        <div className="text-gray-500 text-xs sm:text-sm">
          {transaction.amount} • {transaction.date}
        </div>
      </div>
      <div className="self-start sm:self-auto">
        {transaction.status === 'Successful' ? (
          <span className="bg-green-100 text-green-600 text-xs px-2 sm:px-3 py-1 rounded-full">
            • Successful
          </span>
        ) : (
          <span className="bg-red-100 text-red-600 text-xs px-2 sm:px-3 py-1 rounded-full">
            • Failed
          </span>
        )}
      </div>
    </div>
  );
};

export default TransactionItem;