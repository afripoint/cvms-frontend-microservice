import React from 'react';
import { FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { TeamMember } from '../../types';

interface TeamMemberRowProps {
  member: TeamMember;
  onEdit: (member: TeamMember) => void;
  onDelete: (member: TeamMember) => void; // Changed from (id: number) => void
  onView: (member: TeamMember) => void;
}

const TeamMemberRow: React.FC<TeamMemberRowProps> = ({ 
  member, 
  onEdit, 
  onDelete, 
  onView 
}) => {
  return (
    <tr className="border-t border-gray-200">
      <td className="py-3 sm:py-4 px-2 sm:px-4">
        <div className="flex items-center">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-purple-200 flex items-center justify-center mr-2 sm:mr-3 text-purple-600 font-medium text-xs sm:text-sm">
            {member.initials || member.name.split(' ').map((n: string) => n[0]).join('')}
          </div>
          <span className="text-sm sm:text-base truncate max-w-[100px] sm:max-w-none">{member.name}</span>
        </div>
      </td>
      <td className="py-3 sm:py-4 px-2 sm:px-6 text-gray-600 text-xs sm:text-sm">
        <span className="truncate block max-w-[100px] sm:max-w-[200px] md:max-w-none">{member.email}</span>
      </td>
      {/* <td className="hidden md:table-cell py-4 px-6 text-gray-600">{member.role}</td>*/}
      <td className="lg:table-cell py-4 px-6 text-gray-600">{member.phone_number}</td> 
      <td className="hidden sm:table-cell py-3 sm:py-4 px-2 sm:px-6 text-gray-600 text-xs sm:text-sm">{member.lastLogin || 'Never'}</td>
      <td className="py-3 sm:py-4 px-2 sm:px-6">
        <span className={`inline-flex items-center ${
          member.status === 'Active' 
            ? 'bg-green-100 text-green-600' 
            : 'bg-gray-100 text-gray-600'
          } text-xs px-2 sm:px-3 py-1 rounded-full`}>
          • {member.status}
        </span>
      </td>
      <td className="py-3 sm:py-4 px-2 sm:px-4">
        <div className="flex space-x-1 sm:space-x-2">
          <button 
            className="text-gray-600 hover:text-gray-900 p-1 sm:p-2 rounded-md hover:bg-gray-100"
            onClick={() => onView(member)}
            title="View details"
            aria-label="View member details"
          >
            <FiEye size={14} className="sm:hidden" />
            <FiEye size={16} className="hidden sm:block" />
          </button>
          <button 
            className="text-gray-600 hover:text-gray-900 p-1 sm:p-2 rounded-md hover:bg-gray-100"
            onClick={() => onEdit(member)}
            title="Edit member"
            aria-label="Edit member"
          >
            <FiEdit2 size={14} className="sm:hidden" />
            <FiEdit2 size={16} className="hidden sm:block" />
          </button>
          {/* <button 
            className="text-red-500 hover:text-red-700 p-1 sm:p-2 rounded-md hover:bg-red-100"
            onClick={() => onDelete(member.id)}
            title="Deactivate member"
            aria-label="Deactivate member"
          >
            <FiTrash2 size={14} className="sm:hidden" />
            <FiTrash2 size={16} className="hidden sm:block" />
          </button> */}

          {/* <button 
            className="text-red-500 hover:text-red-700 p-1 sm:p-2 rounded-md hover:bg-red-100"
            onClick={() => onDelete(member)} // Passing the full member object
            title={member.status === 'Active' ? 'Deactivate member' : 'Activate member'}
            aria-label={member.status === 'Active' ? 'Deactivate member' : 'Activate member'}
          >
            <FiTrash2 size={14} className="sm:hidden" />
            <FiTrash2 size={16} className="hidden sm:block" />
          </button> */}

          <button 
            className={`p-1 sm:p-2 rounded-md hover:bg-opacity-80 ${
              member.status === 'Active' 
                ? 'text-red-500 hover:bg-red-100' 
                : 'text-green-600 hover:bg-green-100'
            }`}
            onClick={() => onDelete(member)}
            title={member.status === 'Active' ? 'Deactivate member' : 'Activate member'}
            aria-label={member.status === 'Active' ? 'Deactivate member' : 'Activate member'}
          >
            <FiTrash2 size={14} className="sm:hidden" />
            <FiTrash2 size={16} className="hidden sm:block" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TeamMemberRow;