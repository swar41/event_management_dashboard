import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const SOCKET_SERVER_URL = "http://localhost:3000"; // Update with your server URL

const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL);
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  return socket;
};

export default useSocket;