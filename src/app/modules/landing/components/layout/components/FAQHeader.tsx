interface FAQHeaderProps {
    title?: string
    description?: string
  }
  
  export function FAQHeader({ 
    title = "Frequently Asked Questions",
    description = "Explore our FAQ section for quick and easy answers to the most common questions"
  }: FAQHeaderProps) {
    return (
      <div className="bg-[#2a9f47] text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="max-w-2xl mx-auto">{description}</p>
        </div>
      </div>
    )
  }