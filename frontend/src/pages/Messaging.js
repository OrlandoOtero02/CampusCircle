import React, { useState, useEffect } from 'react';
//import io from 'socket.io-client';
//import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import { 
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
} from '@chatscope/chat-ui-kit-react';

//const socket = io('http://your-server-url'); // Replace with your server URL

function Messaging() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [sender, setSender] = useState('Anonymous');
  const {user} = useAuthContext()

  const handleSendMessage = () => {
    if (message) {
//     socket.emit('message', { text: message, user });
//      setMessage('');
    }
  };

  useEffect(() => {
//    socket.on('message', (messageData) => {
//      setMessages((prevMessages) => [...prevMessages, messageData]);
//    });

    // Fetch previous messages when the component mounts
//    axios.get('http://your-server-url/messages').then((response) => {
//      setMessages(response.data);
//    });
  }, []);

  return (
    <ChatContainer>
        <MessageList>
        <Message model={{
                 message: "Hello my friend",
                 sentTime: "just now",
                 sender: "Joe",
                 direction: "incoming",
                 type: "text",

                 }} >
                    <Message.Header sender="Joe"/>
                    </Message>
        </MessageList>
        <MessageInput attachButton='false' placeholder="Type message here" />
    </ChatContainer>
  );
}

export default Messaging;

/*
<div>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.user}: </strong>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input
          type="text"
          placeholder="Your Username"
          value={user}
          onChange={(e) => setSender(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
*/