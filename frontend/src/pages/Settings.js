import React, { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';

function Settings() {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const { user: currentUser } = useAuthContext();

  const handleResetPassword = (e) => {
    e.preventDefault();
    // Validation logic here
    if (newPassword === confirmNewPassword) {
      // Call API to update password or handle the password change logic
      console.log('Password has been changed to:', newPassword);
      // Reset form or give user feedback
      setNewPassword('');
      setConfirmNewPassword('');
      setShowChangePassword(false); // Hide the form after submitting

      axios.patch('/api/user/updatePassword', { email: currentUser.email, newPassword: newPassword })
          .then((response) => {
              // Handle the response, e.g., show a success message
              console.log(response.data.message);
              // Redirect user or give feedback
          })
          .catch((error) => {
              // Handle any errors
              console.error(error.response.data.error);
          });
  
      console.log('New password is set:', newPassword);
    } else {
      // Handle the error scenario here
      console.log('Passwords do not match');
    }
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
                <h2>Set New Password</h2>
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
                <button type="submit">Set New Password</button>
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