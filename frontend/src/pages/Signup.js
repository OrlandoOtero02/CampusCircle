import React, { useState } from 'react';
import { useSignup } from '../hooks/useSignup';
import emailjs from 'emailjs-com';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // This line is important for accessibility reasons. Replace '#root' with your app's root element.

const Signup = () => {
    // State hooks for form inputs and modal
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [userInputCode, setUserInputCode] = useState('');
    const [verificationError, setVerificationError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Custom hook for signing up
    const { signup, isLoading, error } = useSignup();

    // Function to generate a random verification code
    const generateVerificationCode = () => {
        return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit code as a string
    };

    // Function to send an email using EmailJS
    const sendConfirmationEmail = (name, userEmail) => {
        const code = generateVerificationCode();
        const templateParams = {
            user_name: name,
            user_email: userEmail,
            verification_code: code,
        };

        emailjs.send('gmail', 'template_jdag35a', templateParams, '0omg1lWhloRpnABDq')
            .then((response) => {
                console.log('Email successfully sent!', response.text);
                setVerificationCode(code);
                setIsModalOpen(true); // Open the modal after sending the email
            }, (error) => {
                console.error('Failed to send email.', error.text);
            });
    };

    // Handler for when the signup form is submitted
    const handleSubmit = (e) => {
        e.preventDefault();
        setPasswordError('');

        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match.');
            return;
        }

        // Send confirmation email and show the verification modal
        sendConfirmationEmail(username, email);
    };

    // Handler for when the verification code is submitted
    const handleVerificationSubmit = (e) => {
        e.preventDefault();
        if (userInputCode === verificationCode) {
            // If verification is successful, sign up the user
            signup(email, password, username, birthdate).then((result) => {
                if (result && result.success) {
                    // Close the modal and redirect user or sign them in
                    setIsModalOpen(false);
                    // Additional logic for signing the user in
                } else {
                    // Handle signup error
                    console.error('Signup error:');
                }
            });
        } else {
            setVerificationError('The verification code is incorrect. Please try again.');
        }
    };

    // JSX for the signup form and the verification modal
    return (
        <div>
            <form className="signup" onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                {/* Email field */}
                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />
                {/* Username field */}
                <label htmlFor="username">Username:</label>
                <input
                    id="username"
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required
                />
                {/* Password field */}
                <label htmlFor="password">Password:</label>
                <input
                    id="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
                {/* Confirm password field */}
                <label htmlFor="confirm-password">Retype Password:</label>
                <input
                    id="confirm-password"
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    required
                />
                {/* Birthdate field */}
                <label htmlFor="birthdate">Birthdate:</label>
                <input
                    id="birthdate"
                    type="date"
                    onChange={(e) => setBirthdate(e.target.value)}
                    value={birthdate}
                    required
                />
                {/* Submit button */}
                <button type="submit" disabled={isLoading}>Sign up</button>
                {/* Error display */}
                {passwordError && <div className="error">{passwordError}</div>}
            </form>

            {/* Verification Modal */}
            <Modal isOpen={isModalOpen} contentLabel="Verification Code">
                <form onSubmit={handleVerificationSubmit}>
                    <h2>Verification</h2>
                    <p>Please enter the code sent to your email:</p>
                    <input
                        type="text"
                        onChange={(e) => setUserInputCode(e.target.value)}
                        value={userInputCode}
                        placeholder="Enter verification code"
                        required
                    />
                    <button type="submit" disabled={isLoading}>Verify</button>
                    {verificationError && <div className="error">{verificationError}</div>}
                </form>
            </Modal>

            {/* Signup Error display */}
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default Signup;