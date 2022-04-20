import { useSelect } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { position, SelectedPiece } from '../../types';

interface PieceProps {
  position: position;
  pieceId: number;
  setSelectedPiece: React.Dispatch<React.SetStateAction<SelectedPiece>>;
}

const Piece = ({ position, pieceId, setSelectedPiece }: PieceProps) => {
  const selected = useSelect();
  const [uuid, setUuid] = useState('');

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    setUuid(e.eventObject.uuid);
    setSelectedPiece({ uuid: e.eventObject.uuid, pieceId, position });
  };

  useEffect(() => {
    selected[0]?.uuid !== uuid && setUuid('');
    !selected[0] &&
      setSelectedPiece({ uuid: '', pieceId: 0, position: { x: -1, z: -1 } });
  }, [selected]);

  return (
    <mesh
      onClick={handleClick}
      position={[position.x - 4, (0.5 * pieceId) / 5, position.z - 4]}
    >
      <boxGeometry args={[0.6, pieceId / 5, 0.6]} />
      <meshStandardMaterial
        color={uuid.length && uuid === selected[0]?.uuid ? 'red' : 'white'}
      />
    </mesh>
  );
};

export default Piece;
