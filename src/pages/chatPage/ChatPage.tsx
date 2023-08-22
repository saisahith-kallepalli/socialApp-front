import React, { useState } from 'react';
import './ChatPage.scss'; // Import the SCSS file
import { List, ListItem, ListItemText, Avatar, Paper } from '@mui/material';

interface User {
  id: number;
  name: string;
  avatar: string;
}

 const ChatPage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const users: User[] = [
    { id: 1, name: 'User 1', avatar: 'U1' },
    { id: 2, name: 'User 2', avatar: 'U2' },
    { id: 3, name: 'User 3', avatar: 'U3' },
    // Add more users as needed
  ];

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  return (
    <div className="root">
      <div className="sidebar">
        <List>
          {users.map((user) => (
            <ListItem button key={user.id} onClick={() => handleUserClick(user)}>
              <Avatar className="avatar">{user.avatar}</Avatar>
              <ListItemText primary={user.name} />
            </ListItem>
          ))}
        </List>
      </div>
      <div className="chatContainer">
        {selectedUser ? (
          <Paper elevation={3} style={{ padding: '20px',height:`100%` }}>
            {/* Display chat messages here */}
            <h2>{selectedUser.name} Chat</h2>
            {/* Add your chat components here */}
          </Paper>
        ) : (
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center',height:`100%` }}>
            Select a user to start chatting
          </Paper>
        )}
      </div>
    </div>
  );
};
export default ChatPage
