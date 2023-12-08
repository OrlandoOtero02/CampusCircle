import React, { useEffect, useState } from 'react';
import UserDetails from '../components/UserDetails';
import { useParams, useNavigate } from 'react-router-dom'
import Logo from '../assets/CampusCircle Logo White.png';
import Inbox from './Inbox';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';

const UserProfile = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
  
    const [isReportingOpen, setIsReportingOpen] = useState(false);
    const [reportMessage, setReportMessage] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch('/api/user/getUserById/' + userId);
        const json = await response.json();

        if (response.ok) {
          console.log('User data:', json.user);       
          setUser(json.user);
        } else {
          console.error('Error fetching user details:', json.message);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleSendMessage = () => {
    // Redirect to the inbox page
    navigate('/inbox');
  };

  const handleBlockUser = async () => {
    const currentUserId = JSON.parse(localStorage.getItem('user'))._id;
    const currentUserToken = JSON.parse(localStorage.getItem('user')).token;
    console.log(currentUserId)
    console.log('Blocking user:', user._id);

    const response = await fetch('/api/user/block/' + currentUserId + '/' + user._id, {
      method: 'PUT',
      // body: JSON.stringify(requestBody),
      headers: {
          'Authorization': `Bearer ${currentUserToken}`
      },
    })
    const json = await response.json()

    if (response.ok) {
      // will need to update local frontend
      console.log(json)
    } 

    
};

const handleReportUser = async () => {
  const currentUserToken = JSON.parse(localStorage.getItem('user')).token;

  if (isReportingOpen && reportMessage.trim() !== '') {

    const useridtemp = user._id
      const response = await fetch('/api/report', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${currentUserToken}`
          },
          body: JSON.stringify({
            reportMessage: reportMessage,
            user_id: useridtemp
          }),      });

      if (response.ok) {
          console.log('Report created successfully');
      } else {
          const errorMessage = await response.text();
          console.error('Failed to create report:', errorMessage);
      }

      setReportMessage('');
      setIsReportingOpen(false);
  }
};

const toggleReporting = () => {
  setIsReportingOpen(!isReportingOpen);
};

const handleReportMessageChange = (event) => {
  setReportMessage(event.target.value);
};


  return (
    <div className="user-profile">
      {user ? (
        <div>
          <div className="profile-header">
            <img src={Logo} alt="Profile" className="profile-picture" />
            <h2>{user.username}</h2>

            <Button variant="contained" onClick={handleSendMessage} style={{marginBottom: 10}}>Send Message</Button><br/>
            <Button variant="contained" onClick={handleBlockUser} className="blocking-user-button">Block</Button>
            <button onClick={toggleReporting} className="reporting-user-button">Report</button>

          </div>
          <div className="profile-info">
            <h3>About Me</h3>
            <p>{user.bio}</p>
          </div>
          <div className="profile-info">
            <h3>Interests</h3>
            <ul>
              {user.interests.map((interest, index) => (
                <li key={index}>{interest}</li>
              ))}
            </ul>
          </div>
          <div className="profile-info">
            <h3>Joined Circles</h3>
            <ul>
              {user.joinedCircles.map((circle, index) => (
                <li key={index}>{circle}</li>
              ))}
            </ul>
          </div>
          <Dialog open={isReportingOpen} onClose={toggleReporting}>
                        <DialogTitle>Report User</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Please provide details for your report:
                            </DialogContentText>
                            <TextField
                                multiline
                                rows={4}
                                value={reportMessage}
                                onChange={handleReportMessageChange}
                                label="Report Message"
                                fullWidth
                                variant="outlined"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleReportUser} variant="contained">
                                Submit Report
                            </Button>
                            <Button onClick={toggleReporting} variant="outlined">
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>

  );
};

export default UserProfile;
