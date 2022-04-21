import { useSelect } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import { memo, useEffect, useRef, useState } from 'react';
import { position, SelectedPiece } from '../../types';

interface PieceProps {
  position: position;
  id: number;
  enemy: boolean;
  moved: boolean;
  setSelectedPiece: React.Dispatch<React.SetStateAction<SelectedPiece>>;
}

const Piece = ({ position, id, enemy, moved, setSelectedPiece }: PieceProps) => {
  const [uuid, setUuid] = useState('');
  const selected = useSelect();

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    setUuid(e.eventObject.uuid);
    setSelectedPiece({ uuid: e.eventObject.uuid, id, position, moved });
  };

  const setColour = () => {
    if (enemy) return 'black';
    else return uuid.length && uuid === selected[0]?.uuid ? 'red' : 'white';
  };

  useEffect(() => {
    selected[0]?.uuid !== uuid && setUuid('');
    !selected[0] &&
      setSelectedPiece({ uuid: '', id: 0, position: { x: -1, z: -1 }, moved });
  }, [selected]);

  return (
    <mesh
      castShadow
      receiveShadow
      onClick={!enemy ? handleClick : undefined}
      position={[position.x - 4, (0.5 * id) / 5, position.z - 4]}
    >
      <boxGeometry args={[0.6, id / 5, 0.6]} />
      <meshStandardMaterial color={setColour()} />
    </mesh>
  );
};

export default memo(Piece);
