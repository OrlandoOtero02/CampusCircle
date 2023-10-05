// ForgotPassword.js
import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    // Implement your forgot password logic here
    // You can send a reset password email or take any other necessary action
    // and update the 'message' state with the appropriate message.
  };

  return (
    <div className="forgot-password">
      <h3>Forgot Password</h3>
      <form onSubmit={handleForgotPassword}>
        <label>Email:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default ForgotPassword;
