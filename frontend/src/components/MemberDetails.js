import React from 'react';
import { Link } from 'react-router-dom';

const MemberDetails = ({ member }) => {
    return (
        <div className="member-details">
            {/* Display member details */}
            <p>{member.username}</p>
            {/* Link to member's profile */}
            <Link to={`/profile/${member._id}`}>View Profile</Link>
        </div>
    );
};

export default MemberDetails;