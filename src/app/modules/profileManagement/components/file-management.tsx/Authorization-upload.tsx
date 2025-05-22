import { useState, ChangeEvent } from 'react';
import { FiChevronUp, FiChevronDown, FiUploadCloud } from 'react-icons/fi';

// interface AuthorizationProps {
//   onUpload: (file: File) => void;
// }

interface AuthorizationProps {
    onUpload: (file: File) => void;
    isSubmitted?: boolean;
  }

  const Authorization: React.FC<AuthorizationProps> = ({ onUpload, isSubmitted }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [downloadingTemplate, setDownloadingTemplate] = useState<boolean>(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      
      // Check file type
      const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(selectedFile.type)) {
        setError('Please upload a PDF, JPG, or PNG file only');
        return;
      }
      
      // Check file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('File size should not exceed 5MB');
        return;
      }
      
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (file) {
      onUpload(file);
      setFile(null);
      setIsExpanded(false);
    }
  };

  const handleDownloadTemplate = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the accordion from toggling
    setDownloadingTemplate(true);
    
    // Simulate download delay
    setTimeout(() => {
      setDownloadingTemplate(false);
      // In a real app, trigger actual download here
    }, 1500);
  };

  return (
    <div className="w-full p-3 sm:p-4 bg-[#F5F7FA] border border-gray-300 rounded-md">
      <div>
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          <div className="pr-2 flex items-center">
            <div className={`w-5 h-5 rounded-full border ${isSubmitted ? 'border-green-500 bg-green-500' : 'border-gray-300'} flex items-center justify-center mr-3`}>
              {isSubmitted && <span className="text-white text-xs">✓</span>}
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-gray-900">Letter of Authorization (PDF, JPG, PNG)</h3>
              <p className="text-xs text-gray-500 mt-1">Upload a letter of authorization signed by your company's secretary or director.</p>
              <button 
                onClick={handleDownloadTemplate}
                className="text-xs text-green-500 hover:text-green-600 font-medium mt-1"
              >
                {downloadingTemplate ? 'Downloading...' : 'Download Template'}
              </button>
            </div>
          </div>
          <div className="text-gray-400 flex-shrink-0">
            {isExpanded ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
          </div>
        </div>
        
        {isExpanded && (
          <div className="mt-4 p-3 sm:p-6 border border-dashed border-gray-300 rounded-md bg-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center">
                <div className="mr-3 sm:mr-4 text-gray-400">
                  <FiUploadCloud size={24} />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-gray-700">Upload your document</p>
                  <p className="text-xs text-gray-500">PDF, JPG, or PNG format • Max. 5MB</p>
                </div>
              </div>
              <button
                onClick={handleUpload}
                className={`px-4 sm:px-6 py-2 ${file ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300 cursor-not-allowed'} text-white font-medium rounded-md transition-colors text-sm w-full sm:w-auto`}
                disabled={!file}
              >
                Upload
              </button>
            </div>
            
            <div className="mt-4 sm:mt-6 text-center">
              <input
                type="file"
                id="authorization-document"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
              />
              <label
                htmlFor="authorization-document"
                className="block w-full cursor-pointer py-4 sm:py-6 px-4 border-2 border-dashed border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <span className="text-xs sm:text-sm text-gray-600">Drag and drop your file here or click to browse</span>
              </label>
              {file && (
                <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-green-600 flex items-center justify-center flex-wrap">
                  <span className="mr-2">✓</span>
                  <span>Selected file: {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)</span>
                </div>
              )}
              {error && (
                <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-red-500">
                  {error}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Authorization;