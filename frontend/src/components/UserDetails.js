// UserDetails.js
//import { useAuthContext } from "../hooks/useAuthContext"

const UserDetails = ({ user }) => {

    const handleClick = async() => {
        // if (!user) {
        //     return
        // }
        const response = await fetch('/api/user/' + user._id, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            // will need to update local frontend
            console.log(json)
        }
    }


    return (
        <div className="user-details">
            <h4>{user.username}</h4>
            <span onClick={handleClick}>follow</span>
        </div>
    );
};


export default UserDetails