//FollowingList.js
import { useEffect, useState } from "react";
import { useAuthContext } from '../hooks/useAuthContext';
import UserDetails from '../components/UserDetails';
import { Link } from 'react-router-dom'


const FollowingList = () => {
    const [users, setUsers] = useState(null);
    const [showUsers, setShowUsers] = useState(true); // State to control user visibility
    const { user: currentUser } = useAuthContext();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`/api/user/getFollowingUsers/` + currentUser._id);
                const json = await response.json();

                if (response.ok) {
                    setUsers(json.following);
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
                {/* <h3>Following</h3> */}
                <p onClick={toggleUserVisibility} style={{ cursor: "pointer" }}>
                    Total Users: {users ? users.length : 0} (Click to {showUsers ? "Hide" : "Show"})
                </p>
                {showUsers && users && users.map((user) => (
                    <UserDetails key={user._id} user={user} />
                ))}
                {users && users.map((user) => (
                <div key={user._id}>
                    console.log('User ID:', user._id);
                    <Link to={`/profile/${user._id}`}>View Profile</Link>
                {/* <Link to={`/profile/${user._id}`}>View Profile</Link> */}
                <UserDetails user={user} />
                </div>
                ))}
            </div>
        </div>
    );
};

export default FollowingList;
