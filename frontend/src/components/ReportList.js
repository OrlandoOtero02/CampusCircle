import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const ReportList = () => {
  const { user } = useAuthContext();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getReports = async () => {
      try {
        const response = await fetch('/api/reports', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        const data = await response.json();

        if (response.ok) {
          setReports(data);
        } else {
          console.error('Failed to fetch reports:', data.message);
        }
      } catch (error) {
        console.error('Error while fetching reports:', error.message);
      } finally {
        setLoading(false);
      }
    };

    getReports();
  }, [user.token]);

  return (
    <div>
      <h2>Report List</h2>
      {loading ? (
        <p>Loading reports...</p>
      ) : (
        <ul>
          {reports.map((report) => (
            <li key={report.id}>
              {/* Display the report information */}
              <p>{`Report ID: ${report.id}`}</p>
              <p>{`Title: ${report.title}`}</p>
              <p>{`Description: ${report.description}`}</p>
              {/* Add other fields as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReportList;
