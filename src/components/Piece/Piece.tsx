import { useGLTF, useSelect } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import { memo, useEffect, useState } from 'react';
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
  const selected = useSelect();
  const { nodes }: any = useGLTF(`/models/${id}.gltf`);

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    setUuid(e.eventObject.uuid);
    setSelectedPiece({ uuid: e.eventObject.uuid, id, position, moved });
  };

  const setColour = () =>
    uuid.length && uuid === selected[0]?.uuid ? 'turquoise' : color;

  useEffect(() => {
    selected[0]?.uuid !== uuid && setUuid('');
    !selected[0] &&
      setSelectedPiece({ uuid: '', id: 0, position: { x: -1, z: -1 }, moved });
  }, [selected]);

  return (
    <>
      <mesh
        receiveShadow
        castShadow
        onClick={!disabled ? handleClick : undefined}
        geometry={nodes[models[id].name].geometry}
        position={[position.x - 4, 0, position.z - 4]}
        scale={0.15 * models[id].size}
      >
        <meshStandardMaterial attach='material' color={setColour()} />
      </mesh>
    </>
  );
};

export default memo(Piece);
