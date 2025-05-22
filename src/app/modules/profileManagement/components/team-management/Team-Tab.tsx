import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { addTeamMember, updateTeamMember, deleteTeamMember } from '../../redux/actions';
import { selectTeamsData } from '../../redux/selectors';
import TeamMemberRow from './TeamMemberRow';
import TeamMemberModal from './TeamMemberModal';
import TeamMemberView from './TeamMemberView';
import { TeamMember } from '../../types';

const TeamsTab = () => {
  const dispatch = useDispatch();
  const teamsData = useSelector(selectTeamsData);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view'>('add');
  const [currentMember, setCurrentMember] = useState<TeamMember | undefined>(undefined);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const openAddModal = () => {
    setModalMode('add');
    setCurrentMember(undefined);
    setIsModalOpen(true);
  };

  const openEditModal = (member: TeamMember) => {
    setModalMode('edit');
    setCurrentMember(member);
    setIsModalOpen(true);
  };

  const openViewModal = (member: TeamMember) => {
    setCurrentMember(member);
    setIsViewModalOpen(true);
  };

  const handleAddMember = (memberData: Omit<TeamMember, 'id' | 'initials' | 'status' | 'lastLogin'>) => {
    const newMember = {
      ...memberData,
      status: 'Active',
      lastLogin: 'Never'
    };
    
    dispatch(addTeamMember(newMember));
  };

  const handleUpdateMember = (memberData: Omit<TeamMember, 'id' | 'initials' | 'status' | 'lastLogin'>) => {
    if (currentMember) {
      const updatedMember: TeamMember = {
        ...currentMember,
        ...memberData
      };
      
      dispatch(updateTeamMember(updatedMember));
    }
  };

  const handleDeleteMember = (id: number) => {
    setConfirmDeleteId(id);
  };

  const confirmDelete = () => {
    if (confirmDeleteId !== null) {
      dispatch(deleteTeamMember(confirmDeleteId));
      setConfirmDeleteId(null);
    }
  };

  const handleSubmit = (memberData: Omit<TeamMember, 'id' | 'initials' | 'status' | 'lastLogin'>) => {
    if (modalMode === 'add') {
      handleAddMember(memberData);
    } else if (modalMode === 'edit') {
      handleUpdateMember(memberData);
    }
  };

  const filteredMembers = teamsData.filter(member => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      member.name.toLowerCase().includes(searchLower) ||
      member.email.toLowerCase().includes(searchLower) ||
      member.role.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="py-4 sm:py-6 max-w-full">
      <div className="max-w-full mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
          {/* Search input for mobile and desktop */}
          <div className="relative w-full sm:max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-[#F5F7FA] text-sm"
            />
          </div>
          
          <button 
            className="flex items-center px-4 py-2 bg-green-500 text-black rounded-md hover:bg-green-600 transition w-full sm:w-auto justify-center sm:justify-start text-sm"
            onClick={openAddModal}
          >
            <FiPlus className="mr-2" /> Create New Member
          </button>
        </div>
        
        {/* Table wrapper with horizontal scroll for mobile */}
        <div className="bg-white rounded-lg overflow-x-auto border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left py-3 sm:py-4 px-2 sm:px-6 text-gray-600 font-medium text-xs sm:text-sm">Name</th>
                <th className="text-left py-3 sm:py-4 px-2 sm:px-6 text-gray-600 font-medium text-xs sm:text-sm">Email</th>
                {/* <th className="hidden md:table-cell text-left py-4 px-6 text-gray-600 font-medium text-sm">Role</th>
                <th className="hidden lg:table-cell text-left py-4 px-6 text-gray-600 font-medium text-sm">Phone</th> */}
                <th className="hidden sm:table-cell text-left py-3 sm:py-4 px-2 sm:px-6 text-gray-600 font-medium text-xs sm:text-sm">Last Login</th>
                <th className="text-left py-3 sm:py-4 px-2 sm:px-6 text-gray-600 font-medium text-xs sm:text-sm">Status</th>
                <th className="text-left py-3 sm:py-4 px-2 sm:px-6 text-gray-600 font-medium text-xs sm:text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.length > 0 ? (
                filteredMembers.map(member => (
                  <TeamMemberRow 
                    key={member.id} 
                    member={member} 
                    onEdit={openEditModal}
                    onDelete={handleDeleteMember}
                    onView={openViewModal}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-gray-500 text-sm">
                    {searchTerm ? "No members match your search" : "No team members found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Member Modal */}
        <TeamMemberModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          editMember={currentMember}
          mode={modalMode}
        />
        
        {/* View Member Modal */}
        {isViewModalOpen && currentMember && (
          <TeamMemberView 
            member={currentMember}
            onClose={() => setIsViewModalOpen(false)}
          />
        )}
        
        {/* Delete Confirmation Modal */}
        {confirmDeleteId !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-4 sm:p-6 max-w-sm w-full">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Confirm Delete</h2>
              <p className="mb-4 sm:mb-6 text-sm sm:text-base">Are you sure you want to delete this team member? This action cannot be undone.</p>
              
              <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                <button
                  onClick={() => setConfirmDeleteId(null)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 order-2 sm:order-1 text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 order-1 sm:order-2 text-sm sm:text-base"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamsTab;