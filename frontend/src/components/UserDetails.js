// UserDetails.js
import { useState } from 'react'
import { useAuthContext } from "../hooks/useAuthContext"
import Button from '@mui/material/Button';

const UserDetails = ({ user }) => {
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

    return (
        <div className="user-details">
            <h4 style={{display: 'inline'}}>{user.username}</h4>
            <Button style={{float: 'right'}} variant="contained" onClick={handleClick}>
                {isFollowed ? "Unfollow" : "Follow"}
            </Button>
        </div>
    );
};


export default UserDetails