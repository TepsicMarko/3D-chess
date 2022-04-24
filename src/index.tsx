import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NewGame from './views/NewGame';
import JoinGame from './views/JoinGame';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/game/new' element={<NewGame />} />
        <Route path='/game/join' element={<JoinGame />} />
        <Route path='/game/:id' element={<App />} />
        <Route path='*' element={<Navigate to='/game/new' replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
