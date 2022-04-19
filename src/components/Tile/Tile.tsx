interface TileProps {
  color: string;
  position: { x: number; z: number };
}

const Tile = ({ color, position }: TileProps) => {
  const { PI } = Math;

  return (
    <mesh
      receiveShadow
      position={[position.x, -0.05, position.z - 4]}
      rotation={[-PI / 2, 0, 0]}
    >
      <boxGeometry args={[1, 1, 0.1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Tile;
