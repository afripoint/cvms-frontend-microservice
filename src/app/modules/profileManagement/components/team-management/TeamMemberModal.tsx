import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { TeamMember } from '../../types';

interface TeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (member: Omit<TeamMember, 'id' | 'initials' | 'status' | 'lastLogin'>) => void;
  editMember?: TeamMember;
  mode: 'add' | 'edit' | 'view';
}

const TeamMemberModal: React.FC<TeamMemberModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  editMember,
  mode
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'Team Member'
  });

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
        phone: editMember.phone || '',
        role: editMember.role
      });
    } else {
      // Reset form when opening for add
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        role: 'Team Member'
      });
    }
  }, [editMember, isOpen, mode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Combine first and last name
    const memberData = {
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      phone: formData.phone,
      role: formData.role
    };
    
    onSubmit(memberData);
    onClose();
  };

  if (!isOpen) return null;

  const isViewMode = mode === 'view';
  const title = mode === 'add' ? 'Add Team Member' : mode === 'edit' ? 'Edit Team Member' : 'View Team Member';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-4 sm:p-6 relative overflow-y-auto max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
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
                disabled={isViewMode}
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
                disabled={isViewMode}
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
                disabled={isViewMode}
              />
            </div>
            
            {/* Phone number field can be uncommented and made responsive if needed */}
            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <div className="flex">
                <div className="w-1/4 sm:w-1/5">
                  <div className="flex items-center border border-gray-300 rounded-l-md px-2 sm:px-3 py-2">
                    <span className="text-green-500 text-sm sm:text-base">+234</span>
                  </div>
                </div>
                <div className="relative w-3/4 sm:w-4/5">
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full py-2 px-3 sm:px-4 border border-gray-300 rounded-r-md bg-[#F5F7FA]"
                    disabled={isViewMode}
                  />
                </div>
              </div>
            </div> */}
            
            {/* Role selector can be uncommented and made responsive if needed */}
            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full py-2 px-3 sm:px-4 border border-gray-300 rounded-md bg-[#F5F7FA]"
                disabled={isViewMode}
              >
                <option value="Administrator">Administrator</option>
                <option value="Team Member">Team Member</option>
                <option value="Manager">Manager</option>
              </select>
            </div> */}
          </div>
          
          <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row sm:justify-end sm:space-x-3 space-y-2 sm:space-y-0">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 order-2 sm:order-1"
            >
              Cancel
            </button>
            
            {!isViewMode && (
              <button
                type="submit"
                className="w-full sm:w-auto px-4 py-2 bg-green-500 text-black rounded-md hover:bg-green-600 transition order-1 sm:order-2"
              >
                {mode === 'add' ? 'submit' : 'Save Changes'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeamMemberModal;