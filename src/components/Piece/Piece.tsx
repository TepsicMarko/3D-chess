import { useGLTF, useSelect } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import { memo, useEffect, useRef, useState } from 'react';
import { position, SelectedPiece } from '../../types';
import models from '../../utils/constants/models';

interface PieceProps {
  position: position;
  id: number;
  moved: boolean;
  disabled: boolean;
  color: string;
  setSelectedPiece: React.Dispatch<React.SetStateAction<SelectedPiece>>;
}

const Piece = ({
  position,
  id,
  color,
  disabled,
  moved,
  setSelectedPiece,
}: PieceProps): any => {
  const [uuid, setUuid] = useState('');
  const [prevPosition, setPrevPosition] = useState(position);
  const selected = useSelect();
  const { nodes }: any = useGLTF(`/models/${id}.gltf`);
  const pieceRef = useRef<THREE.Mesh>(null);

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    setUuid(e.eventObject.uuid);
    setSelectedPiece({ id, position, moved });
  };

  const setColour = () =>
    uuid.length && uuid === selected[0]?.uuid ? 'turquoise' : color;

  useEffect(() => {
    selected[0]?.uuid !== uuid && setUuid('');
    !selected[0] && setSelectedPiece({ id: 0, position: { x: -1, z: -1 }, moved });
  }, [selected]);

  useEffect(() => setPrevPosition(position), []);

  useEffect(() => {
    const movedX = Math.abs(position.x - prevPosition.x);
    const movedZ = Math.abs(position.z - prevPosition.z);
    const fps = 1000 / 60;
    const animationDuration = 250;
    const movementSpeedX = movedX / (animationDuration / fps);
    const movementSpeedZ = movedZ / (animationDuration / fps);
    const incrementOrDecrementX =
      prevPosition.x < position.x ? movementSpeedX : -movementSpeedX;
    const incrementOrDecrementZ =
      prevPosition.z < position.z ? movementSpeedZ : -movementSpeedZ;

    const intervalId = setInterval(async () => {
      pieceRef.current!.position.x += incrementOrDecrementX;
      pieceRef.current!.position.z += incrementOrDecrementZ;
    }, fps);

    setTimeout(() => {
      clearInterval(intervalId);
      setPrevPosition(() => position);
    }, animationDuration);
  }, [position]);

  return (
    <>
      <mesh
        ref={pieceRef}
        receiveShadow
        castShadow
        onClick={!disabled ? handleClick : undefined}
        geometry={nodes[models[id].name].geometry}
        position={[prevPosition.x - 4, 0, prevPosition.z - 4]}
        scale={0.15 * models[id].size}
      >
        <meshStandardMaterial attach='material' color={setColour()} />
      </mesh>
    </>
  );
};

export default memo(Piece);
