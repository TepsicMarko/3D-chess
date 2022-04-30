import { useGLTF } from '@react-three/drei';
import { useLayoutEffect, useState } from 'react';
import models from '../../utils/constants/models';

interface DemoPieceProps {
  pieceId: number;
  color?: string;
  scale?: number;
}

const DemoPiece = ({ pieceId, color, scale }: DemoPieceProps) => {
  const [rotation, setRotation] = useState(0);
  const { nodes }: any = useGLTF(`/models/${pieceId}.gltf`);

  useLayoutEffect(() => {
    const interval = setInterval(() => {
      setRotation((rotation) => rotation + 0.01);
    }, 10);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <meshStandardMaterial attach='material' color={'white'} />
      <mesh
        rotation={[0, rotation, 0]}
        geometry={nodes[models[pieceId].name].geometry}
        scale={scale || 0.75}
        position={[0, -1.75, 0]}
      >
        <meshStandardMaterial attach='material' color={color} />
      </mesh>
    </>
  );
};

export default DemoPiece;
