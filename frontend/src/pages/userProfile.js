import React, { useEffect, useState } from 'react';
import UserDetails from '../components/UserDetails';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
    const { userId } = useParams();
    console.log('User ID from useParams:', userId);    
    const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`/api/user/getUserById/${userId}`);
        const json = await response.json();

        if (response.ok) {
            setUser(json.user);
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
    <div className="user-profile">
      {user ? (
        <div>
          <UserDetails user={user} />
          {/* Add more user profile information here */}
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};

export default UserProfile;
