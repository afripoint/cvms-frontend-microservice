"use client"

import { useState, useEffect } from "react"
import { ChevronRight, Clock, Play, FileText, X } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
// Simple cn utility function (in case the imported one is problematic)
const clsx = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ')
}
import { guides } from "../modules/landing/lib/data"
import { MainLayout } from "../modules/landing/components/layout"
// Removed problematic Tabs import

// Custom Modal Component
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black bg-opacity-20 hover:bg-opacity-30 text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>
  )
}

export default function UserGuidePage() {
  const navigate = useNavigate()
  const [selectedVideo, setSelectedVideo] = useState<null | (typeof guides)[0]>(null)
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery] = useState("") // Removed unused setter
  const [filteredGuides, setFilteredGuides] = useState(guides)

  // Filter guides based on active tab and search query
  useEffect(() => {
    let result = guides

    // Filter by tab
    if (activeTab !== "all") {
      result = result.filter((guide) => guide.type === activeTab)
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (guide) => guide.title.toLowerCase().includes(query) || guide.description.toLowerCase().includes(query),
      )
    }

    setFilteredGuides(result)
  }, [activeTab, searchQuery])

  const handleGuideClick = (guide: (typeof guides)[0]) => {
    if (guide.type === "video") {
      // Check if we should directly go to YouTube
      const isExternalVideo = guide.contentUrl && !guide.content;
      if (isExternalVideo) {
        // Open YouTube in a new tab
        window.open(guide.contentUrl, "_blank");
      } else {
        // Show video in modal
        setSelectedVideo(guide);
      }
    } else if (guide.type === "article") {
      if (guide.redirectTo) {
        navigate(guide.redirectTo)
      } else {
        setSelectedVideo(guide)
      }
    }
  }

  // Function to convert YouTube URL to embed URL
  const getYoutubeEmbedUrl = (url: string) => {
    // Handle different YouTube URL formats
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    if (match && match[2].length === 11) {
      // Return proper embed URL with autoplay
      return `https://www.youtube.com/embed/${match[2]}?autoplay=1`;
    }
    
    // If we can't parse the URL, return the original
    return url;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <MainLayout>
        {/* Hero Banner */}
        <div className="bg-[#2a9f47] text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-4">User Guide</h1>
            <p className="max-w-2xl mx-auto">
              Explore our FAQ section for quick and easy answers
              <br />
              to the most common questions
            </p>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-[#667085] ml-32">
            <Link to="/resources" className="hover:text-[#2a9f47]">
              Resources
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span>User Guide</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="container mx-auto px-4 mb-8 ml-28">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab("all")}
              className={clsx(
                "px-6 py-2 rounded-full text-sm font-medium transition-colors",
                activeTab === "all" ? "bg-[#2a9f47] text-white" : "hover:bg-gray-100",
              )}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab("article")}
              className={clsx(
                "px-6 py-2 rounded-full text-sm font-medium transition-colors",
                activeTab === "article" ? "bg-[#2a9f47] text-white" : "hover:bg-gray-100",
              )}
            >
              Articles
            </button>
            <button
              onClick={() => setActiveTab("video")}
              className={clsx(
                "px-6 py-2 rounded-full text-sm font-medium transition-colors",
                activeTab === "video" ? "bg-[#2a9f47] text-white" : "hover:bg-gray-100",
              )}
            >
              Videos
            </button>
          </div>
        </div>

        {/* Video Grid */}
        <div className="max-w-5xl mx-auto container px-4 mb-16">
          {filteredGuides.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-700">No guides found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGuides.map((guide) => (
                <div
                  key={guide.id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 cursor-pointer transition-transform hover:scale-[1.02]"
                  onClick={() => handleGuideClick(guide)}
                >
                  <div className="relative">
                    <img
                      src={guide.thumbnail || "/placeholder.svg"}
                      alt={guide.title}
                      width={400}
                      height={225}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black bg-opacity-50 rounded-full p-3">
                        {guide.type === "video" ? (
                          <Play className="h-6 w-6 text-white" fill="white" />
                        ) : (
                          <FileText className="h-6 w-6 text-white" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{guide.title}</h3>
                    <p className="text-sm text-[#667085] mb-3">{guide.description}</p>
                    <div className="flex items-center text-xs text-[#667085]">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>
                        {guide.duration} minutes {guide.type === "video" ? "watch" : "read"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Video Modal */}
        <Modal isOpen={!!selectedVideo} onClose={() => setSelectedVideo(null)}>
          {selectedVideo && (
            <div className="flex flex-col">
              <div className="relative pt-[56.25%] bg-black rounded-t-lg overflow-hidden">
                {selectedVideo.type === "video" && selectedVideo.contentUrl ? (
                  <iframe
                    src={getYoutubeEmbedUrl(selectedVideo.contentUrl)}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 overflow-y-auto">
                    <div className="p-6 max-w-2xl">
                      <h2 className="text-xl font-bold mb-4">{selectedVideo.title}</h2>
                      <div className="prose">
                        {selectedVideo.content ? (
                          <div dangerouslySetInnerHTML={{ __html: selectedVideo.content }} />
                        ) : (
                          <p>No content available</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold">{selectedVideo.title}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {selectedVideo.duration} minutes {selectedVideo.type === "video" ? "watch" : "read"}
                </p>
                <p className="mt-3">{selectedVideo.description}</p>
              </div>
            </div>
          )}
        </Modal>
      </MainLayout>
    </div>
  )
}