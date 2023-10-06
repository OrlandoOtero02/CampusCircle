// FollowingList.js

import { useEffect, useState } from "react";
import { useAuthContext } from '../hooks/useAuthContext';

// components
import UserDetails from '../components/UserDetails';

const FollowingList = () => {
    const [users, setUsers] = useState(null);
    const { user: currentUser } = useAuthContext();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Replace 'currentUserId' with the actual user's ID
                //const currentUserId = '12345'; // Replace with your logic to get the user's ID
                //?currentUserId=${currentUserId}
                //CHANGEEe
                const response = await fetch(`/api/user/getFollowingUsers/` + currentUser._id);
                const json = await response.json();

                if (response.ok) {
                    setUsers(json.following);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }

        // if (user) {
        fetchUsers();
        // }
    }, [currentUser._id]);

    return (
        <div className="split-users-list">
            <div className="users-list">
                <h3>Following</h3>
                {users && users.map((user) => (
                    <UserDetails key={user._id} user={user} />
                ))}
            </div>
        </div>
    );
};

export default FollowingList;
