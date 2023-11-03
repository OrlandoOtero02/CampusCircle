//FollowingList.js
import { useEffect, useState } from "react";
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom'
import UserDetailsFollowing from "../components/UserDetailsFollowing";


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

    // Determine the text color based on the theme (light or dark)
    const textColor = document.body.className === "dark" ? "black" : "black";

    const toggleUserVisibility = () => {
        setShowUsers(!showUsers); // Toggle the user visibility
    };

    return (
        <div className="split-users-list">
            <div className="users-list">
      //go back
                <h3 style={{ color: textColor }}>Following</h3>
            
                {/* <h3>Following</h3> */}
                <p onClick={toggleUserVisibility} style={{ cursor: "pointer" }}>
                    Total Users: {users ? users.length : 0} (Click to {showUsers ? "Hide" : "Show"})
                </p>
                {/* {showUsers && users && users.map((user) => (
                    <UserDetails key={user._id} user={user} />
                ))} */}
                {showUsers && users && users.map((user) => (
                <div key={user._id}>
                    <Link to={`/profile/${user._id}`}><UserDetailsFollowing user={user}/></Link>
                {/* <Link to={`/profile/${user._id}`}>View Profile</Link> */}
                </div>
                ))}
            </div>
        </div>
    );
};

export default FollowingList;
