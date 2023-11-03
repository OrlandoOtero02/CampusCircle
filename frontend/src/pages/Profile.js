import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Logo from '../assets/CampusCircle Logo White.png';
import { useAuthContext } from '../hooks/useAuthContext';
import Button from '@mui/material/Button';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState(['']);
  const [editBio, setEditBio] = useState(''); // New state for editing bio
  const [editInterests, setEditInterests] = useState(''); // New state for editing interests
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);
  const [error, setError] = useState(''); // State for validation error
  const { user: currentUser } = useAuthContext();

  useEffect(() => {
    // Fetch user's profile data from the server and update the state (bio and interests).
    axios
      .get('/api/user/profile/' + currentUser._id)
      .then((response) => {
        setBio(response.data.bio);
        setInterests(response.data.interests);
        // Set the edit states to the same values as the original data
        setEditBio(response.data.bio);
        setEditInterests(response.data.interests.join(', '));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Validate interests for special characters
    if (hasSpecialCharacters(editInterests)) {
      setError('Special characters are not allowed in interests.');
      return; // Prevent saving
    }

    // Clear any previous errors
    setError('');

    // Send a request to the server to save the updated profile information.
    axios
      .patch('/api/user/profile/' + currentUser._id, { bio: editBio, interests: editInterests.split(', ') })
      .then((response) => {
        // Handle the response, e.g., update the state with the new data
        setBio(response.data.bio);
        setInterests(response.data.interests);
        setIsEditing(false);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  // Function to toggle the edit mode
  const toggleEditMode = () => {
    if (isEditing) {
      // If in edit mode, reset the form fields to the original values
      setEditBio(bio);
      setEditInterests(interests.join(', '));
    }
    setIsEditing(!isEditing);
  };

  // Function to check for special characters in interests
  const hasSpecialCharacters = (text) => {
    const regex = /[!@#$%^&*()_+{}\[\]:;<>.?~\\|]/;
    return regex.test(text);
  };

    // Function to handle profile picture change
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePictureUrl(imageUrl);
    }
  };

  return (
    <div className="Profile">
      <div className="profile-container">
        <div className="profile-content">
          <h2>Profile Page</h2>
          <div className="profile-picture">
            {profilePictureUrl ? (
              <img src={profilePictureUrl} alt="Profile" />
            ) : (
              <img src={Logo} alt="Profile" />
            )}
            {isEditing && (
              <input type="file" accept=".jpg, .jpeg, .png" onChange={handleProfilePictureChange} />
            )}
          </div>
          {isEditing ? (
            <div className="edit-profile">
              <h3>Edit Bio:</h3>
              <textarea value={editBio} onChange={(e) => setEditBio(e.target.value)} />
              <h3>Edit Interests:</h3>
              <input type="text" value={editInterests} onChange={(e) => setEditInterests(e.target.value)} />
              {error && <p className="error-message">{error}</p>}
              <button onClick={handleSaveClick}>Save Profile</button>
            </div>
          ) : (
            <div className="view-profile">
              <div className="bio">
                <h3>Bio:</h3>
                <p>{bio}</p>
              </div>
              <div className="user-interests">
                <h3>Interests:</h3>
                <ul>
                  {interests.map((interest, index) => (
                    <li key={index}>{interest}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <button onClick={toggleEditMode}>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
