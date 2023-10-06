// UsersList.js

import { useEffect, useState } from "react";
// import { useAuthContext } from '../hooks/useAuthContext';

// components
import UserDetails from '../components/UserDetails';

const UsersList = () => {
    const [users, setUsers] = useState(null);
    // const { user } = useAuthContext();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Replace 'currentUserId' with the actual user's ID
                const currentUserId = '12345'; // Replace with your logic to get the user's ID
                const response = await fetch(`/api/user/?currentUserId=${currentUserId}`);
                const json = await response.json();

                if (response.ok) {
                    setUsers(json.users);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }

        // if (user) {
        fetchUsers();
        // }
    }, []);

    return (
        <div className="users-list-home">
            <div className="users-list">
                {users && users.map((user) => (
                    <UserDetails key={user._id} user={user} />
                ))}
            </div>
        </div>
    );
};

export default UsersList;
