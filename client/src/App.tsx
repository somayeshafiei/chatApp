/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const socket = io.connect('http://localhost:3001');
function App() {
  //Room State
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState('');
  const joinRoom = () => {
    if (room !== '') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      socket.emit('join_room', room);
    }
  };
  const sendMessage = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    socket.emit('send_message', { message, room });
  };
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    socket.on('recieve_message', (data) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setMessageReceived(data.message);
    });
  }, [socket]);
  return (
    <>
      <input
        placeholder="Room Number...."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}>join Room</button>
      <input
        placeholder="message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}>send Meassage</button>
      <h1>Message:</h1>
      {messageReceived}
    </>
  );
}

export default App;
