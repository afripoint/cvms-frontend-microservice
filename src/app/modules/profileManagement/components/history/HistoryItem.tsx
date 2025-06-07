

import { HistoryItem as HistoryItemType } from '../../types/index';

interface HistoryItemProps {
  item: HistoryItemType;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ item }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 sm:p-4 border-b bg-gray-50 rounded-lg">
      <div className="mb-2 sm:mb-0">
        <h4 className="font-medium">{item.make}</h4>
        <div className="text-gray-500 text-xs sm:text-sm">
          {item.amount} • {item.date}
        </div>
      </div>
      <div className="self-start sm:self-auto">
        {item.status === 'Successful' ? (
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

export default HistoryItem;