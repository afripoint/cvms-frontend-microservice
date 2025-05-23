export const validateVin = (vin: string): { isValid: boolean; errorMessage: string | null } => {
  // Remove any whitespace
  const cleanVin = vin.trim().replace(/\s/g, "")

  // Check if VIN is empty
  if (!cleanVin) {
    return { isValid: false, errorMessage: "Please enter a VIN." }
  }

  // Check VIN length (standard VINs are 17 characters)
  if (cleanVin.length !== 17) {
    return {
      isValid: false,
      errorMessage: `VIN must be exactly 17 characters (currently ${cleanVin.length}).`,
    }
  }

  // Check for invalid characters (VINs only contain alphanumeric characters except I, O, Q)
  const invalidCharsRegex = /[^A-HJ-NPR-Z0-9]/i
  if (invalidCharsRegex.test(cleanVin)) {
    return {
      isValid: false,
      errorMessage: "VIN contains invalid characters. VINs only contain letters and numbers (excluding I, O, Q).",
    }
  }

  return { isValid: true, errorMessage: null }
}

