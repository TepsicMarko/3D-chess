import '../styles/form.css';
import React, { useContext, useEffect, useState } from 'react';
import randomUsername from '../../utils/helpers/randomUsername';
import { useNavigate, useParams } from 'react-router-dom';
import { SocketContext } from '../../contexts/SocketContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const JoinGame = () => {
  const { gameId } = useParams();
  const [form, setForm] = useState({ username: randomUsername(), gameId: gameId || '' });
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const { setUser } = useContext(CurrentUserContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    socket?.connect().emit('join game', { ...form, gameId: gameId || form.gameId });
    setUser(form.username);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/game/new');
  };

  useEffect(() => {
    socket?.once('game joined', (data) => {
      console.log(data);
      navigate('/game/' + data.gameId, { state: data.game });
    });
  }, [socket]);

  return (
    <main className='view-form-container'>
      <h1>Join Game</h1>
      <form onSubmit={handleSubmit} className='view-form'>
        <label>
          Username
          <input
            type='text'
            name='username'
            value={form.username}
            onChange={handleChange}
          />
        </label>
        <label>
          Game
          <input
            type='text'
            name='gameId'
            placeholder='Game id or url'
            value={form.gameId}
            onChange={handleChange}
          />
        </label>
        <button>join game</button>
        <button onClick={handleClick}>create new game</button>
      </form>
    </main>
  );
};

export default JoinGame;
