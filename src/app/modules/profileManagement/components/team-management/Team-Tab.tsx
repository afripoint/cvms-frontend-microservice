"use client"

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { FiPlus, FiSearch, FiLoader } from "react-icons/fi"
import { 
  addTeamMember, 
  updateTeamMember, 
  fetchSubAccounts,
  toggleSubAccountStatus,
  fetchSubAccountDetails
} from "../../redux/actions"
import { selectTeamsData } from "../../redux/selectors"
import TeamMemberRow from "./TeamMemberRow"
import TeamMemberModal from "./TeamMemberModal"
import TeamMemberView from "./TeamMemberView"
import type { TeamMember } from "../../types"

import { authService } from "../../../auth/services"
import type { RootState } from "../../../../core/store"
import type { ThunkDispatch } from "redux-thunk"
import type { AnyAction } from "redux"

type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>

const TeamsTab = () => {
  const dispatch = useDispatch<AppDispatch>()
  const teamsData = useSelector(selectTeamsData)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add")
  const [currentMember, setCurrentMember] = useState<TeamMember | undefined>(undefined)
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const isLoading = useSelector((state: RootState) => state.settings.loading.teamMembers)
  const error = useSelector((state: RootState) => state.settings.errors.teamMembers)
  const isCreatingSubAccount = useSelector((state: RootState) => state.settings.loading.creatingSubAccount)
  const isFetchingDetails = useSelector((state: RootState) => state.settings.loading.fetchingDetails)
  const fetchDetailsError = useSelector((state: RootState) => state.settings.errors.fetchDetails)
  const isTogglingStatus = useSelector((state: RootState) => state.settings.loading.togglingStatus);
const toggleError = useSelector((state: RootState) => state.settings.errors.toggleStatus);

  const openAddModal = () => {
    setModalMode("add")
    setCurrentMember(undefined)
    setIsModalOpen(true)
  }

  const openEditModal = (member: TeamMember) => {
    setModalMode("edit")
    setCurrentMember(member)
    setIsModalOpen(true)
  }

  const openViewModal = async (member: TeamMember) => {
    try {
      console.log("Opening view modal for member:", member)
      
      // Check if member has a slug
      if (!member.slug) {
        console.error("Cannot fetch member details: Missing slug")
        // Fallback to using the existing member data
        setCurrentMember(member)
        setIsViewModalOpen(true)
        return
      }
      
      setCurrentMember(undefined) // Clear current member while loading
      setIsViewModalOpen(true) // Show modal immediately with loading state
      
      // Dispatch the action to fetch member details
      console.log("Dispatching fetchSubAccountDetails with slug:", member.slug)
      const memberDetails = await dispatch(fetchSubAccountDetails(member.slug))
      console.log("Received member details:", memberDetails)
      
      setCurrentMember(memberDetails.payload)
    } catch (error) {
      console.error("Failed to fetch member details:", error)
      // Fallback to using the existing member data if fetch fails
      setCurrentMember(member)
      // Optionally show error to user
    }
  }

  useEffect(() => {
    const loadSubAccounts = async () => {
      try {
        console.log("Loading sub-accounts from API...")
        await dispatch(fetchSubAccounts())
        console.log("Sub-accounts loaded successfully")
      } catch (error) {
        console.error("Failed to load sub-accounts:", error)
      }
    }

    loadSubAccounts()
  }, [dispatch])

  const handleAddMember = async (memberData: Omit<TeamMember, "id" | "initials" | "status" | "lastLogin">) => {
    try {
      // Split name into first and last names for the API payload
      const [firstName, ...lastNameParts] = memberData.name.split(" ")
      const lastName = lastNameParts.join(" ") || ""

      // Call the API to create sub-account with the required structure
      const response = await authService.createSubAccount({
        first_name: firstName,
        last_name: lastName,
        email: memberData.email,
        phone_number: memberData.phone_number || "",
      })

      // Generate initials from name
      const initials = memberData.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()

      const newMember: TeamMember = {
        ...memberData,
        id: response.id || Date.now(),
        initials,
        status: "Active",
        lastLogin: "Never",
      }

      dispatch(addTeamMember(newMember))

      // Refresh the list after adding
      await dispatch(fetchSubAccounts())

      return newMember
    } catch (error) {
      console.error("Failed to create sub-account:", error)
      throw error
    }
  }

  const handleUpdateMember = (memberData: Omit<TeamMember, "id" | "initials" | "status" | "lastLogin">) => {
    if (currentMember) {
      const updatedMember: TeamMember = {
        ...currentMember,
        ...memberData,
      }

      dispatch(updateTeamMember(updatedMember))
    }
  }

  const handleDeleteMember = (member: TeamMember) => {
    setCurrentMember(member)
    setConfirmDeleteId(member.id)
  }

  

const confirmDelete = async () => {
  if (!currentMember?.slug) {
    console.error("Cannot toggle status: Missing slug");
    return;
  }

  try {
    await dispatch(toggleSubAccountStatus(currentMember.slug));
    await dispatch(fetchSubAccounts()); // Refresh the list
    setConfirmDeleteId(null);
  } catch (error) {
    console.error("Failed to toggle member status:", error);
  }
};


  const handleSubmit = async (memberData: Omit<TeamMember, "id" | "initials" | "status" | "lastLogin">) => {
    try {
      if (modalMode === "add") {
        await handleAddMember(memberData)
      } else if (modalMode === "edit") {
        handleUpdateMember(memberData)
      }
      setIsModalOpen(false)
    } catch (error) {
      console.error("Error submitting member data:", error)
      // Modal will stay open so user can see the error
    }
  }

  const filteredMembers = teamsData.filter((member) => {
    if (!searchTerm) return true

    const searchLower = searchTerm.toLowerCase()
    return (
      member.name.toLowerCase().includes(searchLower) ||
      member.email.toLowerCase().includes(searchLower) ||
      member.role.toLowerCase().includes(searchLower)
    )
  })

  // Show loading state
  if (isLoading) {
    return (
      <div className="py-4 sm:py-6 max-w-full">
        <div className="flex items-center justify-center py-12">
          <FiLoader className="animate-spin h-8 w-8 text-green-500 mr-3" />
          <span className="text-gray-600">Loading team members...</span>
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="py-4 sm:py-6 max-w-full">
        <div className="max-w-full mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="text-red-600 text-sm">
                <strong>Error loading team members:</strong> {error}
              </div>
            </div>
            <button
              onClick={() => dispatch(fetchSubAccounts())}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-4 sm:py-6 max-w-full">
      <div className="max-w-full mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
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
            className="flex items-center px-4 py-2 bg-green-500 text-black rounded-md hover:bg-green-600 transition w-full sm:w-auto justify-center sm:justify-start text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={openAddModal}
            disabled={isCreatingSubAccount}
          >
            {isCreatingSubAccount ? (
              <>
                <FiLoader className="animate-spin mr-2" /> Creating...
              </>
            ) : (
              <>
                <FiPlus className="mr-2" /> Create New Member
              </>
            )}
          </button>
        </div>

        <div className="bg-white rounded-lg overflow-x-auto border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left py-3 sm:py-4 px-2 sm:px-6 text-gray-600 font-medium text-xs sm:text-sm">
                  Name
                </th>
                <th className="text-left py-3 sm:py-4 px-2 sm:px-6 text-gray-600 font-medium text-xs sm:text-sm">
                  Email
                </th>
                <th className="lg:table-cell text-left py-4 px-6 text-gray-600 font-medium text-sm">Phone</th>
                <th className="hidden sm:table-cell text-left py-3 sm:py-4 px-2 sm:px-6 text-gray-600 font-medium text-xs sm:text-sm">
                  Last Login
                </th>
                <th className="text-left py-3 sm:py-4 px-2 sm:px-6 text-gray-600 font-medium text-xs sm:text-sm">
                  Status
                </th>
                <th className="text-left py-3 sm:py-4 px-2 sm:px-6 text-gray-600 font-medium text-xs sm:text-sm">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member) => (
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
                  <td colSpan={6} className="py-8 text-center text-gray-500 text-sm">
                    {searchTerm ? "No members match your search" : "No team members found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <TeamMemberModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          editMember={currentMember}
          mode={modalMode}
        />

        {isViewModalOpen && (
          isFetchingDetails ? (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-8 max-w-md w-full flex flex-col items-center">
                <FiLoader className="animate-spin h-10 w-10 text-green-500 mb-4" />
                <p className="text-gray-700">Loading member details...</p>
              </div>
            </div>
          ) : fetchDetailsError ? (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h3 className="text-lg font-medium text-red-600 mb-2">Error</h3>
                <p className="text-gray-700 mb-4">{fetchDetailsError}</p>
                <div className="flex justify-end">
                  <button 
                    onClick={() => setIsViewModalOpen(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          ) : currentMember ? (
            <TeamMemberView member={currentMember} onClose={() => setIsViewModalOpen(false)} />
          ) : null
        )}

        {/* {confirmDeleteId !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-4 sm:p-6 max-w-sm w-full">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                {currentMember?.status === 'Active' ? 'Deactivate Member' : 'Activate Member'}
              </h2>
              <p className="mb-4 sm:mb-6 text-sm sm:text-base">
                Are you sure you want to {currentMember?.status === 'Active' ? 'deactivate' : 'activate'} this team member?
              </p>

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
                  {currentMember?.status === 'Active' ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </div>
          </div>
        )} */}
        {confirmDeleteId !== null && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg p-4 sm:p-6 max-w-sm w-full">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
        {currentMember?.status === 'Active' ? 'Deactivate Member' : 'Activate Member'}
      </h2>
      <p className="mb-4 sm:mb-6 text-sm sm:text-base">
        Are you sure you want to {currentMember?.status === 'Active' ? 'deactivate' : 'activate'} this team member?
      </p>

      {toggleError && (
        <p className="text-red-600 text-sm mb-4">{toggleError}</p>
      )}

      <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3">
        <button
          onClick={() => setConfirmDeleteId(null)}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 order-2 sm:order-1 text-sm sm:text-base"
          disabled={isTogglingStatus}
        >
          Cancel
        </button>
        <button
          onClick={confirmDelete}
          disabled={isTogglingStatus}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 order-1 sm:order-2 text-sm sm:text-base disabled:opacity-50"
        >
          {isTogglingStatus ? (
            <>
              <FiLoader className="animate-spin inline mr-2" />
              Processing...
            </>
          ) : (
            currentMember?.status === 'Active' ? 'Deactivate' : 'Activate'
          )}
        </button>
      </div>
    </div>
  </div>
)}
      </div>
    </div>
  )
}

export default TeamsTab