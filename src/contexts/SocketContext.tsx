import React, { createContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: JSX.Element }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = io(`http://192.168.8.21:3001`, { autoConnect: false });

    setSocket(socket);

    return () => {
      socket.close();
    };
  }, []);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
