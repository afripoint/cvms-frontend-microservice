// // NINVerificationModal.tsx
// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';

// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { RootState } from '../../../core/store';
// import { verifyNIN } from '../../auth/redux/slices/authSlice';

// interface NINVerificationModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSuccess: () => void;
// }

// const NINVerificationModal: React.FC<NINVerificationModalProps> = ({ isOpen, onClose, onSuccess }) => {
//   const dispatch = useDispatch();
//   const user = useSelector((state: RootState) => state.auth.user);
//   const [nin, setNin] = useState(user?.NIN || '');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
    
//     try {
//       // @ts-ignore - We'll implement this action in authSlice
//       const result = await dispatch(verifyNIN({ nin, email: user?.email }));
      
//       if (verifyNIN.fulfilled.match(result)) {
//         // toast.success('NIN verification successful! Your account is now fully activated.');
//         toast.success('NIN verification successful! Your account is now fully activated.'); 
//         onSuccess();
//         onClose();
//       } else {
//         // toast.error(result.payload || 'NIN verification failed. Please try again.');
//         toast.error('NIN verification failed. Please try again.');
//       }
//     } catch (error) {
//       toast.error('An error occurred during NIN verification.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
//       <div className="bg-white rounded-lg shadow-xl w-96 p-6">
//         <h2 className="text-xl text-[#34C759] font-bold mb-4">NIN Verification Required</h2>
//         <p className="mb-4">
//           To activate your account and access all features, please verify your National Identification Number (NIN). 
//           This verification is required to ensure secure and compliant usage of the CVMS platform.
//         </p>
        
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="nin" className="block text-sm font-medium text-gray-700 mb-1">
//               National Identification Number (NIN)
//             </label>
//             <input
//               type="text"
//               id="nin"
//               value={nin}
//               onChange={(e) => setNin(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md"
//               placeholder="Enter your 11-digit NIN"
//               required
//               pattern="[0-9]{11}"
//               maxLength={11}
//             />
//           </div>
          
//           <div className="flex justify-end space-x-3">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//               disabled={isLoading}
//             >
//               Later
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-300"
//               disabled={isLoading || !nin}
//             >
//               {isLoading ? 'Verifying...' : 'Verify NIN'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default NINVerificationModal;