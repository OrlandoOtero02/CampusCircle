import React from 'react';
import FollowingList from './FollowingList';

function Profile() {
  return (
    <div className="Profile">
      <div className="profile-container">
        <div className="profile-content">
          <h2>Profile Page</h2>
          <div className="profile-picture">
            {/* Insert your profile picture here */}
            <img src="profile-picture.jpg" alt="Profile" />
          </div>
          <div className="bio">
            <h3>Bio:</h3>
            <p>Cool guy, lots of hobbies, definitely not a CS nerd</p>
          </div>
          <div className="user-interests">
            <h3>Interests:</h3>
            <ul>
              <li>Sports</li>
              <li>Travel</li>
              <li>Reading</li>
            </ul>
          </div>
        </div>
        <button>Edit Profile</button>
        <FollowingList/>
      </div>
    </div>
  );
}

export default Profile;

