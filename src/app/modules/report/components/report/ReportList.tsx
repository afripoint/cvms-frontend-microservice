import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../../core/store';
import { fetchReports } from '../../redux/slices/certificateSlice';
import ReportCard from './ReportCard';


const ReportList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { reports, loading, error } = useSelector((state: RootState) => state.reports);

  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  if (loading) {
    return <div className="text-center py-4">Loading reports...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  if (reports.length === 0) {
    return <div className="text-center py-4">No reports found.</div>;
  }

  return (
    <div className="space-y-4">
      {reports.map(report => (
        <ReportCard key={report.id} report={report} />
      ))}
    </div>
  );
};

export default ReportList;