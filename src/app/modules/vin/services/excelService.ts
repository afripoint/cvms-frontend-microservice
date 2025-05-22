import * as XLSX from "xlsx"

/**
 * Processes an Excel file to extract VINs
 * @param file Excel file to process
 * @returns Promise resolving to array of VINs
 */
export const processExcelFile = async (file: File): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: "array" })

        // Get first sheet
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]

        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet)

        // Extract VINs from the data
        // Look for a column named "VIN" or similar
        const vins: string[] = []

        jsonData.forEach((row: any) => {
          // Try different possible column names for VIN
          const vinValue =
            row["VIN"] || row["vin"] || row["Vin"] || row["Vehicle Identification Number"] || row["Chassis Number"]

          if (vinValue && typeof vinValue === "string" && vinValue.trim().length > 0) {
            vins.push(vinValue.trim())
          }
        })

        if (vins.length === 0) {
          reject(new Error('No VINs found in the Excel file. Please ensure there is a column named "VIN".'))
        } else {
          resolve(vins)
        }
      } catch (error) {
        reject(new Error("Failed to process Excel file. Please check the format and try again."))
      }
    }

    reader.onerror = () => {
      reject(new Error("Error reading the file."))
    }

    reader.readAsArrayBuffer(file)
  })
}

/**
 * Generates a sample Excel file with VIN template
 * @returns ArrayBuffer containing the Excel file data
 */
export const generateSampleExcelFile = (): ArrayBuffer => {
  // Create a new workbook
  const wb = XLSX.utils.book_new()

  //Sample data with header and example VINs
  const data = [
    { VIN: "SHHMB2740WU017079" },
    { VIN: "SUZUKIDA62V312638" },
    { VIN: "MRHCM56407P080008" },
    { VIN: "JH4KA7561PC008269" },
    {VIN:  "MR053ZE0107149822" },
    {VIN:  "KNMA4C2BM7P270381" },
    {VIN:  "KMHJN81BR5U156442" },
    
  ]

  //Create worksheet from data
  const ws = XLSX.utils.json_to_sheet(data)

  //Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, "VINs")

  // Generate Excel file as array buffer
  return XLSX.write(wb, { type: "array", bookType: "xlsx" })
}


