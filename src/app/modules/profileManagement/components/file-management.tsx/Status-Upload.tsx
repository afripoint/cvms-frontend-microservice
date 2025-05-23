import { useState, ChangeEvent } from 'react';
import { FiChevronUp, FiChevronDown, FiUploadCloud } from 'react-icons/fi';

interface StatusProps {
    onUpload: (file: File) => void;
    isSubmitted?: boolean;
  }

  const Status: React.FC<StatusProps> = ({ onUpload, isSubmitted }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

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
      setIsUploading(true);
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 20;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          onUpload(file);
          setIsUploading(false);
        }
      }, 500);
    }
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
              <h3 className="text-xs sm:text-sm font-bold text-gray-900">Status Report Certificate (PDF, JPG, PNG)</h3>
              <p className="text-xs text-gray-500 mt-1">Upload a recent company status certificate.</p>
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
                  <p className="text-xs text-gray-500">PDF format • Max. 5MB</p>
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
            
            {isUploading && file ? (
              <div className="mt-4 sm:mt-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 flex-shrink-0 bg-red-100 flex items-center justify-center rounded mr-3">
                    <span className="font-bold text-red-500">PDF</span>
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Status Certificate.pdf</span>
                      <span className="text-sm text-gray-500">{uploadProgress}% uploaded</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                    <div className="mt-1 text-xs text-gray-500">5MB</div>
                  </div>
                  <button className="ml-3 text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-4 sm:mt-6 text-center">
                <input
                  type="file"
                  id="status-document"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="status-document"
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
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Status;