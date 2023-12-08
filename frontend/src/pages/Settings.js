
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

function Settings() {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { user: currentUser } = useAuthContext();
  const { logout } = useLogout();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [dmPreference, setDmPreference] = useState('');

  
  
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);
  

  const handleDeleteAccount = async () => {
    if (inputValue === 'DELETE') {
      fetch('/api/user/deleteUser/' + currentUser._id, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${currentUser.token}`
        }
      });

      logout();

      console.log('Deleting account...');
      setOpen(false); // Close the dialog
    } else {
      alert('Input does not match the required string.');
    }
  };

  const handleUpdateSettings = (e) => {
    e.preventDefault();
  
    axios.patch('/api/user/updateUserSettings/' + currentUser._id, {
      dmPreference: dmPreference,
      // Include other settings if needed
    })
      .then((response) => {
        console.log('Settings have been updated:', response.data);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          console.error('Error updating settings:', error.response.data.error);
        } else {
          console.error('Error updating settings:', error.message);
        }
      });
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    // Clear any previous error
    setPasswordError('');

    // Validate new passwords match
    if (newPassword !== confirmNewPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }

    // API call to update password
    axios.patch('/api/user/updateUserPassword', {
      email: currentUser.email,
      oldPassword: oldPassword,
      newPassword: newPassword
    })
      .then((response) => {
        // Handle success response
        console.log('Password has been changed:', response.data.message);
        // Reset form and possibly give user feedback
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setShowChangePassword(false);
      })
      .catch((error) => {
        // Handle errors, such as incorrect old password
        console.error('Error changing password:', error.response.data.error);
        setPasswordError(error.response.data.error);
      });

  };

    return (
      <div className="Settings">
        <div className="settings-container">
          <div className="settings-content">
            <h2>Settings Page</h2>
            <div className="settings-section">

          <div className="settings-section">
            <h3>Theme Settings</h3>
            <label>
              Dark Mode
              <input
                type="checkbox"
                checked={theme === 'dark'}
                onChange={toggleTheme}
              />
            </label>
          </div>

          <div className="settings-section">
            <h3>Security Settings</h3>
            </div>

            <label style={{ marginBottom: 10 }}>
              Direct Message Preference:
              <select
                value={dmPreference}
                style={{ marginLeft: 10 }}
                onChange={(e) => setDmPreference(e.target.value)}
              >
                <option value="everyone">Everyone</option>
                <option value="friends">Only Friends</option>
                <option value="noone">No One</option>
              </select>
            </label>

            <form onSubmit={handleUpdateSettings}>
                <Button variant="contained" type="submit">Update Settings</Button>
              </form>

            <div className="settings-section">
              <h3>General Settings</h3>
            </div>

              <Button style={{ marginBottom: 10 }} variant="contained" onClick={() => setShowChangePassword(!showChangePassword)} className="change-password-btn">
                Change Password
              </Button>
              {showChangePassword && (
                <form onSubmit={handleResetPassword}>
                  <h2>Change Password</h2>
                  <input
                    type="password"
                    onChange={(e) => setOldPassword(e.target.value)}
                    value={oldPassword}
                    placeholder="Enter current password"
                    required
                  />
                  <input
                    type="password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                    placeholder="Enter new password"
                    required
                  />
                  <input
                    type="password"
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    value={confirmNewPassword}
                    placeholder="Confirm new password"
                    required
                  />
                  <button type="submit">Update Password</button>
                  {passwordError && <div className="error-message">{passwordError}</div>}
                </form>
              )}
            </div>
            <div className="settings-section">
              <Button variant="contained" onClick={() => setOpen(true)}>
                Delete Account
              </Button>
              <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Confirm Account Deletion</DialogTitle>
                <DialogContent>
                  <DialogContentText>Are you sure you want to delete your account?</DialogContentText>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type 'DELETE' to confirm"
                  />
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
