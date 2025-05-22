// import type React from "react"
// import { useSelector } from "react-redux"
// import type { RootState } from "../../../core/store"
// import type { StepIndicatorProps } from "../../auth/types/auth"
// import { REGISTRATION_STEPS } from "../../../modules/auth/constants/auth"

// const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
//   // Use the currentStep from props or from the UI state
//   const uiCurrentStep = useSelector((state: RootState) => state.ui.currentStep)
//   const step = currentStep !== undefined ? currentStep : uiCurrentStep

//   // Helper function to determine step status
//   const getStepStyles = (stepNumber: number) => {
//     if (step > stepNumber) {
//       // Completed step - green
//       return {
//         circle: "bg-green-500 text-white border-green-500",
//         text: "text-green-500"
//       }
//     } else if (step === stepNumber) {
//       // Current step - yellow
//       return {
//         circle: "bg-blue-500 text-white border-blue-500",
//         text: "text-blue-500"
//       }
//     } else {
//       // Future step - gray
//       return {
//         circle: "text-gray-500 border-gray-300",
//         text: "text-gray-500"
//       }
//     }
//   }

//   return (
//     <div className="w-full mb-4 md:mb-8">
//       {/* Mobile Layout (horizontal flex) */}
//       <div className="md:hidden flex overflow-x-auto px-2 pb-2">
//         {REGISTRATION_STEPS.map((stepItem, index) => {
//           const styles = getStepStyles(stepItem.number)
          
//           return (
//             <div 
//               key={stepItem.number} 
//               className={`flex items-start flex-shrink-0 ${
//                 index === 0 ? 'ml-0' : ''
//               } ${
//                 index === REGISTRATION_STEPS.length - 1 ? 'mr-0' : ''
//               } mx-2 relative`}
//             >
//               {/* Removed connector line between steps (mobile) */}
              
//               <div
//                 className={`w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full border mr-2 z-10 ${
//                   styles.circle
//                 }`}
//               >
//                 {step > stepItem.number ? (
//                   <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                 ) : (
//                   stepItem.number
//                 )}
//               </div>
//               <div className="flex flex-col max-w-16">
//                 <span className={`text-xs font-medium truncate ${styles.text}`}>
//                   {stepItem.title}
//                 </span>
//                 <span className={`text-xs truncate ${styles.text}`}>
//                   {stepItem.subtitle}
//                 </span>
//               </div>
//             </div>
//           )
//         })}
//       </div>

//       {/* Desktop Layout (horizontal with more space) */}
//       <div className="hidden md:flex justify-center w-full">
//         {REGISTRATION_STEPS.map((stepItem, index) => {
//           const styles = getStepStyles(stepItem.number)
          
//           return (
//             <div 
//               key={stepItem.number} 
//               className={`flex items-start ${
//                 index === 0 ? 'ml-0' : ''
//               } ${
//                 index === REGISTRATION_STEPS.length - 1 ? 'mr-0' : ''
//               } mx-2 lg:mx-4 relative flex-1 max-w-xs`}
//             >
//               {/* Removed connector line between steps */}
              
//               <div
//                 className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full border mr-3 z-10 ${
//                   styles.circle
//                 }`}
//               >
//                 {step > stepItem.number ? (
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                 ) : (
//                   stepItem.number
//                 )}
//               </div>
//               <div className="flex flex-col min-w-0">
//                 <span className={`text-xs lg:text-sm font-medium truncate ${styles.text}`}>
//                   {stepItem.title}
//                 </span>
//                 <span className={`text-xs truncate ${styles.text}`}>
//                   {stepItem.subtitle}
//                 </span>
//               </div>
//             </div>
//           )
//         })}
//       </div>
//     </div>
//   )
// }

// export default StepIndicator






import type React from "react"
import { useSelector } from "react-redux"
import type { RootState } from "../../../core/store"
import type { StepIndicatorProps } from "../../auth/types/auth"
import { REGISTRATION_STEPS } from "../../../modules/auth/constants/auth"

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  // Use the currentStep from props or from the UI state
  const uiCurrentStep = useSelector((state: RootState) => state.ui.currentStep)
  const step = currentStep !== undefined ? currentStep : uiCurrentStep

  // Helper function to determine step status
  const getStepStyles = (stepNumber: number) => {
    if (step > stepNumber) {
      // Completed step - green
      return {
        circle: "bg-green-500 text-white border-green-500",
        text: "text-green-500"
      }
    } else if (step === stepNumber) {
      // Current step - blue
      return {
        circle: "bg-blue-500 text-white border-blue-500",
        text: "text-blue-500"
      }
    } else {
      // Future step - gray
      return {
        circle: "text-gray-500 border-gray-300",
        text: "text-gray-500"
      }
    }
  }

  return (
    <div className="w-full mb-4 md:mb-8">
      {/* Mobile Layout (horizontal flex) */}
      <div className="md:hidden flex overflow-x-auto px-2 pb-2">
        {REGISTRATION_STEPS.map((stepItem, index) => {
          const styles = getStepStyles(stepItem.number)
          
          return (
            <div 
              key={stepItem.number} 
              className={`flex items-start flex-shrink-0 ${
                index === 0 ? 'ml-0' : ''
              } ${
                index === REGISTRATION_STEPS.length - 1 ? 'mr-0' : ''
              } mx-2 relative`}
            >
              {/* Removed line connector between steps for mobile */}
              
              <div
                className={`w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full border mr-2 z-10 ${
                  styles.circle
                }`}
              >
                {step > stepItem.number ? (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  stepItem.number
                )}
              </div>
              <div className="flex flex-col max-w-16">
                <span className={`text-xs font-medium truncate ${styles.text}`}>
                  {stepItem.title}
                </span>
                <span className={`text-xs truncate ${styles.text}`}>
                  {stepItem.subtitle}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Desktop Layout (horizontal with more space) */}
      <div className="hidden md:flex justify-center w-full">
        {REGISTRATION_STEPS.map((stepItem, index) => {
          const styles = getStepStyles(stepItem.number)
          
          return (
            <div 
              key={stepItem.number} 
              className={`flex items-start ${
                index === 0 ? 'ml-0' : ''
              } ${
                index === REGISTRATION_STEPS.length - 1 ? 'mr-0' : ''
              } mx-2 lg:mx-4 relative flex-1 max-w-xs`}
            >
              {/* Removed line connector between steps for desktop */}
              
              <div
                className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full border mr-3 z-10 ${
                  styles.circle
                }`}
              >
                {step > stepItem.number ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  stepItem.number
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <span className={`text-xs lg:text-sm font-medium truncate ${styles.text}`}>
                  {stepItem.title}
                </span>
                <span className={`text-xs truncate ${styles.text}`}>
                  {stepItem.subtitle}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StepIndicator