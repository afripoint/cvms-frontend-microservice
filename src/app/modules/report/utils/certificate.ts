// import html2canvas from 'html2canvas';
// import { jsPDF } from 'jspdf';

// export const downloadCertificateAsPDF = async (
//   certificateElementRef: HTMLDivElement | null, 
//   filename: string
// ) => {
//   if (!certificateElementRef) {
//     console.error('Certificate element reference is missing');
//     return;
//   }

//   try {
//     // Convert the certificate element to a canvas
//     const canvas = await html2canvas(certificateElementRef, {
//       scale: 2, // Higher scale for better quality
//       useCORS: true,
//       logging: false,
//       backgroundColor: '#ffffff'
//     });

//     // Create a new PDF with A4 dimensions
//     const pdf = new jsPDF({
//       orientation: 'portrait',
//       unit: 'mm',
//       format: 'a4'
//     });

//     // Calculate ratio to fit canvas into PDF
//     const imgWidth = 210; // A4 width in mm
//     const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
//     // Add the image to the PDF
//     const imgData = canvas.toDataURL('image/png');
//     pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    
//     // Save the PDF
//     pdf.save(`${filename}.pdf`);
//   } catch (error) {
//     console.error('Error generating PDF:', error);
//   }
// };