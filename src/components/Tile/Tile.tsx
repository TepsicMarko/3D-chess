import { useState } from 'react';
import { position } from '../../types';

interface TileProps {
  color: string;
  position: position;
  isPossiblePosition: boolean;
  movePiece: (newPosition: position) => void;
}

const Tile = ({ color, position, isPossiblePosition, movePiece }: TileProps) => {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const { PI } = Math;

  const handleClick = () => isPossiblePosition && movePiece(position);

  return (
    <>
      <mesh
        receiveShadow
        position={[position.x - 4, -0.05, position.z - 4]}
        rotation={[-PI / 2, 0, 0]}
      >
        <boxGeometry args={[1, 1, 0.1]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {isPossiblePosition && (
        <mesh
          onClick={handleClick}
          onPointerOver={() => setIsMouseOver(true)}
          onPointerOut={() => setIsMouseOver(false)}
          receiveShadow
          position={[position.x - 4, 0.025, position.z - 4]}
          rotation={[-PI / 2, 0, 0]}
        >
          <boxGeometry args={[1, 1, 0.05]} />
          <meshStandardMaterial
            color={isMouseOver ? '#77dd77' : 'aqua'}
            transparent
            opacity={isMouseOver ? 1 : 0.5}
          />
        </mesh>
      )}
    </>
  );
};

export default Tile;
