import { useState, useEffect } from "react";
import type React from "react";

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  

  useEffect(() => {
    // Initialize Zoho SalesIQ when component mounts
    const script1 = document.createElement('script');
    script1.innerHTML = "window.$zoho=window.$zoho || {};$zoho.salesiq=$zoho.salesiq||{ready:function(){}}";
    document.body.appendChild(script1);
    
    const script2 = document.createElement('script');
    script2.id = "zsiqscript";
    script2.src = "https://salesiq.zohopublic.com/widget?wc=siqacd9cecd07ee295d552104b3e32c2a05790b8305e675c92d7087f12cf4b0245a";
    script2.defer = true;
    document.body.appendChild(script2);

    // Cleanup function to remove scripts when component unmounts
    return () => {
      if (script1.parentNode) {
        script1.parentNode.removeChild(script1);
      }
      if (script2.parentNode) {
        script2.parentNode.removeChild(script2);
      }
    };
  }, []);

  const toggleWidget = () => {
    setIsOpen(!isOpen);
    
    // If Zoho SalesIQ is available, show/hide the widget
    if (isOpen) {
      if (window.$zoho && window.$zoho.salesiq) {
        window.$zoho.salesiq.floatwindow.visible('hide');
      }
    } else {
      if (window.$zoho && window.$zoho.salesiq) {
        window.$zoho.salesiq.floatwindow.visible('show');
      }
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
        <div className="bg-white rounded-lg shadow-xl overflow-hidden w-80">
          {/* Chat widget content will go here based on activeTab */}
          {/* Close button */}
          <button 
            onClick={toggleWidget}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          
          {/* Here we would typically render different content based on activeTab */}
          {/* This is where Zoho SalesIQ will insert its chat widget */}
          <div id="zsiqwidget"></div>
        </div>
      )}
    </div>
  );
};

// Add TypeScript declaration for Zoho SalesIQ
declare global {
  interface Window {
    $zoho: {
      salesiq: {
        floatwindow: {
          visible: (state: 'show' | 'hide') => void;
        };
        [key: string]: any;
      };
      [key: string]: any;
    };
  }
}

export default ChatWidget;