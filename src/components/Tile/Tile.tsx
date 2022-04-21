import { position } from '../../types';

interface TileProps {
  color: string;
  position: position;
  isPossiblePosition: boolean;
  movePiece: (newPosition: position) => void;
}

const Tile = ({ color, position, isPossiblePosition, movePiece }: TileProps) => {
  const { PI } = Math;

  const handleClick = () => isPossiblePosition && movePiece(position);

  return (
    <mesh
      onClick={handleClick}
      receiveShadow
      position={[position.x - 4, -0.05, position.z - 4]}
      rotation={[-PI / 2, 0, 0]}
    >
      <boxGeometry args={[1, 1, 0.1]} />
      <meshStandardMaterial
        color={isPossiblePosition ? 'rgba(57, 175, 57, 0.5)' : color}
      />
    </mesh>
  );
};

export default Tile;
