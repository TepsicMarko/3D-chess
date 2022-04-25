import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NewGame from './views/NewGame';
import JoinGame from './views/JoinGame';
import { SocketProvider } from './contexts/SocketContext';
import { CurrentUserProvider } from './contexts/CurrentUserContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <SocketProvider>
      <CurrentUserProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/game/new' element={<NewGame />} />
            <Route path='/game/join/' element={<JoinGame />} />
            <Route path='/game/join/:gameId' element={<JoinGame />} />
            <Route path='/game/:gameId' element={<App />} />
            <Route path='*' element={<Navigate to='/game/new' replace />} />
          </Routes>
        </BrowserRouter>
      </CurrentUserProvider>
    </SocketProvider>
  </React.StrictMode>
);
