import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Settings() {
  const [open, setOpen] = useState(false);

  const handleDeleteAccount = () => {
    // Call the API delete function here
    // API call or any related logic goes here
    // For now, just logging a message
    console.log('Deleting account...');
    setOpen(false); // Close the dialog
  };

  return (
    <div className="Settings">
      <div className="settings-container">
        <div className="settings-content">
          <h2>Settings Page</h2>
          <div className="settings-section">
            <h3>General Settings</h3>
            {/* Add your general settings options here */}
          </div>
          <div className="settings-section">
            <h3>Security Settings</h3>
            {/* Add your security settings options here */}
          </div>
          <div className="settings-section">
            <h3>Notifications</h3>
            {/* Add your notifications settings options here */}
          </div>
          <div className="settings-section">
            <Button variant="contained" color="secondary" onClick={() => setOpen(true)}>
              Delete Account
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
              <DialogTitle>Confirm Account Deletion</DialogTitle>
              <DialogContent>
                <DialogContentText>Are you sure you want to delete your account?</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDeleteAccount} color="secondary">
                  Yes
                </Button>
                <Button onClick={() => setOpen(false)} color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
