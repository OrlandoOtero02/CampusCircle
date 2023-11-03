import React, { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';

function Settings() {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { user: currentUser } = useAuthContext();

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
            <h3>General Settings</h3>
            {/* General settings options */}
          </div>
          <div className="settings-section">
            <h3>Security Settings</h3>
            {/* Security settings options */}
            <button onClick={() => setShowChangePassword(!showChangePassword)} className="change-password-btn">
              Change Password
            </button>
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
            <h3>Notifications</h3>
            {/* Notifications settings options */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;