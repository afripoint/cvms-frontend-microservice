"use client"

import { useSelector, useDispatch } from "react-redux"
import { selectActiveTab, selectIsBusinessAccount } from "../../modules/profileManagement/redux/selectors"
import { MainLayout } from "../../modules/landing/components/layout"
import { setActiveTab } from "../../modules/profileManagement/redux/actions"
import { fetchUserProfile } from "../../modules/auth/redux/slices/authSlice"
import HistoryTab from "../../modules/profileManagement/components/history/History-Tab"
import AccountTab from "../../modules/profileManagement/components/account/Account-Tab"
import WalletTab from "../../modules/profileManagement/components/wallet/components/Wallet-Tabs"
import TeamsTab from "../../modules/profileManagement/components/team-management/Team-Tab"
import { useEffect } from "react"
import type { AppDispatch, RootState } from "../../core/store"
import { toast } from "react-toastify"
import type { User } from "../../modules/auth/types/auth"

const SettingsPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const activeTab = useSelector(selectActiveTab)
  const isBusinessAccount = useSelector(selectIsBusinessAccount)
  const isLoading = useSelector((state: RootState) => state.auth.isLoading)
  const error = useSelector((state: RootState) => state.auth.error)

  // Fetch user profile data when the settings page loads
  useEffect(() => {
    console.log("SettingsPage mounted, fetching user profile")
    dispatch(fetchUserProfile())
      .then((result) => {
        // Properly type the payload as User
        const userData = result.payload as User

        console.log("User profile fetched successfully in SettingsPage:", userData)

        // Check if we have an address with proper type checking
        if (userData && typeof userData === "object" && !userData.address) {
          console.warn("User profile fetched but address is missing")
        }
      })
      .catch((err) => {
        console.error("Error fetching user profile in SettingsPage:", err)
        toast.error("Failed to load profile data. Please try again.")
      })
  }, [dispatch])

  // Show error message if profile fetch fails
  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`)
    }
  }, [error])

  const tabs = [
    { id: "Account", label: "Account" },
    { id: "Wallet", label: "Wallet" },
    { id: "History", label: "History" },
    ...(isBusinessAccount ? [{ id: "Teams", label: "Teams" }] : []),
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <MainLayout>
        <main className="flex-grow py-6 sm:py-8 md:py-12">
          <div className="max-w-5xl mx-auto mb-4 sm:mb-8 mt-4 sm:mt-8 md:mt-16 p-4 sm:p-6 md:p-8 border rounded-lg shadow-sm">
            <div className="mb-6 sm:mb-8">
              {/* Mobile Tabs - Horizontal layout like desktop */}
              <div className="flex sm:flex space-x-2 md:space-x-8 w-full sm:w-fit mx-auto pb-2 border-b border-gray-200 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => dispatch(setActiveTab(tab.id))}
                    className={`px-2 sm:px-3 md:px-4 py-1 sm:py-2 whitespace-nowrap ${
                      activeTab === tab.id ? "text-green-500 border-b-2 border-green-500 -mb-0.5" : "text-gray-500"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
              </div>
            ) : (
              <>
                {activeTab === "Account" && <AccountTab />}
                {activeTab === "Wallet" && <WalletTab />}
                {activeTab === "History" && <HistoryTab />}
                {activeTab === "Teams" && isBusinessAccount && <TeamsTab />}
              </>
            )}
          </div>
        </main>
      </MainLayout>
    </div>
  )
}

export default SettingsPage
