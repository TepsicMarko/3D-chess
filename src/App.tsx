import './App.css';
import { Canvas } from '@react-three/fiber';
import ChessBoard from './components/ChessBoard';
import { useLocation, useParams } from 'react-router-dom';
import { chessGame, moveInfo } from './types';
import { SocketContext } from './contexts/SocketContext';
import { useContextBridge } from '@react-three/drei';
import { CurrentUserContext } from './contexts/CurrentUserContext';
import { useContext, useState } from 'react';
import PromotionForm from './components/PromotionForm';

const App = () => {
  const socket = useContext(SocketContext);
  const { state: game } = useLocation() as {
    state: chessGame;
  };
  const { gameId } = useParams();
  const ContextBridge = useContextBridge(SocketContext, CurrentUserContext);
  const [isPromotionFormOpen, setIsPromotionFormOpen] = useState(false);
  const [moveInfo, setMoveInfo] = useState<null | moveInfo>(null);

  const openPromotionForm = (moveInfo: moveInfo) => {
    setIsPromotionFormOpen(true);
    setMoveInfo(moveInfo);
  };

  const promotePawn = (selectedPiece: number) => {
    setIsPromotionFormOpen(false);
    setMoveInfo(null);
    moveInfo &&
      socket?.emit('move piece', moveInfo).emit('promote pawn', {
        gameId: moveInfo.gameId,
        from: moveInfo?.newPosition,
        to: selectedPiece,
      });
  };

  return (
    <div className='App'>
      <Canvas shadows>
        <ambientLight intensity={0.1} />
        <spotLight castShadow color='white' position={[60, 40, 40]} angle={0.1} />

        <ContextBridge>
          <ChessBoard
            newGame={game}
            gameId={gameId || ''}
            openPromotionForm={openPromotionForm}
          />
        </ContextBridge>
        {/* 
        <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial />
        </mesh> */}
      </Canvas>

      <PromotionForm visible={isPromotionFormOpen} onClick={promotePawn} />
    </div>
  );
};

export default App;
