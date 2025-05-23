// // utilities/vinValidation.ts

// /**
//  * Checks if there are any duplicate VINs in the provided array
//  * @param vins Array of VIN strings to check for duplicates
//  * @returns Object with validation result and error message if duplicates exist
//  */
// export const checkDuplicateVins = (vins: string[]): { isValid: boolean; error?: string } => {
//     // Filter out any empty strings
//     const filteredVins = vins.filter(vin => vin.trim() !== "");
    
//     // Use a Set to find duplicates
//     const uniqueVins = new Set<string>();
//     const duplicates: string[] = [];
    
//     for (const vin of filteredVins) {
//       if (uniqueVins.has(vin)) {
//         duplicates.push(vin);
//       } else {
//         uniqueVins.add(vin);
//       }
//     }
    
//     if (duplicates.length > 0) {
//       return {
//         isValid: false,
//         error: `Duplicate VIN${duplicates.length > 1 ? 's' : ''} found: ${duplicates.join(', ')}. Please ensure all VINs are unique.`
//       };
//     }
    
//     return { isValid: true };
//   };
  
//   /**
//    * Validates a single VIN against a list of existing VINs
//    * @param vin The VIN to check
//    * @param existingVins Array of existing VINs to check against
//    * @returns Object with validation result and error message if VIN exists
//    */
//   export const validateNewVin = (vin: string, existingVins: string[]): { isValid: boolean; error?: string } => {
//     if (!vin || vin.trim() === "") {
//       return { isValid: false, error: "VIN cannot be empty" };
//     }
    
//     if (existingVins.includes(vin.trim())) {
//       return {
//         isValid: false,
//         error: `Duplicate VIN: ${vin}. This VIN has already been added.`
//       };
//     }
    
//     return { isValid: true };
//   };





// VIN validation utility functions

// Basic VIN validation
export const validateVin = (vin: string): boolean => {
    // Standard VIN is 17 characters
    if (vin.trim().length !== 17) {
      return false;
    }
    
    // Check for valid characters (no I, O, Q)
    const invalidChars = /[IOQ]/;
    if (invalidChars.test(vin)) {
      return false;
    }
    
    // Additional validation could be added here (checksum, etc.)
    return true;
  };
  
  // Check for duplicate VINs
  export const checkDuplicateVins = (vins: string[]): { isValid: boolean; error: string | null } => {
    // Create a map to track VINs
    const vinMap = new Map<string, number>();
    const duplicates: string[] = [];
    
    // Check for duplicates
    vins.forEach(vin => {
      const trimmedVin = vin.trim();
      if (trimmedVin) {
        if (vinMap.has(trimmedVin)) {
          duplicates.push(trimmedVin);
        } else {
          vinMap.set(trimmedVin, 1);
        }
      }
    });
    
    // If duplicates found, return error
    if (duplicates.length > 0) {
      return {
        isValid: false,
        error: `Duplicate VINs found: ${duplicates.join(', ')}. Please ensure all VINs are unique.`
      };
    }
    
    return { isValid: true, error: null };
  };
  
  // Validate a batch of VINs
  export const validateVinBatch = (vins: string[]): { 
    validVins: string[]; 
    invalidVins: string[]; 
    allValid: boolean 
  } => {
    const validVins: string[] = [];
    const invalidVins: string[] = [];
    
    vins.forEach(vin => {
      if (validateVin(vin)) {
        validVins.push(vin);
      } else {
        invalidVins.push(vin);
      }
    });
    
    return {
      validVins,
      invalidVins,
      allValid: invalidVins.length === 0
    };
  };
  
  // Check if the total number of VINs exceeds limit
  export const checkVinLimit = (vins: string[], limit: number): boolean => {
    return vins.filter(vin => vin.trim().length > 0).length <= limit;
  };