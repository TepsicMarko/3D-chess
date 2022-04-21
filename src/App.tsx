import './App.css';
import { Canvas } from '@react-three/fiber';
import ChessBoard from './components/ChessBoard';

function App() {
  return (
    <div className='App'>
      <Canvas shadows>
        <ambientLight intensity={0.1} />
        <spotLight castShadow color='white' position={[60, 40, 40]} angle={0.1} />

        <ChessBoard />
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
