import { useState, useEffect, useRef } from "react";

interface ContactSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactSupportModal = ({ isOpen, onClose }: ContactSupportModalProps) => {
  const [vin, setVin] = useState("");
  const [email, setEmail] = useState("");
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Ref for the modal content
  const modalRef = useRef<HTMLDivElement>(null);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Make sure target exists and is an Element (which has the closest method)
      const target = event.target as Node;
      if (isDropdownOpen && target && !(target instanceof Element && target.closest(".dropdown-container"))) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Handle modal scroll position
  useEffect(() => {
    if (isOpen && modalRef.current) {
      // Ensure the modal is scrolled to the top when opened
      modalRef.current.scrollTop = 0;
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ vin, email, issueType, description, selectedFile });
    // Reset form
    setVin("");
    setEmail("");
    setIssueType("");
    setDescription("");
    setSelectedFile(null);
    // Close modal
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const issueOptions = ["I paid customs duties", "System error", "Payment issue", "Other"];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-screen flex flex-col"
        style={{ maxHeight: "calc(100vh - 2rem)" }}
      >
        {/* Header - Fixed at the top */}
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white rounded-t-lg z-10">
          <h2 className="text-lg font-medium">Contact Support</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 bg-[#F5F7FA] border border-[#F5F7FA] rounded-xl p-1"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Scrollable Body */}
        <div 
          ref={modalRef}
          className="overflow-y-auto p-4 flex-grow"
          style={{ overscrollBehavior: "contain" }}
        >
          <p className="text-sm text-gray-700 mb-4">
            Fill out the form with accurate information, and we will get back to you as
            quickly as possible to address your inquiry.
          </p>

          <form onSubmit={handleSubmit}>
            {/* VIN */}
            <div className="mb-4">
              <label htmlFor="vin" className="block text-sm font-medium text-gray-700 mb-1">
                VIN<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="vin"
                value={vin}
                onChange={(e) => setVin(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="JSGDJGIU2ETUQ2EGQUE"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="johndoe12@gmail.com"
                required
              />
            </div>

            {/* Issue Type */}
            <div className="mb-4 dropdown-container">
              <label htmlFor="issueType" className="block text-sm font-medium text-gray-700 mb-1">
                Issue Type<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div
                  className="w-full px-3 py-2 border border-gray-300 rounded-md cursor-pointer bg-white flex justify-between items-center"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span>{issueType || "Select issue type"}</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 text-gray-500 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`}
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </div>
                {isDropdownOpen && (
                  <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-20 max-h-40 overflow-y-auto">
                    {issueOptions.map((option) => (
                      <div
                        key={option}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setIssueType(option);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description<span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none"
                placeholder="Please describe your issue in detail"
                rows={4}
                required
              />
            </div>

            {/* Attachment */}
            <div className="mb-4">
              <label htmlFor="attachment" className="block text-sm font-medium text-gray-700 mb-1">
                Attachment
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => document.getElementById("file-input")?.click()}
                  className="w-full px-3 py-2 bg-[#F5F7FA] border border-gray-300 rounded-md text-gray-700 text-center flex items-center justify-center"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 mr-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" 
                    />
                  </svg>
                  {selectedFile ? selectedFile.name : "Select file"}
                </button>
                <input
                  type="file"
                  id="file-input"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".jpg,.png,.pdf"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Files supported: JPG, PNG, PDF | Max size: 10MB
              </p>
            </div>
          </form>
        </div>
        
        {/* Footer - Fixed at the bottom */}
        <div className="p-4 border-t sticky bottom-0 bg-white rounded-b-lg">
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactSupportModal;