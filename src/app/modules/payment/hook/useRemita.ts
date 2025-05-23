// // In your useRemita.ts file
// "use client"
// import { useEffect, useState } from "react"

// // Define types for the hook
// interface Props {
//   publicKey: string
// }

// interface Config {
//   transactionId: string
//   customerId: string
//   firstName: string
//   lastName: string
//   email: string
//   amount: number
//   narration: string
//   key?: string // Will be set from publicKey
//   onSuccess: (response: any) => void
//   onError: (error: any) => void
//   onClose: () => void
// }

// // Corrected declaration for RmPaymentEngine


// // Add to track loaded scripts to prevent duplicate loading
// const cachedScripts: string[] = []

// const useRemita = ({ publicKey }: Props) => {
//   const [loaded, setLoaded] = useState(false)
//   const [error, setError] = useState(false)

//   useEffect(() => {
//     // Get the correct Remita script URL based on environment
//     const isProduction = process.env.NODE_ENV === "production"
//     const src = isProduction
//       ? "https://login.remita.net/payment/v1/remita-pay-inline.bundle.js"
//       : "https://demo.remita.net/payment/v1/remita-pay-inline.bundle.js"

//     if (cachedScripts.includes(src)) {
//       // Script already loaded
//       setLoaded(true)
//       return
//     }

//     // Add to cache before load to prevent duplicate loading attempts
//     cachedScripts.push(src)

//     const script = document.createElement("script")
//     script.src = src
//     script.async = true

//     const onScriptLoad = () => {
//       setLoaded(true)
//       setError(false)
//     }

//     const onScriptError = () => {
//       // Remove from cache if loading failed
//       const index = cachedScripts.indexOf(src)
//       if (index >= 0) cachedScripts.splice(index, 1)
//       script.remove()

//       setLoaded(false)
//       setError(true)
//     }

//     script.addEventListener("load", onScriptLoad)
//     script.addEventListener("error", onScriptError)

//     document.body.appendChild(script)

//     return () => {
//       script.removeEventListener("load", onScriptLoad)
//       script.removeEventListener("error", onScriptError)
//     }
//   }, [])

//   const handleRemitaPayment = (config: Config) => {
//     if (!window.RmPaymentEngine || !window.RmPaymentEngine.init) {
//       console.error("RmPaymentEngine is not available. The script may not have loaded correctly.")
//       if (config.onError) {
//         config.onError("Remita payment engine not available")
//       }
//       return false
//     }

//     try {
//       // Make sure to set the key property with the publicKey
//       const paymentConfig = {
//         ...config,
//         key: publicKey,
//       }
      
//       const paymentEngine = window.RmPaymentEngine.init(paymentConfig)
//       paymentEngine.showPaymentWidget()
//       return true
//     } catch (error) {
//       console.error("Failed to initialize Remita payment:", error)
//       if (config.onError) {
//         config.onError(error)
//       }
//       return false
//     }
//   }

//   return { handleRemitaPayment, loaded, error }
// }

// export default useRemita