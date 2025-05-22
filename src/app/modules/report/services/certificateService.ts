import html2pdf from 'html2pdf.js';
import QRCode from 'qrcode';

interface CertificateData {
  vin: string;
  makeModel: string;
  model: string;
  year: string | number;
  certificateNumber: string;
  ownerName: string;
  ownerAddress: string;
  date: string;
  qrCodeBase64?: string; // Optional property for pre-generated QR code
}

export const generateCertificate = async (data: CertificateData) => {
  // Generate QR code if not provided
  let qrCodeDataUrl = data.qrCodeBase64;
  
  if (!qrCodeDataUrl) {
    try {
      const qrValue = JSON.stringify({
        vin: data.vin,
        certificateNumber: data.certificateNumber,
        date: data.date
      });
      
      qrCodeDataUrl = await QRCode.toDataURL(qrValue, {
        errorCorrectionLevel: 'H',
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });
    } catch (error) {
      console.error('Error generating QR code:', error);
      qrCodeDataUrl = '';
    }
  }
  
  // Create HTML template for certificate
  const certificateHtml = `
   <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Customs Certificate</title>
  <style>
    @page {
      size: A4;
      margin: 0;
    }
    
    body {
      margin: 0;
      padding: 0;
      background-color: #f9fafb;
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    
    /* Certificate is exactly A4 size */
    .certificate {
      width: 210mm;
      height: 297mm;
      position: relative;
      background: url('./images/certificateimg2.png') no-repeat center center;
      background-size: cover;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      overflow: hidden;
      background-color: white;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    
    /* Updated watermark styling */
    .watermark {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 70%;
      height: 100%;
      background-image: url('/images/certificateimg4.png');
      background-repeat: no-repeat;
      background-position: center center;
      background-size: contain;
      opacity: 0.15;
      pointer-events: none;
      z-index: 5;
    }
    
    .certificate-pattern {
      position: absolute;
      inset: 0;
      opacity: 0.05;
      background: linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0), 
                 linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0);
      background-size: 15mm 15mm;
      background-position: 0 0, 7.5mm 7.5mm;
    }
    
    .certificate-content {
      position: relative;
      z-index: 10;
      padding: 15mm;
      display: flex;
      flex-direction: column;
      height: 100%;
      box-sizing: border-box;
    }
    
    .header {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6mm;
      margin-top: 8mm;
      margin-bottom: 15mm; /* Increased to push content down */
    }
    
    .logo {
    margin-top: 10px;
      width: 16mm;
      height: 16mm;
    }
    
    .title-container {
      color: #000080;
    }
    
    .title {
      font-size: 5mm;
      font-weight: bold;
      margin: 0;
    }
    
    .subtitle {
      font-size: 5mm;
      font-weight: bold;
      margin: 0;
    }
    
    .certificate-title {
      font-size: 6mm;
      font-weight: bold;
      text-align: center;
      text-decoration: underline;
       
    }
    
    .certificate-description {
      text-align: center;
      font-size: 4.5mm;
      color: #666;
      line-height: 1.3;
      margin-top: 5mm; /* Added margin to move description down */
      margin-bottom: 20mm; /* Increased to space from the main content */
    }
    
    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 15mm; /* Spacing between sections */
    }
    
    .section {
      text-align: center;
      font-size: 4.5mm;
    }
    
    .section-title {
      font-size: 5mm;
      font-weight: bold;
      margin-bottom: 4mm;
      margin-top: 0;
    }
    
    .info-item {
      font-size: 4.5mm;
      margin: 2mm 0;
      line-height: 1.2;
    }
    
    .info-label {
      font-weight: bold;
      font-size: 4.5mm;
    }
    
    .footer {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      /* Adjusted to move footer upward */
      margin-top: 10mm;
      /* Added margin-bottom to move footer up by creating space at the bottom */
      margin-bottom: 10mm;
    }

    .footer-logo {
    margin-top: 54px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .footer-logo img {
    padding-top: 16px;
      width: 20mm;
      height: 20mm;
    }
    
    .logo-content {
      display: flex;
      font-size: 3.5mm;
      font-weight: bold;
      color: #666;
      align-items: center;
      gap: 1mm;
    }
    
    .date {
    margin-top: 44px;
      font-size: 3.5mm;
      color: #666;
    }
    
    .qr-code {
      width: 50mm;
      height: 50mm;
    }

    /* Print-specific styles */
    @media print {
      body {
        height: auto;
        background-color: white;
      }
      .certificate {
        box-shadow: none;
        width: 210mm;
        height: 297mm;
      }
    }
  </style>
</head>
<body>
  <div class="certificate">
    <!-- Certificate Background Pattern -->
    <div class="certificate-pattern"></div>
    
    <!-- Watermark -->
    <div class="watermark"></div>

    <!-- Certificate Content -->
    <div class="certificate-content">
      <!-- Header -->
      <div class="header">
        <img src="/images/certificateimg4.png" alt="" class="logo">
        <div class="title-container">
          <h4 class="title">CUSTOMS VERIFICATION</h4>
          <h4 class="subtitle">MANAGEMENT SYSTEM</h4>
        </div>
      </div>

      <!-- Certificate Title -->
      <h2 class="certificate-title">
        CUSTOMS CERTIFICATE
      </h2>
      
      <!-- Certificate Description -->
      <p class="certificate-description">
        This is to certify that the customs duty for the following<br>
        vehicle has been fully paid on the Trade Portal:
      </p>

      <div class="main-content">
        <!-- Vehicle Information -->
        <div class="section">
          <h3 class="section-title">Vehicle Information</h3>
          <div>
            <p class="info-item">
              <span class="info-label">VIN:</span> ${data.vin}
            </p>
            <p class="info-item">
              <span class="info-label">Make:</span> ${data.makeModel}
            </p>
            <p class="info-item">
              <span class="info-label">Model:</span> ${data.model}
            </p>
            <p class="info-item">
              <span class="info-label">Year:</span> ${data.year}
            </p>
          </div>
        </div>

        <!-- Certificate Number -->
        <div class="section">
          <h3 class="section-title">Registration Number</h3>
          <p class="info-item">${data.certificateNumber}</p>
        </div>

        
      </div>

      <!-- Footer -->
      <div class="footer">
        <div class="footer-logo">
          <div class="logo-content">
            <img src="./images/logo.png" alt="">
            <p>NIGERIA 
              <br>
              CUSTOMS 
              <br>
              SERVICE
            </p>
          </div>
          <p class="date">
            This certificate is generated on ${new Date().toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </p>
          
        </div>

        <img src="${qrCodeDataUrl}" class="qr-code" alt="QR Code">
      </div>
    </div>
  </div>
</body>
</html>
  `;
  
  // Generate PDF from HTML
  const element = document.createElement('div');
  element.innerHTML = certificateHtml;
  
  const options = {
    margin: [0, 0, 0, 0],
    filename: `certificate_${data.vin}_${new Date().toISOString()}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      letterRendering: true,
      width: 210 * 3.78, // Convert mm to px (approximately)
      height: 297 * 3.78 // Convert mm to px (approximately)
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait',
      compress: true,
      precision: 16
    }
  };
  
  try {
    await html2pdf().from(element).set(options).save();
  } catch (error) {
    console.error('Error generating PDF:', error);
    
    // Fallback: Open certificate in new tab for printing
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.open();
      newWindow.document.write(certificateHtml);
      newWindow.document.close();
      newWindow.onload = function() {
        newWindow.print();
      };
    } else {
      alert('Please allow pop-ups to view and print your certificate');
    }
  }
};



