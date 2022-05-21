import '../../styles/view-form.css';
import React, { useContext, useEffect, useState } from 'react';
import randomUsername from '../../utils/helpers/randomUsername';
import { useNavigate, useParams } from 'react-router-dom';
import { SocketContext } from '../../contexts/SocketContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { toast } from 'react-toastify';

const JoinGame = () => {
  const isUserRejoining = window.location.href.includes('/rejoin/');
  const { gameId } = useParams();
  const [form, setForm] = useState({ username: randomUsername(), gameId: gameId || '' });
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const { setUser } = useContext(CurrentUserContext);
  const [err, setErr] = useState({ username: '', gameId: '' });
  const toastId = React.useRef('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    err && setErr({ ...err, [e.target.name]: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    if (form.username && form.gameId) {
      socket?.connect().emit(isUserRejoining ? 'rejoin game' : 'join game', {
        ...form,
        gameId: gameId || form.gameId,
      });
    } else {
      setErr({
        username: form.username ? '' : 'Username is required',
        gameId: form.gameId ? '' : 'Id is required',
      });
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
  };

  useEffect(() => {
    socket?.once('join lobby', (data) => {
      console.log(data);
      setUser({ name: data.username, color: data.color });
      navigate('/game/rejoinlobby/' + data.gameId, { state: data.isOwner || false });
    });

    socket?.on('join error', (err) => {
      !toast.isActive(toastId.current) &&
        toast.error(err.message, {
          toastId: 'join-error',
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'dark',
          progress: undefined,
        });
    });

    return () => {
      socket?.off('join lobby');
      socket?.off('join error');
    };
  }, [socket]);

  return (
    <main className='view-form-container'>
      <h1>{isUserRejoining ? 'Rejoin Game' : 'Join Game'}</h1>
      <form onSubmit={handleSubmit} className='view-form'>
        <label className={err.username ? 'input-err' : ''}>
          Username
          <input
            type='text'
            name='username'
            value={form.username}
            onChange={handleChange}
          />
          <span className={err.username ? 'input-err-msg' : ''}>{err.username}</span>
        </label>
        <label className={err.gameId ? 'input-err' : ''}>
          Game
          <input
            type='text'
            name='gameId'
            placeholder='id or url'
            value={form.gameId}
            onChange={handleChange}
          />
          <span className={err.gameId ? 'input-err-msg' : ''}>{err.gameId}</span>
        </label>
        <button className='btn-primary'>
          {isUserRejoining ? 'Rejoin Game' : 'Join Game'}
        </button>
        <button className='btn-secondary' onClick={handleClick}>
          create new game
        </button>
      </form>
    </main>
  );
};

export default JoinGame;
