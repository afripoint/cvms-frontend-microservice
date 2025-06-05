"use client"

import { Check, X, AlertTriangle, CheckCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Card } from "../../../shared/components/ui"
import Button from "../../../shared/components/ui/Button"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { addReport } from "../../../report/redux/slices/certificateSlice"

type VerificationStatus = "pending" | "verified" | "failed"

interface SuccessPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  amount: number
  transactionId: string
  transactionDate: string
  paymentMethod: string
  verificationStatus?: VerificationStatus
  items: Array<{
    id: string
    name: string
    quantity: number
    price: number
    type: string
    vin?: string
  }>
}

// Loading Spinner Component
// const LoadingSpinner = () => (
//   <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//   </svg>
// )

export default function SuccessPaymentModal({
  isOpen,
  onClose,
  amount,
  transactionId,
  transactionDate,
  paymentMethod,
  verificationStatus = "pending",
  items = [],
}: SuccessPaymentModalProps) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isOpen) return
    
    console.log("Success Modal Transaction Details:", {
      amount,
      transactionId,
      verificationStatus,
      items,
    })
    
    items.forEach((item, index) => {
      if (item.vin || item.id.includes('vin')) {
        const vin = item.vin || `${index+1}`
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
  }, [isOpen, amount, transactionId, items, verificationStatus, dispatch])

  const handleDownload = async () => {
    navigate("/certificate")
  }

  const handlePrintReceipt = () => {
    const printWindow = window.open('', '_blank', 'width=800,height=600')
    
    if (!printWindow) {
      console.error("Failed to open print window. Popup might be blocked.")
      alert("Failed to open print window. Please allow popups for this site.")
      return
    }
    
    const totalItemsPrice = items.reduce((total, item) => total + item.price * item.quantity, 0)

    // Generate receipt HTML content
    const receiptContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Payment Receipt</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            max-width: 400px;
            margin: 0 auto;
            position: relative;
            z-index: 1;
          }
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
            width: 120%;
            max-width: 600px;
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
          .amount {
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
          window.onload = function() {
            window.print();
          }
        </script>
      </body>
      </html>
    `;
    
    printWindow.document.write(receiptContent);
    printWindow.document.close();
    
    console.log("Printing receipt for transaction:", transactionId);
  }

  const handleCloseModal = () => {
    onClose()
  }

  // Calculate totals
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalItemsPrice = items.reduce((total, item) => total + item.price * item.quantity, 0)

  // Render verification status indicator
  const renderVerificationStatus = () => {
    switch (verificationStatus) {
      case 'pending':
        // return (
        //   <div className="flex items-center justify-center text-yellow-600 bg-yellow-50 p-2 rounded-md mb-3">
        //     <LoadingSpinner />
        //     <span className="text-xs">Verifying payment...</span>
        //   </div>
        // )
      case 'verified':
        return (
          <div className="flex items-center justify-center text-green-600 bg-green-50 p-2 rounded-md mb-3">
            <CheckCircle size={16} className="mr-2" />
            <span className="text-xs">Payment verified ✓</span>
          </div>
        )
      case 'failed':
        return (
          <div className="flex items-center justify-center text-red-600 bg-red-50 p-2 rounded-md mb-3">
            <AlertTriangle size={16} className="mr-2" />
            <span className="text-xs">Verification pending - Contact support</span>
          </div>
        )
      default:
        return null
    }
  }

  if (!isOpen) return null

  return (
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

          {/* Verification Status */}
          {renderVerificationStatus()}

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
          <Button 
            className="w-full bg-green-500 hover:bg-green-600 text-white text-xs py-2" 
            onClick={handleDownload}
          >
            Proceed
          </Button>
          {/* <Button variant="outline" className="w-full text-xs py-2" onClick={handlePrintReceipt}>
            Print Receipt
          </Button>
          <Button 
            className="w-full bg-green-500 hover:bg-green-600 text-white text-xs py-2" 
            onClick={handleDownload}
            disabled={verificationStatus === 'pending'}
          >
            {verificationStatus === 'pending' ? 'Verifying...' : 'Proceed'}
            
          </Button> */}
        </div>
      </Card>
    </div>
  ) 
}