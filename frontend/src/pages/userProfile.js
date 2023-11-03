import React, { useEffect, useState } from 'react';
import UserDetails from '../components/UserDetails';
import { useParams } from 'react-router-dom';
import Logo from '../assets/CampusCircle Logo White.png';

const UserProfile = () => {
    const { userId } = useParams();
    //console.log('User ID from useParams:', userId);    
    const [user, setUser] = useState(null);
  
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        //console.log("five nights at freddies")
        //console.log(userId)
        const response = await fetch('/api/user/getUserById/' + userId);

        const json = await response.json();

        if (response.ok) {
          //setUser(json.user);
          console.log("lets see what we got")
          console.log('User data:', json.user);       
          setUser(json.user);
        } else {
          console.error('Error fetching user details:', json.message);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleBlockUser = async () => {
    const currentUserId = JSON.parse(localStorage.getItem('user'))._id;
    const currentUserToken = JSON.parse(localStorage.getItem('user')).token;
    console.log(currentUserId)
    console.log('Blocking user:', user._id);

    


    const response = await fetch('/api/user/block/' + currentUserId + '/' + user._id, {
      method: 'PUT',
      // body: JSON.stringify(requestBody),
      headers: {
          'Authorization': `Bearer ${currentUserToken}`
      },
    })
    const json = await response.json()

    if (response.ok) {
      // will need to update local frontend
      console.log(json)
    } 




};

  return (
    <div className="user-profile">
      {user ? (
        <div>
          <div className="profile-header">
            <img src={user.profilePicture} alt="Profile" className="profile-picture" />
            <h2>{user.username}</h2>
            <button onClick={handleBlockUser} className="blocking-user-button">Block</button>
          </div>
          <div className="profile-info">
            <h3>About Me</h3>
            <p>{user.bio}</p>
          </div>
          <div className="profile-info">
            <h3>Interests</h3>
            <ul>
              {user.interests.map((interest, index) => (
                <li key={index}>{interest}</li>
              ))}
            </ul>
          </div>
          <div className="profile-info">
            <h3>Joined Circles</h3>
            <ul>
              {user.joinedCircles.map((circle, index) => (
                <li key={index}>{circle}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>

  );
};

export default UserProfile;
