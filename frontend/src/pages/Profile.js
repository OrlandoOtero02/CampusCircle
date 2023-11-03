import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Logo from '../assets/CampusCircle Logo White.png'
import { useAuthContext } from "../hooks/useAuthContext"

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState('Cool person, lots of hobbies, definitely not a CS nerd');
  const [interests, setInterests] = useState(['Sports', 'Travel', 'Reading']);
  const [editBio, setEditBio] = useState(''); // New state for editing bio
  const [editInterests, setEditInterests] = useState(''); // New state for editing interests
  const { user: currentUser } = useAuthContext();

  useEffect(() => {
      // Fetch user's profile data from the server and update the state (bio and interests).
      axios.get('/api/user/profile/' + currentUser._id)
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
      // Send a request to the server to save the updated profile information.
      axios.patch('/api/user/profile/' + currentUser._id, { bio: editBio, interests: editInterests.split(', ') })
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

  return (
      <div className="Profile">
          <div className="profile-container">
              <div className="profile-content">
                  <h2>Profile Page</h2>
                  <div className="profile-picture">
                      <img src={Logo} alt="Profile" />
                  </div>
                  {isEditing ? (
                      <div className="edit-profile">
                          <h3>Edit Bio:</h3>
                          <textarea
                              value={editBio}
                              onChange={(e) => setEditBio(e.target.value)}
                          />
                          <h3>Edit Interests:</h3>
                          <input
                              type="text"
                              value={editInterests}
                              onChange={(e) => setEditInterests(e.target.value)}
                          />
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
                  <button onClick={toggleEditMode}>
                      {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                  </button>
              </div>
          </div>
      </div>
  );
}

export default Profile;
