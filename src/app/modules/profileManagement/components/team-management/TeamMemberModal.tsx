// import React, { useState, useEffect } from 'react';
// import { FiX } from 'react-icons/fi';
// import { TeamMember } from '../../types';

// interface TeamMemberModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (member: Omit<TeamMember, 'id' | 'initials' | 'status' | 'lastLogin'>) => void;
//   editMember?: TeamMember;
//   mode: 'add' | 'edit' | 'view';
// }

// const TeamMemberModal: React.FC<TeamMemberModalProps> = ({ 
//   isOpen, 
//   onClose, 
//   onSubmit, 
//   editMember,
//   mode
// }) => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone_number: '',
//     role: 'Team Member'
//   });

//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (editMember && (mode === 'edit' || mode === 'view')) {
//       // Split the name into first and last name
//       const nameParts = editMember.name.split(' ');
//       const firstName = nameParts[0] || '';
//       const lastName = nameParts.slice(1).join(' ') || '';
      
//       setFormData({
//         firstName,
//         lastName,
//         email: editMember.email,
//         phone_number: editMember.phone_number || '',
//         role: editMember.role
//       });
//     } else {
//       // Reset form when opening for add
//       setFormData({
//         firstName: '',
//         lastName: '',
//         email: '',
//         phone_number: '',
//         role: 'Team Member'
//       });
//     }
//   }, [editMember, isOpen, mode]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
    
//     try {
//       // Combine first and last name for local state
//       const memberData = {
//         name: `${formData.firstName} ${formData.lastName}`.trim(),
//         email: formData.email,
//         phone_number: formData.phone_number,
//         role: formData.role
//       };
      
//       await onSubmit(memberData);
//       onClose();
//     } catch (err: unknown) {
//       let errorMessage = 'Failed to save team member';
//       if (err instanceof Error) {
//         errorMessage = err.message;
//       } else if (typeof err === 'string') {
//         errorMessage = err;
//       }
//       setError(errorMessage);
//     }
//   };

//   if (!isOpen) return null;

//   const isViewMode = mode === 'view';
//   const title = mode === 'add' ? 'Add Team Member' : mode === 'edit' ? 'Edit Team Member' : 'View Team Member';

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg w-full max-w-md p-4 sm:p-6 relative overflow-y-auto max-h-[90vh]">
//         <button 
//           onClick={onClose}
//           className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700"
//           aria-label="Close modal"
//         >
//           <FiX size={24} />
//         </button>
        
//         <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 pr-8">{title}</h2>
        
//         <form onSubmit={handleSubmit}>
//           <div className="space-y-3 sm:space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
//               <input
//                 type="text"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 className="w-full py-2 px-3 sm:px-4 border border-gray-300 rounded-md bg-[#F5F7FA]"
//                 required
//                 disabled={isViewMode}
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
//               <input
//                 type="text"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 className="w-full py-2 px-3 sm:px-4 border border-gray-300 rounded-md bg-[#F5F7FA]"
//                 required
//                 disabled={isViewMode}
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full py-2 px-3 sm:px-4 border border-gray-300 rounded-md bg-[#F5F7FA]"
//                 required
//                 disabled={isViewMode}
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//               <input
//                 type="text"
//                 name="phone_number"
//                 value={formData.phone_number}
//                 onChange={handleChange}
//                 className="w-full py-2 px-3 border rounded-md bg-[#F5F7FA]"
//                 required
//                 disabled={isViewMode}
//               />
//             </div>
            
//             {/* Role selector can be uncommented and made responsive if needed */}
//             {/* <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
//               <select
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 className="w-full py-2 px-3 sm:px-4 border border-gray-300 rounded-md bg-[#F5F7FA]"
//                 disabled={isViewMode}
//               >
//                 <option value="Administrator">Administrator</option>
//                 <option value="Team Member">Team Member</option>
//                 <option value="Manager">Manager</option>
//               </select>
//             </div> */}
//           </div>
          
//           {error && (
//             <div className="mt-4 text-red-500 text-sm">
//               {error}
//             </div>
//           )}
          
//           <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row sm:justify-end sm:space-x-3 space-y-2 sm:space-y-0">
//             <button
//               type="button"
//               onClick={onClose}
//               className="w-full sm:w-auto px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 order-2 sm:order-1"
//             >
//               Cancel
//             </button>
            
//             {!isViewMode && (
//               <button
//                 type="submit"
//                 className="w-full sm:w-auto px-4 py-2 bg-green-500 text-black rounded-md hover:bg-green-600 transition order-1 sm:order-2"
//               >
//                 {mode === 'add' ? 'Create Member' : 'Save Changes'}
//               </button>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default TeamMemberModal;





import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiX } from 'react-icons/fi';
import { TeamMember } from '../../types';
import { createSubAccount } from '../../redux/actions';


interface TeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (member: Omit<TeamMember, 'id' | 'initials' | 'status' | 'lastLogin'>) => void;
  editMember?: TeamMember;
  mode: 'add' | 'edit' | 'view';
}

// Define the shape of your Redux state - adjust according to your actual state structure
interface RootState {
  settings: {
    createSubAccountError: string | null;
    createSubAccountLoading: boolean;
    // ... other state properties
  };
}

const TeamMemberModal: React.FC<TeamMemberModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  editMember,
  mode
}) => {
  const dispatch = useDispatch();
  
  // Get error and loading state from Redux
  const { createSubAccountError, createSubAccountLoading } = useSelector((state: RootState) => ({
    createSubAccountError: state.settings.createSubAccountError,
    createSubAccountLoading: state.settings.createSubAccountLoading
  }));

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone_number: '',
    role: 'Team Member'
  });

  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (editMember && (mode === 'edit' || mode === 'view')) {
      // Split the name into first and last name
      const nameParts = editMember.name.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      setFormData({
        firstName,
        lastName,
        email: editMember.email,
        phone_number: editMember.phone_number || '',
        role: editMember.role
      });
    } else {
      // Reset form when opening for add
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone_number: '',
        role: 'Team Member'
      });
    }
    
    // Clear local error when modal opens/closes
    setLocalError(null);
  }, [editMember, isOpen, mode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors when user starts typing
    setLocalError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    
    try {
      if (mode === 'add') {
        // For new members, use Redux action directly
        const subAccountData = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone_number: formData.phone_number,
          role: formData.role
        };
        
        await dispatch(createSubAccount(subAccountData) as any);
        onClose();
      } else {
        // For edit mode, use the existing onSubmit prop
        const memberData = {
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone_number: formData.phone_number,
          role: formData.role
        };
        
        await onSubmit(memberData);
        onClose();
      }
    } catch (err: unknown) {
      // This will catch any errors not handled by Redux
      let errorMessage = 'Failed to save team member';
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'string') {
        errorMessage = err;
      }
      setLocalError(errorMessage);
    }
  };

  if (!isOpen) return null;

  const isViewMode = mode === 'view';
  const title = mode === 'add' ? 'Add Team Member' : mode === 'edit' ? 'Edit Team Member' : 'View Team Member';
  
  // Show Redux error for create operations, local error for others
  const displayError = mode === 'add' ? createSubAccountError : localError;
  const isLoading = mode === 'add' ? createSubAccountLoading : false;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 pt-24">
      <div className="bg-white rounded-lg w-full max-w-md p-4 sm:p-6 relative overflow-y-auto max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
          disabled={isLoading}
        >
          <FiX size={24} />
        </button>
        
        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 pr-8">{title}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-3 sm:space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full py-2 px-3 sm:px-4 border border-gray-300 rounded-md bg-[#F5F7FA]"
                required
                disabled={isViewMode || isLoading}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full py-2 px-3 sm:px-4 border border-gray-300 rounded-md bg-[#F5F7FA]"
                required
                disabled={isViewMode || isLoading}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full py-2 px-3 sm:px-4 border border-gray-300 rounded-md bg-[#F5F7FA]"
                required
                disabled={isViewMode || isLoading}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="w-full py-2 px-3 border rounded-md bg-[#F5F7FA]"
                required
                disabled={isViewMode || isLoading}
              />
            </div>
            
            {/* Role selector can be uncommented and made responsive if needed */}
            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full py-2 px-3 sm:px-4 border border-gray-300 rounded-md bg-[#F5F7FA]"
                disabled={isViewMode || isLoading}
              >
                <option value="Administrator">Administrator</option>
                <option value="Team Member">Team Member</option>
                <option value="Manager">Manager</option>
              </select>
            </div> */}
          </div>
          
          {displayError && (
  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
    <div className="flex">
      <div className="flex-shrink-0">
        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="ml-3">
        <h3 className="text-sm font-medium text-red-800">
          {mode === 'add' ? 'Failed to create team member' : 'Failed to update team member'}
        </h3>
        <div className="mt-2 text-sm text-red-700">
          <p>{displayError}</p>
        </div>
      </div>
    </div>
  </div>
)}
          
          <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row sm:justify-end sm:space-x-3 space-y-2 sm:space-y-0">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 order-2 sm:order-1"
              disabled={isLoading}
            >
              Cancel
            </button>
            
            {!isViewMode && (
              <button
                type="submit"
                className="w-full sm:w-auto px-4 py-2 bg-green-500 text-black rounded-md hover:bg-green-600 transition order-1 sm:order-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </>
                ) : (
                  mode === 'add' ? 'Create Member' : 'Save Changes'
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeamMemberModal;