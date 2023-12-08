import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import Button from '@mui/material/Button';

const ReportDetails = ({ report }) => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);

  const handleResolve = async () => {
    if (!user) {
      setError('You must be logged in');
      return;
    }

    const response = await fetch(`/api/report/resolve/${report._id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      console.log(json);
    }
  };

  const handleBan = async () => {
    // Add your logic for handling the "Ban" button click here
    console.log('Ban button clicked');
  };

  const textColor = document.body.className === 'dark' ? 'white' : 'black';

  return (
    <div className="report-details">
      <h4 style={{ color: textColor }}>{report.content}</h4>
      <p>User ID: {report.user_id}</p>
      <p>Created at: {formatDistanceToNow(new Date(report.createdAt), { addSuffix: true })}</p>
      <Button onClick={handleResolve}>Resolve Report</Button>
      <Button onClick={handleBan} style={{ marginLeft: '10px' }}>Ban</Button>
    </div>
  );
};

export default ReportDetails;
