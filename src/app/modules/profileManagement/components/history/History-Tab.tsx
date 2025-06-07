// import { useSelector } from 'react-redux';
// import { selectHistoryData } from '../../redux/selectors';
// import HistoryItem from './HistoryItem';


// const HistoryTab = () => {
//   const historyData = useSelector(selectHistoryData);

//   return (
//     <div className="py-4 sm:py-6 px-3 sm:px-4">
//       <div className="max-w-2xl mx-auto w-full">
//         <h3 className="text-base sm:text-lg font-medium mb-4 sm:mb-6 border-b-2 border-black w-28 sm:w-36 pb-1 sm:pb-2">
//           Search History
//         </h3>
        
//         <div className="space-y-3 sm:space-y-4">
//           {historyData.length > 0 ? (
//             historyData.map(item => (
//               <HistoryItem key={item.vin} item={item} />
//             ))
//           ) : (
//             <p className="text-gray-500 text-sm">No history found</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HistoryTab;



import { useSelector } from 'react-redux';
import { selectHistoryData, selectActiveTab } from '../../redux/selectors';
import HistoryItem from './HistoryItem';
import { useEffect } from 'react';
import { fetchHistory } from '../../redux/actions';
import { useAppDispatch } from '../../../../core/store/hooks';

const HistoryTab = () => {
  const historyData = useSelector(selectHistoryData);
  const activeTab = useSelector(selectActiveTab);
  const dispatch = useAppDispatch(); // Use typed dispatch

  useEffect(() => {
    if (activeTab === 'History') {
      dispatch(fetchHistory());
    }
  }, [activeTab, dispatch]);

  return (
    <div className="py-4 sm:py-6 px-3 sm:px-4">
      <div className="max-w-2xl mx-auto w-full">
        <h3 className="text-base sm:text-lg font-medium mb-4 sm:mb-6 border-b-2 border-black w-28 sm:w-36 pb-1 sm:pb-2">
          Search History
        </h3>
        
        <div className="space-y-3 sm:space-y-4">
          {historyData.length > 0 ? (
            historyData.map(item => (
              <HistoryItem key={`${item.vin}-${item.created_at}`} item={item} />
            ))
          ) : (
            <p className="text-gray-500 text-sm">No history found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryTab;