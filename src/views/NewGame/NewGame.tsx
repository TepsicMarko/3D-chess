import './NewGame.css';
import '../../styles/view-form.css';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import randomUsername from '../../utils/helpers/randomUsername';
import { SocketContext } from '../../contexts/SocketContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import DemoPiece from '../../components/DemoPiece';

const NewGame = () => {
  const socket = useContext(SocketContext);
  const { setUser } = useContext(CurrentUserContext);
  const [color, setColor] = useState('white');
  const [username, setUsername] = useState(randomUsername);
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username) {
      socket?.connect().emit('create game', { username, color });
      setUser({ name: username, color });
    } else {
      setErr('Username is required');
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/game/join');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    err && setErr('');
  };

  useEffect(() => {
    socket?.once('join lobby', (data) => {
      navigate('/game/lobby/' + data.gameId, { state: true });
    });

    return () => {
      socket?.off('join lobby');
    };
  }, [socket]);

  return (
    <main className='view-form-container' onSubmit={handleSubmit}>
      <h1>Create New Game</h1>

      <form className='view-form'>
        <div className='color-picker'>
          <div className='color-options'>
            <div
              style={{ border: color === 'white' ? '3px solid #007ea7' : '' }}
              onClick={() => setColor('white')}
            ></div>
            <div
              style={{ border: color === 'rgb(50, 50, 50)' ? '3px solid #007ea7' : '' }}
              onClick={() => setColor('rgb(50, 50, 50)')}
            ></div>
          </div>
          <div className='color-preview'>
            <DemoPiece pieceId={1} color={color} />
          </div>
        </div>
        <label className={err ? 'input-err' : ''}>
          Username
          <input type='text' autoFocus value={username} onChange={handleChange} />
          <span className={err ? 'input-err-msg' : ''}>{err}</span>
        </label>
        <button className='btn-primary'>create new game</button>
        <button className='btn-secondary' onClick={handleClick}>
          or join existing
        </button>
      </form>
    </main>
  );
};

export default NewGame;
