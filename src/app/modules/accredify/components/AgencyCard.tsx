import { Agency } from "../types"

interface AgencyCardProps {
  agency: Agency
}

const AgencyCard = ({ agency }: AgencyCardProps) => {
  // Determine the status class based on the text content
  const getStatusClassName = () => {
    if (agency.status === "Expired") {
      return "text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full";
    }
    return "text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full";
  };

  return (
    <div className="bg-[#F5F5F5] border border-gray-200 rounded-md p-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className=" text-[#000000] font-semibold">{agency.name}</h4>
        <div className="flex items-center">
          <div className="flex">
            {/* {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < agency.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
              />
            ))} */}
          </div>
          {/* <span className="ml-1 text-sm text-gray-600">{agency.rating}/5</span> */}
        </div>
      </div>

      <div className="flex items-center mb-4 gap-2">
      {/* <span className="mr-2 text-green-500">•</span> */}
        <span className={getStatusClassName()}>• {agency.status}</span>
        |
        <span><img src="/icons/locationvector.svg" alt="" /></span>
        <span className="text-xs text-[#000000] ml-2">
           {agency.location}</span>
      </div>

      <div className="mb-4">
        <h5 className="text-sm text-[#000000] font-semibold mb-2">Services offered:</h5>
        <ul className="space-y-1">
          {agency.services.map((service, index) => (
            <li key={index} className="flex items-center  text-[#212121] text-sm">
              <span className="mr-2 text-green-500">•</span>
              {service}
            </li>
          ))}
        </ul>
      </div>

      <button className="w-full border border-[#000000] text-black font-bold py-1 px-4 rounded-sm text-sm hover:bg-gray-50">
        View More →
      </button>
    </div>
  )
}

export default AgencyCard