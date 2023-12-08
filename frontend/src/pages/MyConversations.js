import { useEffect, useState } from 'react';
import UserConversations from './UserConversations';
import { useAuthContext } from '../hooks/useAuthContext';

const MyConversations = ({ handleSelectUser }) => {
  const { user } = useAuthContext();
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`/api/user/`);
        const json = await response.json();

        if (response.ok) {
          // Filter out the current user from the list
          const filteredUsers = json.users.filter((u) => u._id !== user._id);
          setUsers(filteredUsers);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [user._id]);

  return (
    <div className="split-users-list">
      <div className="users-list">
        <h2>Users</h2>
        {users &&
          users.map((user) => (
            <UserConversations
              key={user._id}
              user={user}
              onClick={() => handleSelectUser(user._id)}
            />
          ))}
      </div>
    </div>
  );
};

export default MyConversations;
