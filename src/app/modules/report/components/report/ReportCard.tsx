import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../core/store';
import { downloadReport, downloadCertificate } from '../../redux/slices/certificateSlice';
import { Report } from '../../types/index';

interface ReportCardProps {
  report: Report;
}

const ReportCard: FC<ReportCardProps> = ({ report }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAction = () => {
    if (report.isCertificate) {
      dispatch(downloadCertificate(report.id));
    } else {
      dispatch(downloadReport(report.id));
    }

    // Trigger the actual download if URL is available
    if (report.downloadUrl) {
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = report.downloadUrl;
      link.setAttribute('download', `${report.title.replace(/\s+/g, '-')}-${report.vin}.pdf`);
      link.setAttribute('target', '_blank');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow-sm flex justify-between items-center">
      <div className="flex items-center">
        <img src="/images/fileVINSearch.svg" alt="" width={70} />
        <div className="ml-4">
          <h3 className="font-medium">{report.title}</h3>
          <p className="text-sm text-gray-600">VIN: {report.vin}</p>
        </div>
      </div>
      
      <button 
        className="bg-green-500 text-white rounded-md px-4 py-2 text-sm"
        onClick={handleAction}
      >
        {report.isCertificate ? 'Download Certificate' : 'Download Report'}
      </button>
    </div>
  );
};

export default ReportCard;


// <!-- Owner Information -->
        // <div class="section">
        //   <h3 class="section-title">Owner's Information</h3>
        //   <div>
        //     <p class="info-item">
        //       <span class="info-label">Name:</span> ${data.ownerName}
        //     </p>
        //     <p class="info-item">
        //       <span class="info-label">Address:</span> ${data.ownerAddress}
        //     </p>
        //   </div>
        // </div>