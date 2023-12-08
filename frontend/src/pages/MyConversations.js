import { useEffect, useState } from 'react';
import UserConversations from './UserConversations';

const MyConversations = ({ handleSelectUser }) => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`/api/user/`);
        const json = await response.json();

        if (response.ok) {
          setUsers(json.users);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

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
