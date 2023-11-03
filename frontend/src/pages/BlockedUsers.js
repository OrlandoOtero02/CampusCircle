//BlockedUsers.js
import { useEffect, useState } from "react";
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import UserDetailsFollowing from "../components/UserDetailsFollowing";


const BlockedUsers = () => {
    const [users, setUsers] = useState(null);
    const [showUsers, setShowUsers] = useState(true); // State to control user visibility
    const { user: currentUser } = useAuthContext();
    const currentUserToken = JSON.parse(localStorage.getItem('user')).token;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`/api/user/blockedUsers/` + currentUser._id, {
                    method: 'GET',
                    // body: JSON.stringify(requestBody),
                    headers: {
                         'Authorization': `Bearer ${currentUserToken}`
                    },
                });
                const json = await response.json();

                if (response.ok) {
                    console.log(json.blockedUsers)
                    setUsers(json.blockedUsers);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }

        fetchUsers();
    }, [currentUser._id]);

    const toggleUserVisibility = () => {
        setShowUsers(!showUsers); // Toggle the user visibility
    };

    return (
        <div className="split-users-list">
            <div className="users-list">
                <p onClick={toggleUserVisibility} style={{ cursor: "pointer" }}>
                    Total Users: {users ? users.length : 0} (Click to {showUsers ? "Hide" : "Show"})
                </p>
                {showUsers && users && users.map((user) => (
                <div key={user._id}>
                    <Link to={`/profile/${user._id}`}><UserDetailsFollowing user={user}/></Link>
                </div>
                ))}
            </div>
        </div>
    );
};

export default BlockedUsers;
