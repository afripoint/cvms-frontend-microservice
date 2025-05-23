import { FiX } from 'react-icons/fi';
import { TeamMember } from '../../types';

interface TeamMemberViewProps {
  member: TeamMember;
  onClose: () => void;
}

const TeamMemberView = ({ member, onClose }: TeamMemberViewProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold">Member Details</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            <FiX size={22} className="sm:hidden" />
            <FiX size={24} className="hidden sm:block" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-200 flex items-center justify-center mr-3 sm:mr-4 text-purple-600 font-medium text-lg sm:text-xl">
              {member.initials || member.name.split(' ').map(n => n[0]).join('')}
            </div>
            <h3 className="text-base sm:text-lg font-medium">{member.name}</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Email</p>
              <p className="font-medium text-sm sm:text-base break-words">{member.email}</p>
            </div>
            
            {member.phone && (
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Phone</p>
                <p className="font-medium text-sm sm:text-base">{member.phone}</p>
              </div>
            )}
            
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Role</p>
              <p className="font-medium text-sm sm:text-base">{member.role}</p>
            </div>
            
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Status</p>
              <p className="font-medium text-sm sm:text-base">{member.status}</p>
            </div>
            
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Last Login</p>
              <p className="font-medium text-sm sm:text-base">{member.lastLogin || 'Never'}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-5 sm:mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-green-500 text-black rounded-md hover:bg-green-600 transition text-sm sm:text-base"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberView;