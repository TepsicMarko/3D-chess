import { useGLTF, useSelect } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import { memo, useEffect, useState } from 'react';
import { position, SelectedPiece } from '../../types';

interface models {
  [key: number]: { name: string; size: number };
}

interface PieceProps {
  position: position;
  id: number;
  enemy: boolean;
  moved: boolean;
  setSelectedPiece: React.Dispatch<React.SetStateAction<SelectedPiece>>;
}

const models: models = {
  1: { name: 'PrimaryWhitePawn007', size: 1 },
  2: { name: 'Rook001', size: 1.5 },
  3: { name: 'WhiteKnight001', size: 1.5 },
  4: { name: 'PrimaryWhiteBishop001', size: 0.25 },
  5: { name: 'WhiteKing', size: 1 },
  6: { name: 'WhiteQueen', size: 0.25 },
};

const Piece = ({ position, id, enemy, moved, setSelectedPiece }: PieceProps): any => {
  const [uuid, setUuid] = useState('');
  const selected = useSelect();
  const { nodes }: any = useGLTF(`/models/${id}.gltf`);

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    setUuid(e.eventObject.uuid);
    setSelectedPiece({ uuid: e.eventObject.uuid, id, position, moved });
  };

  const setColour = () => {
    if (enemy) return 'black';
    else return uuid.length && uuid === selected[0]?.uuid ? 'turquoise' : 'white';
  };

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
        onClick={handleClick}
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
