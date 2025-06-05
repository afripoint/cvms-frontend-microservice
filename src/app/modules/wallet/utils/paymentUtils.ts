// export const generateTransactionId = (): string => {
//   return Math.floor(1000000 + Math.random() * 9000000).toString()
// }

// export const getCurrentDate = (): string => {
//   const date = new Date()
//   const options: Intl.DateTimeFormatOptions = { 
//     day: "2-digit", 
//     month: "short", 
//     year: "numeric" 
//   }
//   return date.toLocaleDateString("en-GB", options)
// }

// export const formatCurrency = (amount: number): string => {
//   return `₦${amount.toLocaleString()}`
// }