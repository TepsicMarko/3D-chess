import './App.css';
import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ChessBoard from './components/ChessBoard';

function App() {
  const { PI } = Math;
  const [chessBoard, setChessBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  return (
    <div className='App'>
      <Canvas>
        <OrbitControls />
        <ambientLight intensity={0.1} />
        <spotLight color='white' position={[0, 30, 0]} angle={0.3} />

        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial />
        </mesh>

        <ChessBoard chessBoard={chessBoard} />
      </Canvas>
    </div>
  );
}

export default App;
