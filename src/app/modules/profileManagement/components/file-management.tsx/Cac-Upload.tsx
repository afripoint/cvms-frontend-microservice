// import { useState, ChangeEvent } from 'react';
// import { FiChevronUp, FiChevronDown, FiUploadCloud } from 'react-icons/fi';

// interface CACUploadProps {
//   onUpload: (file: File) => void;
// }

// const CACUpload: React.FC<CACUploadProps> = ({ onUpload }) => {
//   const [isExpanded, setIsExpanded] = useState<boolean>(false);
//   const [file, setFile] = useState<File | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setError(null);
//     if (e.target.files && e.target.files.length > 0) {
//       const selectedFile = e.target.files[0];
      
//       // Check file type
//       const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
//       if (!validTypes.includes(selectedFile.type)) {
//         setError('Please upload a PDF, JPG, or PNG file only');
//         return;
//       }
      
//       // Check file size (max 5MB)
//       if (selectedFile.size > 5 * 1024 * 1024) {
//         setError('File size should not exceed 5MB');
//         return;
//       }
      
//       setFile(selectedFile);
//     }
//   };

//   const handleUpload = () => {
//     if (file) {
//       onUpload(file);
//       setFile(null);
//       setIsExpanded(false);
//     }
//   };

//   return (
//     <div className="w-full p-3 sm:p-4 bg-[#F5F7FA] border border-gray-300 rounded-md">
//       <div>
//         <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
//           <div className="pr-2">
//             <h3 className="text-xs sm:text-sm font-bold text-gray-900">CAC Incorporation Certificate (PDF, JPG, PNG)</h3>
//             <p className="text-xs text-gray-500 mt-1">Upload a scanned or photographed copy of your CAC Certificate.</p>
//           </div>
//           <div className="text-gray-400 flex-shrink-0">
//             {isExpanded ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
//           </div>
//         </div>
        
//         {isExpanded && (
//           <div className="mt-4 p-3 sm:p-6 border border-dashed border-gray-300 rounded-md bg-white">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//               <div className="flex items-center">
//                 <div className="mr-3 sm:mr-4 text-gray-400">
//                   <FiUploadCloud size={32} />
//                 </div>
//                 <div>
//                   <p className="text-xs sm:text-sm font-bold text-gray-700">Upload your document</p>
//                   <p className="text-xs text-gray-500">PDF, JPG, or PNG format • Max. 5MB</p>
//                 </div>
//               </div>
//               <button
//                 onClick={handleUpload}
//                 className={`px-4 sm:px-6 py-2 ${file ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300 cursor-not-allowed'} text-white font-medium rounded-md transition-colors text-sm w-full sm:w-auto`}
//                 disabled={!file}
//               >
//                 Upload
//               </button>
//             </div>
            
//             <div className="mt-4 sm:mt-6 text-center">
//               <input
//                 type="file"
//                 id="cac-document"
//                 className="hidden"
//                 accept=".pdf,.jpg,.jpeg,.png"
//                 onChange={handleFileChange}
//               />
//               <label
//                 htmlFor="cac-document"
//                 className="block w-full cursor-pointer py-4 sm:py-6 px-4 border-2 border-dashed border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
//               >
//                 <span className="text-xs sm:text-sm text-gray-600">Drag and drop your file here or click to browse</span>
//               </label>
//               {file && (
//                 <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-green-600 flex items-center justify-center flex-wrap">
//                   <span className="mr-2">✓</span>
//                   <span>Selected file: {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)</span>
//                 </div>
//               )}
//               {error && (
//                 <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-red-500">
//                   {error}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CACUpload;




import { useState, ChangeEvent } from 'react';
import { FiChevronUp, FiChevronDown, FiUploadCloud } from 'react-icons/fi';

interface CACUploadProps {
  onUpload: (file: File) => void;
  isSubmitted?: boolean;
}

const CACUpload: React.FC<CACUploadProps> = ({ onUpload, isSubmitted }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      // Don't reset file and expanded state immediately to show success state
      // setFile(null);
      // setIsExpanded(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const selectedFile = files[0];
      
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
      setError(null);
    }
  };

  return (
    <div className="w-full">
      {/* Header - Clickable to expand/collapse */}
      <div 
        className="flex justify-between items-center cursor-pointer p-3 sm:p-4 bg-[#F5F7FA] border border-gray-300 rounded-md hover:bg-gray-50 transition-colors" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <div className={`w-5 h-5 rounded-full border ${isSubmitted ? 'border-green-500 bg-green-500' : 'border-gray-300'} flex items-center justify-center mr-3`}>
            {isSubmitted && <span className="text-white text-xs">✓</span>}
          </div>
          <span className="text-sm font-medium text-gray-700">
            CAC Document {isSubmitted && '(Uploaded)'}
          </span>
        </div>
        
        <div className="text-gray-400 flex-shrink-0">
          {isExpanded ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
        </div>
      </div>
      
      {/* Upload Section - Only visible when expanded */}
      {isExpanded && (
        <div className="mt-2 p-4 sm:p-6 border border-gray-200 rounded-md bg-white shadow-sm">
          {/* Upload Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div className="flex items-center">
              <div className="mr-3 sm:mr-4 text-gray-400">
                <FiUploadCloud size={32} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-700">Upload your CAC document</p>
                <p className="text-xs text-gray-500">PDF, JPG, or PNG format • Max. 5MB</p>
              </div>
            </div>
            <button
              onClick={handleUpload}
              className={`px-4 sm:px-6 py-2 ${
                file ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300 cursor-not-allowed'
              } text-white font-medium rounded-md transition-colors text-sm w-full sm:w-auto`}
              disabled={!file}
            >
              {isSubmitted ? 'Re-upload' : 'Upload'}
            </button>
          </div>
          
          {/* Drop Zone */}
          <div className="text-center">
            <input
              type="file"
              id="cac-document"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
            />
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="w-full cursor-pointer py-6 sm:py-8 px-4 border-2 border-dashed border-gray-300 rounded-md hover:bg-gray-50 hover:border-gray-400 transition-colors"
              onClick={() => document.getElementById('cac-document')?.click()}
            >
              <FiUploadCloud className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-medium">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">
                PDF, JPG, PNG up to 5MB
              </p>
            </div>
            
            {/* File Selected Feedback */}
            {file && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                <div className="flex items-center justify-center text-sm text-green-700">
                  <span className="mr-2">✓</span>
                  <span className="font-medium">Selected: </span>
                  <span className="ml-1">{file.name}</span>
                  <span className="ml-2 text-green-600">
                    ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                  </span>
                </div>
              </div>
            )}
            
            {/* Error Message */}
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
            
            {/* Success Message */}
            {isSubmitted && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm text-blue-700">
                  ✓ CAC document uploaded successfully
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CACUpload;