import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NewGame from './views/NewGame';
import JoinGame from './views/JoinGame';
import GameLobby from './views/GameLobby';
import { SocketProvider } from './contexts/SocketContext';
import { CurrentUserProvider } from './contexts/CurrentUserContext';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <SocketProvider>
      <CurrentUserProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/game/new' element={<NewGame />} />
            <Route path='/game/join' element={<JoinGame />} />
            <Route path='/game/join/:gameId' element={<JoinGame />} />
            <Route path='/game/lobby/:gameId' element={<GameLobby />} />
            <Route path='/game/:gameId' element={<App />} />
            <Route path='*' element={<Navigate to='/game/new' replace />} />
          </Routes>
        </BrowserRouter>
      </CurrentUserProvider>
    </SocketProvider>
    <ToastContainer />
  </React.StrictMode>
);
