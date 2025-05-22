// "use client";

// import { useState } from "react";
// // import { useDispatch } from "react-redux"

// import { searchTracking } from "../redux/slices/trackingSlice";
// import { useAppDispatch } from "../../../core/store/hooks";

// const TrackingHero = () => {
//   const [trackingId, setTrackingId] = useState("");
//   //   const dispatch = useDispatch()
//   const dispatch = useAppDispatch();

//   const handleSearch = () => {
//     if (trackingId.trim()) {
//       dispatch(searchTracking(trackingId));
//     }
//   };

//   // Then in your component:

//   return (
//     <div
//       className="relative h-[500px] bg-cover bg-center"
//       style={{ backgroundImage: "url('/images/stutustrackerheroimg.svg')" }}
//     >
//       <div className="absolute inset-0 bg-black bg-opacity-40">
//         <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-white">
//           <h1 className="text-4xl font-bold mb-4 text-center">
//             Track Your Shipment Status
//           </h1>
//           <p className="text-lg mb-8 text-center">
//             Enter tracking ID to get your tracking status report
//           </p>

//           <div className="flex w-full max-w-xl space-x-3">
//             <input
//               type="text"
//               placeholder="Enter bill of lading number"
//               className="flex-grow px-4 py-2 rounded-md text-black focus:outline-none"
//               value={trackingId}
//               onChange={(e) => setTrackingId(e.target.value)}
//             />
//             <button
//               className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium"
//               onClick={handleSearch}
//             >
//               Search
//             </button>
//           </div>

//           <div className="mt-1 mr-96">
//             <a
//               href="#history"
//               className="text-yellow-300 underline text-sm"
//             >
//               View search history
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TrackingHero;


// "use client"

// import type React from "react"

// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { searchTracking } from "../redux/slices/trackingSlice"
// import { useAppDispatch } from "../../../core/store/hooks"

// const TrackingHero = () => {
//   const [trackingId, setTrackingId] = useState("")
//   const dispatch = useAppDispatch()
//   const navigate = useNavigate()

//   const handleSearch = () => {
//     if (trackingId.trim()) {
//       dispatch(searchTracking(trackingId))
//       navigate(`/tracking/${trackingId}`)
//     }
//   }

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter") {
//       handleSearch()
//     }
//   }

//   return (
//     <div
//       className="relative h-[500px] bg-cover bg-center"
//       style={{ backgroundImage: "url('/images/stutustrackerheroimg.svg')" }}
//     >
//       <div className="absolute inset-0 bg-black bg-opacity-40">
//         <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-white">
//           <h1 className="text-4xl font-bold mb-4 text-center">Track Your Shipment Status</h1>
//           <p className="text-lg mb-8 text-center">Enter tracking ID to get your tracking status report</p>

//           <div className="flex w-full max-w-xl space-x-3">
//             <input
//               type="text"
//               placeholder="Enter bill of lading number"
//               className="flex-grow px-4 py-2 rounded-md text-black focus:outline-none"
//               value={trackingId}
//               onChange={(e) => setTrackingId(e.target.value)}
//               onKeyPress={handleKeyPress}
//             />
//             <button
//               className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium"
//               onClick={handleSearch}
//             >
//               Search
//             </button>
//           </div>

//           <div className="mt-1 self-start ml-4 md:ml-[calc(50%-16rem)]">
//             <a href="#history" className="text-yellow-300 hover:text-yellow-200 underline text-sm">
//               View search history
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default TrackingHero




"use client"

import type React from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { searchTracking } from "../redux/slices/trackingSlice"
import { useAppDispatch } from "../../../core/store/hooks"

const TrackingHero = () => {
  const [trackingId, setTrackingId] = useState("")
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSearch = () => {
    if (trackingId.trim()) {
      dispatch(searchTracking(trackingId))
      navigate(`/tracking/${trackingId}`)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div
      className="relative h-[500px] bg-cover bg-center"
      style={{ backgroundImage: "url('/images/stutustrackerheroimg.svg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40">
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl font-bold mb-4 text-center">Track Your Shipment Status</h1>
          <p className="text-lg mb-8 text-center">Enter tracking ID to get your tracking status report</p>

          <div className="flex w-full max-w-xl space-x-3">
            <input
              type="text"
              placeholder="Enter tracking ID"
              className="flex-grow px-4 py-2 rounded-md text-black focus:outline-none"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          <div className="mt-1 self-start ml-4 md:ml-[calc(50%-16rem)]">
            <a href="#history" className="text-yellow-300 hover:text-yellow-200 underline text-sm">
              View search history
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrackingHero