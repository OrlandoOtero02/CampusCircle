import React, { useState, useEffect } from 'react';

function Settings() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);

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
            <h3>Notifications</h3>
            {/* Add your notifications settings options here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
