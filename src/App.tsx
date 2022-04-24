import './App.css';
import { Canvas } from '@react-three/fiber';
import ChessBoard from './components/ChessBoard';
import { useLocation, useParams } from 'react-router-dom';
import { chessBoard } from './types';
import { SocketContext } from './contexts/SocketContext';
import { useContextBridge } from '@react-three/drei';

const App = () => {
  const { state } = useLocation() as { state: chessBoard };
  const { gameId } = useParams();
  const ContextBridge = useContextBridge(SocketContext);

  return (
    <div className='App'>
      <Canvas shadows>
        <ambientLight intensity={0.1} />
        <spotLight castShadow color='white' position={[60, 40, 40]} angle={0.1} />

        <ContextBridge>
          <ChessBoard newGame={state} gameId={gameId || ''} />
        </ContextBridge>
        {/* 
        <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial />
        </mesh> */}
      </Canvas>
    </div>
  );
};

export default App;
