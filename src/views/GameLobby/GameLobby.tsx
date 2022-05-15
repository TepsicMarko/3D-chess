import './GameLobby.css';
import '../../styles/button.css';
import '../../styles/view-form.css';
import DemoPiece from '../../components/DemoPiece';
import { HiLink } from 'react-icons/hi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../contexts/SocketContext';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { MetroSpinner } from 'react-spinners-kit';
import { BsQuestionLg } from 'react-icons/bs';
import shareGameLink from '../../utils/helpers/shareGameLink';

const GameLobby = () => {
  const isRejoinLobby = window.location.href.includes('rejoin');
  const socket = useContext(SocketContext);
  const user = useContext(CurrentUserContext);
  const { state: isGameOwner } = useLocation() as {
    state: boolean;
  };
  const { gameId } = useParams();
  const navigate = useNavigate();
  const gameLink = window.location.href.replace(
    isRejoinLobby ? 'rejoinlobby' : 'lobby',
    'join'
  );
  const [oponent, setOponent] = useState('');
  const [err, setErr] = useState('');

  const leaveLobby = () => {
    socket?.emit('leave lobby', { gameId, username: user.name });
    socket?.disconnect();
    navigate(-1);
  };

  const startGame = () => {
    socket?.emit(isRejoinLobby ? 'resume game' : 'start game', { gameId });
  };

  useEffect(() => {
    socket?.emit('add user to loby', { gameId, username: user.name });

    socket?.on('user joined lobby', (lobbyInfo) => {
      console.log(lobbyInfo);
      lobbyInfo.owner === user.name
        ? setOponent(lobbyInfo.guest)
        : setOponent(lobbyInfo.owner);
    });

    socket?.on('guest left lobby', (lobbyInfo) => {
      lobbyInfo.owner === user.name && setOponent('');
    });

    !isGameOwner &&
      socket?.once('owner left lobby', () => {
        setErr('The game no longer exists, because the owner left the lobby');
      });

    socket?.once('game started', ({ gameId, game }) => {
      navigate('/game/' + gameId, { replace: true, state: game });
    });

    socket?.once('game resumed', ({ gameId, game }) => {
      alert('Game resumed');
      navigate('/game/' + gameId, { replace: true, state: game });
    });

    return () => {
      socket?.off('game resumed');
    };
  }, []);

  return (
    <main className='view-form-container'>
      {!err ? (
        <>
          {
            <section className='invite-section'>
              <p>{isGameOwner ? 'Game Link' : 'Waitin for owner to start the game...'}</p>
              {isGameOwner && (
                <>
                  <p className='invite-link'>{gameLink}</p>
                  <button className='btn-primary' onClick={() => shareGameLink(gameLink)}>
                    <HiLink size='1.5rem' />
                  </button>
                </>
              )}
            </section>
          }

          <section className='players-section'>
            <div className='player-container'>
              <div className='player-piece'>
                <DemoPiece color={user.color} pieceId={1} />
              </div>
              <p className='player-name'>{user.name}</p>
            </div>
            {/* <h1 id='vs'>VS</h1> */}
            <div className={oponent ? 'player-container' : 'missing-player-container'}>
              <div className='player-piece'>
                {oponent && (
                  <DemoPiece
                    color={user.color !== 'white' ? 'white' : 'rgb(50, 50, 50)'}
                    pieceId={1}
                  />
                )}
              </div>
              {oponent ? (
                <p className='player-name'>{oponent}</p>
              ) : (
                <>
                  <MetroSpinner color='white' size='100' ballSize='15' />
                  <BsQuestionLg size='2rem' />
                </>
              )}
            </div>
          </section>

          <section className='controls-section'>
            {isGameOwner && (
              <button className='btn-primary' onClick={startGame} disabled={!oponent}>
                {isRejoinLobby ? 'resume game' : 'start game'}
              </button>
            )}
            <button className='btn-tertiary' onClick={leaveLobby}>
              Leave lobby
            </button>
          </section>
        </>
      ) : (
        <section>
          <h1 style={{ textAlign: 'center' }}>{err}</h1>
          <button className='btn-primary' onClick={leaveLobby}>
            Leave lobby
          </button>
        </section>
      )}
    </main>
  );
};

export default GameLobby;
