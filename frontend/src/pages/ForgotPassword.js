import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import Modal from 'react-modal';
import axios from 'axios';
import { useAuthContext } from "../hooks/useAuthContext";

Modal.setAppElement('#root'); // Set your app's root element

const ForgotPassword = () => {
    const { user:currentUser } = useAuthContext()
    const [email, setEmail] = useState('');
    const [resetCode, setResetCode] = useState('');
    const [userInputResetCode, setUserInputResetCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCodeVerified, setIsCodeVerified] = useState(false);
    const [error, setError] = useState('');

    // Function to generate a random reset code
    const generateResetCode = () => {
        return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit code
    };

    // Function to send reset email using EmailJS
    const sendResetEmail = () => {
        const code = generateResetCode();
        const templateParams = {
            user_email: email,
            reset_code: code,
        };

        emailjs.send('gmail', 'template_0jut49c', templateParams, '0omg1lWhloRpnABDq')
            .then((response) => {
                console.log('Reset email successfully sent!', response.text);
                setResetCode(code);
                setIsModalOpen(true); // Open the modal after sending the email
            }, (error) => {
                console.error('Failed to send reset email.', error.text);
                setError('Failed to send reset email. Please try again later.');
            });
    };

    // Handler for submitting the email for reset
    const handleSubmitEmail = (e) => {
        e.preventDefault();
        sendResetEmail();
    };

    // Handler for when the user submits the reset code
    const handleVerifyCode = (e) => {
        e.preventDefault();
        if (userInputResetCode === resetCode) {
            setIsCodeVerified(true); // Set code verification state to true
            setIsModalOpen(false); // Close the modal
        } else {
            setError('The reset code is incorrect. Please try again.');
        }
    };

    // Handler for when the user sets a new password
    const handleResetPassword = (e) => {
      e.preventDefault();
      if (newPassword !== confirmNewPassword) {
          console.log("new password doesn't match confirm new password");
          setError('Passwords do not match.');
          return;
      }
  
      // Assuming `email` is the state that holds the user's email address
      axios.patch('/api/user/updatePassword', { email: email, newPassword: newPassword })
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
      // Reset states or redirect as needed
      setIsCodeVerified(false);  // Assuming this state controls modal or form visibility
  };

    return (
        <div>
            {/* Email Form */}
            <form onSubmit={handleSubmitEmail}>
                <h2>Reset Password</h2>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="Enter your email"
                    required
                />
                <button type="submit">Send Reset Email</button>
                {error && <div className="error">{error}</div>}
            </form>

            {/* Reset Code Verification Modal */}
            <Modal isOpen={isModalOpen} contentLabel="Enter Reset Code">
                <form onSubmit={handleVerifyCode}>
                    <h2>Enter Reset Code</h2>
                    <input
                        type="text"
                        onChange={(e) => setUserInputResetCode(e.target.value)}
                        value={userInputResetCode}
                        placeholder="Enter reset code"
                        required
                    />
                    <button type="submit">Verify Code</button>
                </form>
                {error && <div className="error">{error}</div>}
            </Modal>

            {/* New Password Set Form - Render this form only if the code is verified */}
            {isCodeVerified && (
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
    );
};

export default ForgotPassword;