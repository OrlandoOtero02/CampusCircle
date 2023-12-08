// UserDetailsFollowing.js

const UserDetailsFollowing = ({ user }) => {

    return (
        <div className="user-details">
            <h4 className="following">{user.username}</h4>
        </div>
    );
};


export default UserDetailsFollowing