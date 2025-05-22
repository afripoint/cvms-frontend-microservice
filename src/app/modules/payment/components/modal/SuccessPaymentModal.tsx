"use client"

import { Check, X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Card } from "../../../shared/components/ui"
import Button from "../../../shared/components/ui/Button"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { addReport } from "../../../report/redux/slices/certificateSlice"
//import {  VehicleCertificateData } from "../../../report/types"


interface SuccessPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  amount: number
  transactionId: string
  transactionDate: string
  paymentMethod: string
  items: Array<{
    id: string
    name: string
    quantity: number
    price: number
    type: string
    vin?: string // Optional VIN from cart item
  }>
}

export default function SuccessPaymentModal({
  isOpen,
  onClose,
  amount,
  transactionId,
  transactionDate,
  paymentMethod,
  items = [],
}: SuccessPaymentModalProps) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    // Log transaction details to verify all data is correctly passed
    console.log("Success Modal Transaction Details:", {
      amount,
      transactionId,
      items,
    })
    
    // Add reports to the store based on purchased items
    items.forEach((item, index) => {
      if (item.vin || item.id.includes('vin')) {
        // Extract VIN from item if available, or generate one based on transaction
        const vin = item.vin || `${index+1}`
        
        // Add a new report to the store for this purchase
        dispatch(addReport({
          id: Date.now() + index,
          title: item.name,
          vin,
          action: 'download',
          downloadUrl: `/api/reports/${transactionId}/download`,
          isCertificate: true,
          
        }))
      }
    })
  }, [amount, transactionId, transactionDate, paymentMethod, items, dispatch])

  const  handleDownload = async () => {

    // Find the first item with a VIN to pass to the certificate page
    // const firstVinItem = items.find(item => item.vin || item.id.includes('vin'))
    // const vin = firstVinItem?.vin

    
  //  };
    
    // Navigate to certificate page with state parameters
    // navigate("/certificate", { 
    //   state: { 
    //     fromPayment: true,
    //     transactionId,
    //     vin
    //   } 
    // })

    navigate("/certificate" 
    
    )
  }

  // const handlePrintReceipt = () => {
  //   // Create a new window for printing
  //   const printWindow = window.open('', '_blank', 'width=800,height=600');
    
  //   // Check if window was successfully created
  //   if (!printWindow) {
  //     console.error("Failed to open print window. Popup might be blocked.");
  //     alert("Failed to open print window. Please allow popups for this site.");
  //     return;
  //   }
    
  //   // Generate receipt HTML content
  //   const receiptContent = `
  //     <!DOCTYPE html>
  //     <html>
  //     <head>
  //       <title>Payment Receipt - ${transactionId}</title>
  //       <style>
  //         body {
  //           font-family: Arial, sans-serif;
  //           padding: 20px;
  //           max-width: 400px;
  //           margin: 0 auto;
  //         }
  //         .receipt-header {
  //           text-align: center;
  //           border-bottom: 1px solid #eee;
  //           padding-bottom: 10px;
  //           margin-bottom: 15px;
  //         }
  //         .logo {
  //           max-width: 80px;
  //           margin-bottom: 8px;
  //         }
  //         .receipt-title {
  //           font-size: 18px;
  //           font-weight: bold;
  //           margin: 5px 0;
  //         }
  //         .transaction-id {
  //           font-size: 12px;
  //           color: #666;
  //           margin-bottom: 15px;
  //         }
  //         .amount {
  //           font-size: 24px;
  //           font-weight: bold;
  //           margin: 15px 0;
  //         }
  //         .detail-label {
  //           font-size: 12px;
  //           color: #666;
  //           text-transform: uppercase;
  //           margin-top: 15px;
  //           margin-bottom: 5px;
  //         }
  //         .detail-row {
  //           display: flex;
  //           justify-content: space-between;
  //           margin-bottom: 8px;
  //           font-size: 14px;
  //         }
  //         .detail-value {
  //           font-weight: 500;
  //         }
  //         .items-section {
  //           margin: 15px 0;
  //           border-bottom: 1px solid #eee;
  //           padding-bottom: 15px;
  //         }
  //         .footer {
  //           text-align: center;
  //           font-size: 12px;
  //           color: #666;
  //           margin-top: 20px;
  //           border-top: 1px solid #eee;
  //           padding-top: 15px;
  //         }
  //         @media print {
  //           body {
  //             print-color-adjust: exact;
  //             -webkit-print-color-adjust: exact;
  //           }
  //         }
  //       </style>
  //     </head>
  //     <body>
  //       <div class="receipt-header">
  //         <img src="/images/logo.png" alt="Customs Verification" class="logo" />
  //         <div class="receipt-title">Customs Verification Management System</div>
  //         <div class="transaction-id">Receipt #${transactionId}</div>
  //       </div>
        
  //       <div class="detail-label">Status</div>
  //       <div class="amount">Payment Successful!</div>
        
  //       <div class="detail-label">Amount</div>
  //       <div class="amount">₦${amount.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        
  //       <div class="items-section">
  //         <div class="detail-label">Items</div>
  //         ${items.map(item => `
  //           <div class="detail-row">
  //             <span>${item.name} (${item.quantity})</span>
  //             <span class="detail-value">₦${(item.price * item.quantity).toLocaleString("en-NG")}.00</span>
  //           </div>
  //         `).join('')}
          
  //         <div class="detail-row" style="margin-top: 10px;">
  //           <span><strong>Total Items</strong></span>
  //           <span class="detail-value"><strong>₦${totalItemsPrice.toLocaleString("en-NG")}.00</strong></span>
  //         </div>
  //       </div>
        
  //       <div class="detail-label">Transaction Details</div>
  //       <div class="detail-row">
  //         <span>Amount Paid</span>
  //         <span class="detail-value">₦${amount.toLocaleString("en-NG")}.00</span>
  //       </div>
  //       <div class="detail-row">
  //         <span>Payment Method</span>
  //         <span class="detail-value">${paymentMethod}</span>
  //       </div>
  //       <div class="detail-row">
  //         <span>Transaction ID</span>
  //         <span class="detail-value">#${transactionId}</span>
  //       </div>
  //       <div class="detail-row">
  //         <span>Transaction Date</span>
  //         <span class="detail-value">${transactionDate}</span>
  //       </div>
        
  //       <div class="footer">
  //         Thank you for your payment.<br>
  //         For any questions, please contact support.
  //       </div>
        
  //       <script>
  //         // Auto print and close
  //         window.onload = function() {
  //           window.print();
  //           // Uncomment the line below if you want the window to close after printing
  //           // window.setTimeout(function() { window.close(); }, 500);
  //         }
  //       </script>
  //     </body>
  //     </html>
  //   `;
    
  //   // Write content to the new window
  //   printWindow.document.write(receiptContent);
  //   printWindow.document.close();
    
  //   console.log("Printing receipt for transaction:", transactionId);
  // };


  const handlePrintReceipt = () => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    
    // Check if window was successfully created
    if (!printWindow) {
      console.error("Failed to open print window. Popup might be blocked.");
      alert("Failed to open print window. Please allow popups for this site.");
      return;
    }
    
    // Generate receipt HTML content
    const receiptContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>custom payment reciept</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            max-width: 400px;
            margin: 0 auto;
            position: relative;
            z-index: 1;
          }
          /* Watermark styles */
          .watermark {
            position: fixed;
            top: -6;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            display: flex;
            justify-content: center;
            align-items: center;
            pointer-events: none;
          }
          .watermark img {
            opacity: 0.04;
            width: 120%;  /* Increased from 80% */
            max-width: 600px;  /* Increased from 350px */
    
          }
          .receipt-header {
            text-align: center;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
           
          }
          .logo {
            max-width: 80px;
          }
          .receipt-title {
            font-size: 18px;
            font-weight: bold;
            margin: 5px 0;
            margin-bottom: 80px;
          }
          .transaction-id {
            font-size: 12px;
            color: #666;
            margin-bottom: 15px;
          }
          .amount {
          display-flex: between;
            font-size: 24px;
            font-weight: bold;
            margin: 15px 0;
          }
          .detail-label {
            font-size: 12px;
            color: #666;
            text-transform: uppercase;
            margin-top: 15px;
            margin-bottom: 5px;
            
          }
          .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            font-size: 14px;
          }
          .detail-value {
            font-weight: 500;
          }
          .items-section {
            margin: 15px 0;
            border-bottom: 1px solid #eee;
            padding-bottom: 15px;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: #666;
            margin-top: 20px;
            border-top: 1px solid #eee;
            padding-top: 15px;
          }
          @media print {
            body {
              print-color-adjust: exact;
              -webkit-print-color-adjust: exact;
            }
            .watermark {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          }
        </style>
      </head>
      <body>
        <!-- Watermark -->
        <div class="watermark">
          <img src="/images/logo.png" alt="Official Watermark" />
        </div>
        
        <div class="receipt-header">
          <img src="/images/logo.png" alt="Customs Verification" class="logo" />
          <div class="receipt-title">Customs Verification Management System</div>
          
        </div>
        
        <div class="detail-label">Status</div>
        <div class="amount">Payment Successful!</div>
        
        
        
        <div class="items-section">
          <div class="detail-label">Items</div>
          ${items.map(item => `
            <div class="detail-row">
              <span>${item.name} (${item.quantity})</span>
              <span class="detail-value">₦${(item.price * item.quantity).toLocaleString("en-NG")}.00</span>
            </div>
          `).join('')}
          
          <div class="detail-row" style="margin-top: 10px;">
            <span><strong>Total Items</strong></span>
            <span class="detail-value"><strong>₦${totalItemsPrice.toLocaleString("en-NG")}.00</strong></span>
          </div>
        </div>
        
        <div class="detail-label">Transaction Details</div>
        <div class="detail-row">
          <span>Amount Paid</span>
          <span class="detail-value">₦${amount.toLocaleString("en-NG")}.00</span>
        </div>
        <div class="detail-row">
          <span>Payment Method</span>
          <span class="detail-value">${paymentMethod}</span>
        </div>
        <div class="detail-row">
          <span>Transaction ID</span>
          <span class="detail-value">#${transactionId}</span>
        </div>
        <div class="detail-row">
          <span>Transaction Date</span>
          <span class="detail-value">${transactionDate}</span>
        </div>
        
        
        
        <script>
          // Auto print and close
          window.onload = function() {
            window.print();
            // Uncomment the line below if you want the window to close after printing
            // window.setTimeout(function() { window.close(); }, 500);
          }
        </script>
      </body>
      </html>
    `;
    
    // Write content to the new window
    printWindow.document.write(receiptContent);
    printWindow.document.close();
    
    console.log("Printing receipt for transaction:", transactionId);
  };
  const handleCloseModal = () => {
    // This will trigger the onClose function in the parent component
    // which will clear the cart
    onClose()
  }

  // Calculate total quantity
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)

  // Calculate total item price
  const totalItemsPrice = items.reduce((total, item) => total + item.price * item.quantity, 0)

  return isOpen ? (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 pb-2 mt-16">
      <Card className="bg-white w-full max-w-md relative">
        <button
          onClick={handleCloseModal}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center pt-4 pb-3">
          <div className="bg-green-100 rounded-full p-1 mb-1">
            <Check className="h-5 w-5 text-green-500" />
          </div>
          <div className="bg-green-100 p-2 rounded-md">
            <img src="/icons/badge.svg" alt="Receipt" className="h-10 w-10" />
          </div>

          <h2 className="text-base font-medium mt-3">Payment Successful!</h2>

          <div className="w-full text-center mt-3">
            <p className="text-xs text-gray-500">Amount</p>
            <p className="text-xl font-bold">
              ₦
              {amount ? amount.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "0.00"}
            </p>
            <p className="text-[10px] text-gray-500 mt-1">
              {transactionDate} • Transaction ID: #{transactionId}
            </p>
          </div>
        </div>

        <div className="border-t p-3">
          <h3 className="font-medium mb-2 text-sm">Payment Details</h3>

          <div className="space-y-1">
            {items && items.length > 0 && (
              <div className="flex justify-between text-xs">
                <span>VIN SEARCH ({totalQuantity})</span>
                <span className="font-medium">Total: ₦{totalItemsPrice.toLocaleString("en-NG")}.00</span>
              </div>
            )}

            <div className="pt-2 mt-2 border-t">
              <p className="text-[10px] text-gray-500 uppercase mb-1">DETAIL TRANSACTION</p>

              <div className="flex justify-between text-xs">
                <span>Amount paid</span>
                <span className="font-medium">₦{amount ? amount.toLocaleString("en-NG") : "0"}.00</span>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span>Payment Method</span>
                <span className="font-medium">{paymentMethod}</span>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span>Transaction ID</span>
                <span className="font-medium">#{transactionId}</span>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span>Transaction Date</span>
                <span className="font-medium">{transactionDate}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 p-3">
          <Button variant="outline" className="w-full text-xs py-2" onClick={handlePrintReceipt}>
            Print Receipt
          </Button>
          <Button className="w-full bg-green-500 hover:bg-green-600 text-white text-xs py-2" onClick={handleDownload}>
            Proceed
          </Button>
        </div>
      </Card>
    </div>
  ) : null
}





