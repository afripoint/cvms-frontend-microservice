import type React from "react"
import type { ContactMethodCardProps } from "../../../types/contact"

const ContactMethodCard: React.FC<ContactMethodCardProps> = ({ icon, title, detail }) => (
  <article className="flex gap-2 items-start p-4 rounded-lg border border-solid bg-neutral-100 border-neutral-200">
    <div className="flex-shrink-0">{icon}</div>
    <div className="flex flex-col gap-1">
      <h3 className="text-lg font-medium tracking-normal text-black">{title}</h3>
      <p className="text-xs tracking-normal text-zinc-600">{detail}</p>
    </div>
  </article>
)

export default ContactMethodCard

