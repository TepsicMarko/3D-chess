import { position } from '../../types';

interface TileProps {
  color: string;
  position: position;
  isPossiblePosition: boolean;
}

const Tile = ({ color, position, isPossiblePosition }: TileProps) => {
  const { PI } = Math;

  return (
    <mesh
      receiveShadow
      position={[position.x - 4, -0.05, position.z - 4]}
      rotation={[-PI / 2, 0, 0]}
    >
      <boxGeometry args={[1, 1, 0.1]} />
      <meshStandardMaterial color={isPossiblePosition ? 'green' : color} />
    </mesh>
  );
};

export default Tile;
