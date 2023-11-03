// UsersList.js

import { useEffect, useState } from "react";
//import { useAuthContext } from '../hooks/useAuthContext';
import { useParams } from "react-router-dom";

// components
import UserDetails from '../components/UserDetails';

const CircleUserList = () => {
    const [users, setUsers] = useState(null);
    //const { user } = useAuthContext();
    const {members} = useParams();
    console.log(members)

    const parsedMembers = JSON.parse(members);
    console.log(parsedMembers);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Replace 'currentUserId' with the actual user's ID
                //const currentUserId = '12345'; // Replace with your logic to get the user's ID
                //?currentUserId=${currentUserId}
                const response = await fetch(`/api/user/circleUsers?userIds=${JSON.stringify(parsedMembers)}`);
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
        <div className="split-users-list">
            <div className="users-list">
                <h3>Users</h3>
                {users && users.map((user) => (
                    <UserDetails key={user._id} user={user} />
                ))}
            </div>
        </div>
    );
};

export default CircleUserList;
