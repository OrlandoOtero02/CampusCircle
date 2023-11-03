import React, { useEffect, useState } from 'react';
import UserDetails from '../components/UserDetails';
import { useParams } from 'react-router-dom';

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

  return (
    // <div className="user-profile">
    //   {user ? (
    //     <div>
    //       {user.email}
    //       {user.username}
    //       {/* Add more user profile information here */}
    //     </div>
    //   ) : (
    //     <p>Loading user profile...</p>
    //   )}
    // </div>
    <div className="user-profile">
      {user ? (
        <div>
          <div className="profile-header">
            <img src={user.profilePicture} alt="Profile" className="profile-picture" />
            <h2>{user.username}</h2>
          </div>
          <div className="profile-info">
            <h3>About Me</h3>
            <p>{user.bio}</p>
          </div>
          <div className="profile-info">
            <h3>Interests</h3>
            <ul>
              {/* {user.interests.map((interest, index) => (
                <li key={index}>{interest}</li>
              ))} */}
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
