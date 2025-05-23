// import { useSelector, useDispatch } from 'react-redux';
// import { selectActiveTab, selectIsBusinessAccount } from '../../modules/profileManagement/redux/selectors';
// import { MainLayout } from '../../modules/landing/components/layout';
// import { setActiveTab } from '../../modules/profileManagement/redux/actions';
// import HistoryTab from '../../modules/profileManagement/components/history/History-Tab';
// import AccountTab from '../../modules/profileManagement/components/account/Account-Tab';
// import WalletTab from '../../modules/profileManagement/components/wallet/components/Wallet-Tabs';
// import TeamsTab from '../../modules/profileManagement/components/team-management/Team-Tab';
// import { useState } from 'react';
// import { FiChevronDown } from 'react-icons/fi';

// const SettingsPage = () => {
//   const dispatch = useDispatch();
//   const activeTab = useSelector(selectActiveTab);
//   const isBusinessAccount = useSelector(selectIsBusinessAccount);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const tabs = [
//     { id: 'Account', label: 'Account' },
//     { id: 'Wallet', label: 'Wallet' },
//     { id: 'History', label: 'History' },
//     ...(isBusinessAccount ? [{ id: 'Teams', label: 'Teams' }] : [])
//   ];

//   const handleTabChange = (tabId: string) => {
//     dispatch(setActiveTab(tabId));
//     setMobileMenuOpen(false);
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       <MainLayout>
//         <main className="flex-grow py-6 sm:py-8 md:py-12">
//           <div className="max-w-5xl mx-auto mb-4 sm:mb-8 mt-4 sm:mt-8 md:mt-16 p-4 sm:p-6 md:p-8 border rounded-lg shadow-sm">
//             <div className="mb-6 sm:mb-8">
//               {/* Desktop Tabs */}
//               <div className="hidden sm:flex space-x-4 md:space-x-8 w-fit mx-auto pb-2 border-b border-gray-200">
//                 {tabs.map(tab => (
//                   <button
//                     key={tab.id}
//                     onClick={() => dispatch(setActiveTab(tab.id))}
//                     className={`px-3 md:px-4 py-2 ${
//                       activeTab === tab.id
//                         ? 'text-green-500 border-b-2 border-green-500 -mb-0.5'
//                         : 'text-gray-500'
//                     }`}
//                   >
//                     {tab.label}
//                   </button>
//                 ))}
//               </div>
              
//               {/* Mobile Dropdown */}
//               <div className="sm:hidden relative">
//                 <button
//                   onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//                   className="w-full flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
//                 >
//                   <span className="font-medium">{tabs.find(tab => tab.id === activeTab)?.label}</span>
//                   <FiChevronDown className={`transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`} />
//                 </button>
                
//                 {mobileMenuOpen && (
//                   <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
//                     {tabs.map(tab => (
//                       <button
//                         key={tab.id}
//                         onClick={() => handleTabChange(tab.id)}
//                         className={`block w-full text-left px-4 py-2 ${
//                           activeTab === tab.id
//                             ? 'bg-green-50 text-green-500'
//                             : 'text-gray-800 hover:bg-gray-50'
//                         }`}
//                       >
//                         {tab.label}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {activeTab === 'Account' && <AccountTab />}
//             {activeTab === 'Wallet' && <WalletTab/>}
//             {activeTab === 'History' && <HistoryTab />}
//             {activeTab === 'Teams' && isBusinessAccount && <TeamsTab/>}
//           </div>
//         </main>
//       </MainLayout>
//     </div>
//   );
// };

// export default SettingsPage;



import { useSelector, useDispatch } from 'react-redux';
import { selectActiveTab, selectIsBusinessAccount } from '../../modules/profileManagement/redux/selectors';
import { MainLayout } from '../../modules/landing/components/layout';
import { setActiveTab } from '../../modules/profileManagement/redux/actions';
import HistoryTab from '../../modules/profileManagement/components/history/History-Tab';
import AccountTab from '../../modules/profileManagement/components/account/Account-Tab';
import WalletTab from '../../modules/profileManagement/components/wallet/components/Wallet-Tabs';
import TeamsTab from '../../modules/profileManagement/components/team-management/Team-Tab';


const SettingsPage = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector(selectActiveTab);
  const isBusinessAccount = useSelector(selectIsBusinessAccount);

  const tabs = [
    { id: 'Account', label: 'Account' },
    { id: 'Wallet', label: 'Wallet' },
    { id: 'History', label: 'History' },
    ...(isBusinessAccount ? [{ id: 'Teams', label: 'Teams' }] : [])
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <MainLayout>
        <main className="flex-grow py-6 sm:py-8 md:py-12">
          <div className="max-w-5xl mx-auto mb-4 sm:mb-8 mt-4 sm:mt-8 md:mt-16 p-4 sm:p-6 md:p-8 border rounded-lg shadow-sm">
            <div className="mb-6 sm:mb-8">
              {/* Mobile Tabs - Horizontal layout like desktop */}
              <div className="flex sm:flex space-x-2 md:space-x-8 w-full sm:w-fit mx-auto pb-2 border-b border-gray-200 overflow-x-auto">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => dispatch(setActiveTab(tab.id))}
                    className={`px-2 sm:px-3 md:px-4 py-1 sm:py-2 whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'text-green-500 border-b-2 border-green-500 -mb-0.5'
                        : 'text-gray-500'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === 'Account' && <AccountTab />}
            {activeTab === 'Wallet' && <WalletTab/>}
            {activeTab === 'History' && <HistoryTab />}
            {activeTab === 'Teams' && isBusinessAccount && <TeamsTab/>}
          </div>
        </main>
      </MainLayout>
    </div>
  );
};

export default SettingsPage;