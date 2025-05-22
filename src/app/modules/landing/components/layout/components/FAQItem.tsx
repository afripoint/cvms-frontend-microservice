import { Minus, Plus } from "lucide-react"
import { FAQ } from "../../../types/faq"

interface FAQItemProps {
  faq: FAQ
  isOpen: boolean
  onToggle: (id: number) => void
}

export function FAQItem({ faq, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border border-[#dcdcdc] rounded-lg p-4">
      <div 
        className="flex justify-between items-center cursor-pointer" 
        onClick={() => onToggle(faq.id)}
      >
        <h3 className="font-medium">{faq.question}</h3>
        <button className="bg-[#2a9f47] rounded-full p-1">
          {isOpen ? (
            <Minus className="h-5 w-5 text-white" />
          ) : (
            <Plus className="h-5 w-5 text-white" />
          )}
        </button>
      </div>
      {isOpen && (
        <div className="mt-2">
          {faq.answer}
        </div>
      )}
    </div>
  )
}