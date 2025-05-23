import type React from "react"
import type { BenefitCardProps } from "../../../../landing/types/benefits"

interface CardBenefitsProps {
  cards: BenefitCardProps[]
}

const CardBenefits: React.FC<CardBenefitsProps> = ({ cards }) => {
  return (
    <div className="benefits">
      {cards.map((card, index) => (
        <div key={index} className="benefit-card">
          <h3>{card.title}</h3>
          <p>{card.description}</p>
        </div>
      ))}
    </div>
  )
}

export default CardBenefits

