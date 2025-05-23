// import React from 'react';

// interface LoadingErrorComponentProps {
//   isLoading: boolean;
//   error: string | null;
//   onDismissError: () => void;
// }

// const LoadingErrorComponent: React.FC<LoadingErrorComponentProps> = ({ 
//   isLoading, 
//   error, 
//   onDismissError 
// }) => {
//   if (isLoading) {
//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//         <div className="bg-white p-6 rounded-lg shadow-lg text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Generating your certificate...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//         <div className="bg-white p-6 rounded-lg shadow-lg">
//           <h3 className="text-lg font-medium text-red-600 mb-2">Error</h3>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <div className="flex justify-end">
//             <button 
//               onClick={onDismissError}
//               className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
//             >
//               Dismiss
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return null;
// };

// export default LoadingErrorComponent;





import React from 'react';

interface LoadingErrorComponentProps {
  isLoading: boolean;
  error: string | null;
  onDismissError: () => void;
}

const LoadingErrorComponent: React.FC<LoadingErrorComponentProps> = ({ 
  isLoading, 
  error, 
  onDismissError 
}) => {
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-6 text-gray-700 font-medium">Generating your certificate...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
          <h3 className="text-lg font-semibold text-red-600 mb-3">Error</h3>
          <p className="text-gray-700 mb-6">{error}</p>
          <div className="flex justify-end">
            <button 
              onClick={onDismissError}
              className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 font-medium"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default LoadingErrorComponent;