import React from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const UserConversations = ({ user, onClick }) => {
    return (
        <div className="user-details" onClick={onClick}>
        <h4>{user.username}</h4>
        </div>
    );
};

export default UserConversations;
