import { useState } from "react";
import type React from "react";



type TabType = "chat" | "call" | "faqs" | "articles";

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab] = useState<TabType>("chat");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "chat":
        return (
          <div className="h-96 flex flex-col">
            {/* Chat header */}
            <div className="bg-green-400 p-4 flex items-center">
              <button onClick={() => setIsOpen(false)} className="mr-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 19l-7-7 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="bg-white rounded-full p-2 mr-2">
                <img src="/icons/company.png" alt="Company" width={20} height={20} />
              </div>
              <span className="text-white text-lg">Chat with us now</span>
            </div>
            
            {/* Chat content */}
            <div className="flex-grow p-4 flex flex-col items-center justify-center">
              <img src="/icons/agent.png" alt="Support Agent" className="w-40 mb-4" />
              <p className="text-gray-500 text-center mb-2">We're online!</p>
              <p className="text-gray-400 text-center">We are here to help you</p>
            </div>
            
            {/* Powered by tag */}
            <div className="p-2 text-center border-t text-xs text-gray-500">
              <span>Driven by SalesIQ</span>
            </div>
          </div>
        );
      
      case "call":
        return (
          <div className="h-96 flex flex-col">
            {/* Call header */}
            <div className="bg-green-400 p-4 flex items-center">
              <button onClick={() => setIsOpen(false)} className="mr-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 19l-7-7 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="bg-white rounded-full p-2 mr-2">
              <img src="/icons/company.png" alt="Company" width={20} height={20} />
              </div>
              <span className="text-white text-lg">Call us now</span>
            </div>
            
            {/* Call form */}
            <div className="flex-grow p-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full p-3 border rounded mb-3"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full p-3 border rounded mb-3"
              />
              <button className="bg-green-400 hover:bg-green-500 text-white p-3 rounded flex items-center justify-center w-40 mx-auto">
                <svg width="16" height="16" className="mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 2H4a2 2 0 00-2 2v16a2 2 0 002 2h16a2 2 0 002-2V4a2 2 0 00-2-2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 9l4 4 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Call Now
              </button>
            </div>
            
            {/* Powered by tag */}
            <div className="p-2 text-center border-t text-xs text-gray-500">
              <span>Driven by SalesIQ</span>
            </div>
          </div>
        );
      
      case "faqs":
        return (
          <div className="h-96 flex flex-col">
            {/* FAQs header */}
            <div className="bg-green-400 p-4">
              <h2 className="text-white text-xl">FAQs</h2>
            </div>
            
            {/* Search bar */}
            <div className="p-3 bg-gray-100">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for an FAQ"
                  className="w-full p-2 pl-8 bg-white rounded"
                />
                <svg className="absolute left-2 top-3 w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            {/* FAQ categories */}
            <div className="p-4 flex-grow overflow-y-auto">
              <div className="border rounded-lg p-4 mb-4 flex justify-between items-center">
                <div>
                  <h3 className="font-medium">General</h3>
                  <p className="text-gray-500 text-sm">10 FAQs</p>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="border-t grid grid-cols-4">
              <button className="py-3 flex flex-col items-center text-xs text-gray-500">
                <svg className="w-5 h-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
              </button>
              <button className="py-3 flex flex-col items-center text-xs text-gray-500">
                <svg className="w-5 h-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Conversation
              </button>
              <button className="py-3 flex flex-col items-center text-xs text-green-500 border-t-2 border-green-500">
                <svg className="w-5 h-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                FAQs
              </button>
              <button className="py-3 flex flex-col items-center text-xs text-gray-500">
                <svg className="w-5 h-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Articles
              </button>
            </div>
            
            {/* Powered by tag */}
            <div className="p-2 text-center border-t text-xs text-gray-500">
              <span>Driven by SalesIQ</span>
            </div>
          </div>
        );
      
      case "articles":
        return (
          <div className="h-96 flex flex-col">
            {/* Articles header */}
            <div className="bg-green-400 p-4">
              <h2 className="text-white text-xl">Articles</h2>
            </div>
            
            {/* Search bar */}
            <div className="p-3 bg-gray-100">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for an article"
                  className="w-full p-2 pl-8 bg-white rounded"
                />
                <svg className="absolute left-2 top-3 w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            {/* Article categories */}
            <div className="p-4 flex-grow overflow-y-auto">
              <div className="border rounded-lg p-4 mb-4 flex justify-between items-center">
                <div>
                  <h3 className="font-medium">General</h3>
                  <p className="text-gray-500 text-sm">1 Article</p>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="border-t grid grid-cols-4">
              <button className="py-3 flex flex-col items-center text-xs text-gray-500">
                <svg className="w-5 h-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
              </button>
              <button className="py-3 flex flex-col items-center text-xs text-gray-500">
                <svg className="w-5 h-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Conversation
              </button>
              <button className="py-3 flex flex-col items-center text-xs text-gray-500">
                <svg className="w-5 h-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                FAQs
              </button>
              <button className="py-3 flex flex-col items-center text-xs text-green-500 border-t-2 border-green-500">
                <svg className="w-5 h-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Articles
              </button>
            </div>
            
            {/* Powered by tag */}
            <div className="p-2 text-center border-t text-xs text-gray-500">
              <span>Driven by SalesIQ</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button 
          onClick={toggleWidget} 
          className="bg-green-400 hover:bg-green-500 rounded-full p-3 shadow-lg"
        >
          <img src="/icons/Chaticon.svg" alt="Chat" width={25} height={25} />
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-xl overflow-hidden" style={{width: "320px"}}>
          {renderTabContent()}
        </div>
      )}
    </div>
  );
};

export default ChatWidget;