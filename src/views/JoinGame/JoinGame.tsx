import '../styles/form.css';
import React, { useState } from 'react';
import randomUsername from '../../helpers/randomUsername';
import { useNavigate } from 'react-router-dom';

const JoinGame = () => {
  const [form, setForm] = useState({ username: randomUsername(), game: '' });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/game/new');
  };

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
            name='game'
            placeholder='Game id or url'
            value={form.game}
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
