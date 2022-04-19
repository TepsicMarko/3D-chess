import './App.css';
import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ChessBoard from './components/ChessBoard';

function App() {
  const [chessBoard, setChessBoard] = useState([
    [2, 3, 4, 5, 6, 4, 3, 2],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [2, 3, 4, 6, 5, 4, 3, 2],
  ]);

  return (
    <div className='App'>
      <Canvas>
        <OrbitControls />
        <ambientLight intensity={0.1} />
        <spotLight color='white' position={[0, 30, 0]} angle={0.3} />

        <ChessBoard chessBoard={chessBoard} />
        {/*         
        <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial />
        </mesh> */}
      </Canvas>
    </div>
  );
}

export default App;
