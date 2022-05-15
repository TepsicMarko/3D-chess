import '../../styles/popup-form.css';
import './DisconnectForm.css';
import '../../styles/button.css';
import { HiLink } from 'react-icons/hi';
import { ClassicSpinner } from 'react-spinners-kit';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import shareGameLink from '../../utils/helpers/shareGameLink';
import { SocketContext } from '../../contexts/SocketContext';

const DisconnectForm = () => {
  const { gameId } = useParams();
  const [visible, setIsVisible] = useState(false);
  const [isDisconnected, setIsDisconnected] = useState(true);
  const [whoDisconnected, setWhoDisconnected] = useState('');
  const navigate = useNavigate();
  const socket = useContext(SocketContext);

  const leaveGame = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
  };

  const shareRejoinLink = (e: React.MouseEvent) => {
    e.preventDefault();
    shareGameLink(window.location.href.replace('game/', 'game/rejoin/'));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVisible(false);
    socket?.emit('resume game', { gameId });
  };

  const openDisconnectForm = (who: string) => {
    console.log(who + 'disconnected');
    setWhoDisconnected(who);
    setIsDisconnected(true);
    setIsVisible(true);
  };

  useEffect(() => {
    socket?.on('owner disconnected', () => openDisconnectForm('owner'));
    socket?.on('guest disconnected', () => openDisconnectForm('guest'));

    socket?.on('guest rejoined game', () => setIsDisconnected(false));
    socket?.on('owner rejoined game', () => setIsDisconnected(false));

    socket?.on('game resumed', () => {
      setIsVisible(false);
    });
  }, []);

  return visible ? (
    <div className='popup-form-container'>
      <h2>{whoDisconnected} disconnected</h2>
      <form onSubmit={handleSubmit}>
        <section className='rejoin-link'>
          <div>rejoin link</div>
          <p className='btn-secondary rejoin-link'>
            https://3d-chess.vercel.app/game/join/sbN16ySWHO1KS_h66ItWv
          </p>
          <button className='btn-primary' onClick={shareRejoinLink}>
            <HiLink />
          </button>
        </section>

        {whoDisconnected === 'owner' && (
          <p className='owner-disconnect-status'>
            <ClassicSpinner />

            {isDisconnected
              ? 'waiting for owner to rejoin the game...'
              : 'waiting for owner to resume the game...'}
          </p>
        )}

        <section className='game-controls'>
          <button className='btn-primary'>save game</button>
          <button className='btn-secondary' onClick={leaveGame}>
            leave game
          </button>
        </section>

        {whoDisconnected === 'guest' && (
          <button className='btn-primary resume-game' disabled={isDisconnected}>
            {!isDisconnected ? (
              'resume game'
            ) : (
              <>
                waiting for guest to reconnect...
                <ClassicSpinner />
              </>
            )}
          </button>
        )}
      </form>
    </div>
  ) : null;
};

export default DisconnectForm;
