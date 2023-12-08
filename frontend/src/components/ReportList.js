import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import ReportDetails from './ReportDetails'; // Assuming you have a ReportDetails component

const ReportList = () => {
  const { user } = useAuthContext();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('/api/report', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });

        if (response.ok) {
          const json = await response.json();
          setReports(json.reports);
        } else {
          console.error('Failed to fetch reports:', response.statusText);
        }
      } catch (error) {
        console.error('Error while fetching reports:', error.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchReports();
    }
  }, [user]);

  return (
    <div>
      <h2>Report List</h2>
      {loading ? (
        <p>Loading reports...</p>
      ) : (
        <ul>
          {reports.map((report) => (
            <li key={report._id}>
              <ReportDetails report={report} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReportList;
