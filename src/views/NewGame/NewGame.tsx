import './NewGame.css';
import '../styles/form.css';
import { useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import randomUsername from '../../helpers/randomUsername';
import { SocketContext } from '../../contexts/SocketContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const NewGame = () => {
  const socket = useContext(SocketContext);
  const { setUser } = useContext(CurrentUserContext);
  const [color, setColor] = useState('white');
  const [username, setUsername] = useState(randomUsername);
  const [rotation, setRotation] = useState(0);
  const navigate = useNavigate();
  const { nodes }: any = useGLTF(`/models/1.gltf`);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(username, color);
    socket?.connect().emit('create game', { username, color });
    setUser(username);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/game/join');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);

  useLayoutEffect(() => {
    const interval = setInterval(() => {
      setRotation((rotation) => rotation + 0.01);
    }, 10);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    socket?.once('game created', (data) => {
      console.log(data);
      navigate('/game/' + data.id, { state: data.game });
    });
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
            <Canvas shadows>
              <ambientLight intensity={0.1} />
              <spotLight castShadow color='white' position={[60, 40, 40]} angle={0.1} />
              <meshStandardMaterial attach='material' color={'white'} />
              <mesh
                rotation={[0, rotation, 0]}
                geometry={nodes.PrimaryWhitePawn007.geometry}
                scale={0.75}
                position={[0, -2, 0]}
              >
                <meshStandardMaterial attach='material' color={color} />
              </mesh>
            </Canvas>
          </div>
        </div>
        <label className='username'>
          Username
          <input type='text' value={username} onChange={handleChange} />
        </label>
        <button>create new game</button>
        <button onClick={handleClick}>or join existing</button>
      </form>
    </main>
  );
};

export default NewGame;
