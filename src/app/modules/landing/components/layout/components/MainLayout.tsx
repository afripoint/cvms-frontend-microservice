// import type React from "react"
// import Header from "./Header"
// import Footer from "./footer/Footer"
// import ChatWidget from "../../chat/ChatWidget"

// interface MainLayoutProps {
//   children: React.ReactNode
// }

// const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header />
//       <main className="pt-20 w-full relative z-0">{children}</main>
//       <Footer />
//       <ChatWidget />
//     </div>
//   )
// }

// export default MainLayout




// MainLayout.tsx
import type React from "react"
// import { useState, useEffect } from "react" // Add useState and useEffect
import { useEffect } from "react"
import Header from "./Header"
import Footer from "./footer/Footer"
import ChatWidget from "../../chat/ChatWidget"
import { useSelector } from "react-redux" // Add useSele
// import { toast } from "react-toastify" // Add toast
import 'react-toastify/dist/ReactToastify.css' // Add toast styles
import { RootState } from "../../../../../core/store"
// import NINVerificationModal from "../../../../nin/components/NINVerificationModal"

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  // const [showNINModal, setShowNINModal] = useState(false);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated && user && !user.NINVerified) {
      // Show modal every 24 hours if NIN isn't verified
      const interval = setInterval(() => {
        const lastPrompt = localStorage.getItem('lastNINPrompt');
        const now = Date.now();
        
        if (!lastPrompt || now - parseInt(lastPrompt) > 1 * 60 * 60 * 1000) {
          // setShowNINModal(true);
          localStorage.setItem('lastNINPrompt', now.toString());
        }
      }, 1 * 60 * 1000); // Check every hour

      return () => clearInterval(interval);
    }
  }, [isAuthenticated, user]);
  

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <main className="pt-20 w-full relative z-0">{children}</main>
      <Footer />
      <ChatWidget />
      {/* Add NIN Verification Modal */}
      {/* {showNINModal && (
        <NINVerificationModal
          isOpen={showNINModal}
          onClose={() => setShowNINModal(false)}
          onSuccess={() => {
            setShowNINModal(false);
            toast.success("NIN verification successful! Your account is now fully activated.");
          }}
        />
      )} */}
    </div>
  )
}

export default MainLayout