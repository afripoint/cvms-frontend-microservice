import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiX, FiAlertCircle } from 'react-icons/fi';
import { TeamMember } from '../../types';
import { createSubAccount } from '../../redux/actions';

interface TeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (member: Omit<TeamMember, 'id' | 'initials' | 'status' | 'lastLogin'>) => void;
  editMember?: TeamMember;
  mode: 'add' | 'edit' | 'view';
}

interface RootState {
  settings: {
    errors: {
      createSubAccount: string | null;
    };
    loading: {
      creatingSubAccount: boolean;
    };
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
  
  // Get loading state from Redux (but not error state)
  const { createSubAccountLoading } = useSelector((state: RootState) => ({
    createSubAccountLoading: state.settings.loading.creatingSubAccount
  }));

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone_number: '',
    role: 'Team Member'
  });

  const [apiError, setApiError] = useState<string | null>(null);

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
    
    // Clear API errors when modal opens/closes
    setApiError(null);
  }, [editMember, isOpen, mode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors when user starts typing
    setApiError(null);
  };

  // const formatApiError = (error: any): string => {
  //   // Check if it's an Axios error with response data
  //   if (error?.response?.data) {
  //     const errorData = error.response.data;
      
  //     // Handle different API error response formats
  //     if (typeof errorData === 'string') {
  //       // Simple string error
  //       return errorData;
  //     } else if (errorData.message) {
  //       // Error with message field: { message: "error text" }
  //       return errorData.message;
  //     } else if (errorData.detail) {
  //       // Django REST Framework style: { detail: "error text" }
  //       return errorData.detail;
  //     } else if (errorData.error) {
  //       // Generic error field: { error: "error text" }
  //       return errorData.error;
  //     } else if (typeof errorData === 'object') {
  //       // Field validation errors: { "email": ["Invalid email"], "phone": ["Required"] }
  //       const fieldErrors: string[] = [];
        
  //       Object.entries(errorData).forEach(([field, messages]) => {
  //         if (Array.isArray(messages)) {
  //           messages.forEach((msg: any) => {
  //             if (typeof msg === 'string') {
  //               fieldErrors.push(`${field.charAt(0).toUpperCase() + field.slice(1)}: ${msg}`);
  //             }
  //           });
  //         } else if (typeof messages === 'string') {
  //           fieldErrors.push(`${field.charAt(0).toUpperCase() + field.slice(1)}: ${messages}`);
  //         }
  //       });
        
  //       if (fieldErrors.length > 0) {
  //         return fieldErrors.join('. ');
  //       }
  //     }
  //   } else if (error?.response?.status) {
  //     // Handle HTTP status codes when no detailed error message is available
  //     switch (error.response.status) {
  //       case 400:
  //         return "Invalid data provided. Please check your input.";
  //       case 401:
  //         return "Authentication failed. Please log in again.";
  //       case 403:
  //         return "You do not have permission to create sub-accounts.";
  //       case 409:
  //         return "A conflict occurred. This account may already exist.";
  //       case 422:
  //         return "Validation failed. Please check your input data.";
  //       case 500:
  //         return "Server error occurred. Please try again later.";
  //       default:
  //         return `Request failed with status ${error.response.status}`;
  //     }
  //   } else if (error?.message) {
  //     // Use the error message if available
  //     return error.message;
  //   }

  //   return "An unexpected error occurred. Please try again.";
  // };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setApiError(null);
  
  try {
    if (mode === 'add') {
      const subAccountData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone_number: formData.phone_number,
        role: formData.role
      };
      
      const res = await dispatch(createSubAccount(subAccountData) as any);
      console.log(res)
      onClose();
    } else {
      const memberData = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone_number: formData.phone_number,
        role: formData.role
      };
      
      await onSubmit(memberData);
      onClose();
    }
  } catch (error: any) {
    console.log("Complete error object:", error);
    console.log("Response data:", error?.response?.data);
    
    // Directly access the phone_number error if it exists
    if (error?.response?.data?.phone_number) {
      setApiError(error.response.data.phone_number[0]);
    } 
    // Handle case where error is in the detail field
    else if (error?.response?.data?.detail) {
      setApiError(error.response.data.detail);
    }
    // Handle case where error is in the message field
    else if (error?.response?.data?.message) {
      setApiError(error.response.data.message);
    }
    // Handle string error directly
    else if (typeof error?.response?.data === 'string') {
      setApiError(error.response.data);
    }
    // Fallback to the error message
    else {
      setApiError(error?.message || "Failed to create sub-account");
    }
  }
};

  if (!isOpen) return null;

  const isViewMode = mode === 'view';
  const title = mode === 'add' ? 'Add Team Member' : mode === 'edit' ? 'Edit Team Member' : 'View Team Member';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 pt-24">
      <div className="bg-white rounded-lg w-full max-w-md p-4 sm:p-6 relative overflow-y-auto max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
          disabled={createSubAccountLoading}
        >
          <FiX size={24} />
        </button>
        
        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 pr-8">{title}</h2>
        
        {/* API Error Display - Show formatted API error message */}
        {apiError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <FiAlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <div className="text-sm text-red-700">
                  <p>{apiError}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
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
                disabled={isViewMode || createSubAccountLoading}
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
                disabled={isViewMode || createSubAccountLoading}
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
                disabled={isViewMode || createSubAccountLoading}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="w-full py-2 px-3 border border-gray-300 rounded-md bg-[#F5F7FA]"
                required
                disabled={isViewMode || createSubAccountLoading}
              />
            </div>
          </div>
          
          <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row sm:justify-end sm:space-x-3 space-y-2 sm:space-y-0">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 order-2 sm:order-1"
              disabled={createSubAccountLoading}
            >
              Cancel
            </button>
            
            {!isViewMode && (
              <button
                type="submit"
                className="w-full sm:w-auto px-4 py-2 bg-green-500 text-black rounded-md hover:bg-green-600 transition order-1 sm:order-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                disabled={createSubAccountLoading}
              >
                {createSubAccountLoading ? (
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