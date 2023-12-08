// UserConversations.js
import { useState } from 'react'
import { useAuthContext } from "../hooks/useAuthContext"

const UserConversations = ({ user }) => {
    const { user:currentUser } = useAuthContext()
    const [isFollowed, setIsFollowed] = useState(false);


    const handleClick = async() => {
        const response = await fetch('/api/user/follow/' + user._id + '/' + currentUser._id, {
            method: 'PUT',
            // body: JSON.stringify(requestBody),
            headers: {
                'Authorization': `Bearer ${currentUser.token}`
            },
        })
        const json = await response.json()

        if (response.ok) {
            // will need to update local frontend
            console.log(json)
            setIsFollowed(!isFollowed);

        } 
    }


    const spanClassName = isFollowed ? "followed" : "not-followed";

    return (
        <div className="user-details">
            <h4>{user.username}</h4>
            <span className={spanClassName} onClick={handleClick}>
                {isFollowed ? "Unfollow" : "Follow"}
            </span>
        </div>
    );
};


export default UserConversations;