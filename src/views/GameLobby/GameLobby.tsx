import './GameLobby.css';
import '../../styles/button.css';
import '../../styles/form.css';
import DemoPiece from '../../components/DemoPiece';
import { HiLink } from 'react-icons/hi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../contexts/SocketContext';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const GameLobby = () => {
  const socket = useContext(SocketContext);
  const user = useContext(CurrentUserContext);
  const { state: isGameOwner } = useLocation() as {
    state: boolean;
  };
  const { gameId } = useParams();
  const navigate = useNavigate();
  const gameLink = window.location.href.replace('lobby', 'join');
  const [oponent, setOponent] = useState('');
  const [err, setErr] = useState('');

  const shareGameLink = async () => {
    try {
      await navigator.share({ url: gameLink });
    } catch (err) {
      try {
        await navigator.clipboard.writeText(gameLink);
      } catch (err) {
        alert('your borwser does not support sharing, try manualy copying the link');
      }
    }
  };

  const leaveLobby = () => {
    socket?.emit('leave lobby', { gameId, username: user.name });
    navigate(-1);
  };

  const startGame = () => {
    socket?.emit('start game', { gameId });
  };

  useEffect(() => {
    socket?.emit('add user to loby', { gameId, username: user.name });

    socket?.on('guest joined lobby', (lobbyInfo) => {
      console.log(lobbyInfo);
      lobbyInfo.owner === user.name
        ? setOponent(lobbyInfo.guest)
        : setOponent(lobbyInfo.owner);
    });

    socket?.on('guest left lobby', (lobbyInfo) => {
      lobbyInfo.owner === user.name && setOponent('');
    });

    socket?.once('owner left lobby', () => {
      setErr('The game no longer exists, because the owner left the lobby');
    });

    socket?.once('game started', ({ gameId, game }) => {
      navigate('/game/' + gameId, { state: game });
    });
  }, []);

  return (
    <main className='view-form-container'>
      {!err ? (
        <>
          <section className='invite-section'>
            <h1>{isGameOwner ? 'Game Link' : 'Waitin for owner to start the game...'}</h1>
            {isGameOwner && (
              <>
                <p className='invite-link'>{gameLink}</p>
                <button className='btn-primary' onClick={shareGameLink}>
                  <HiLink size='1.5rem' />
                </button>
              </>
            )}
          </section>

          <section className='players-section'>
            <div className='player-container'>
              <div className='player-piece'>
                <DemoPiece color={user.color} pieceId={1} />
              </div>
              <h2 className='player-name'>{user.name}</h2>
            </div>

            <h3 id='vs'>VS</h3>

            {oponent ? (
              <div className='player-container'>
                <div className='player-piece'>
                  <DemoPiece
                    color={user.color !== 'white' ? 'white' : 'rgb(50, 50, 50)'}
                    pieceId={1}
                  />
                </div>
                <div
                  className='player-name'
                  style={{ fontSize: oponent ? '1.5rem' : '' }}
                >
                  {oponent}
                </div>
              </div>
            ) : (
              <h2>Waitin for oponent...</h2>
            )}
          </section>

          <section className='controls-section'>
            {isGameOwner && (
              <button className='btn-primary' onClick={startGame} disabled={!oponent}>
                start game
              </button>
            )}{' '}
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
