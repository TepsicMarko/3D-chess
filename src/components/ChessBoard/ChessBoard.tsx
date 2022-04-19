import { chessBoard } from '../../types';
import Tile from '../Tile';

interface ChessBoardProps {
  chessBoard: chessBoard;
}

const ChessBoard = ({ chessBoard }: ChessBoardProps) => {
  return (
    <>
      {chessBoard.map((row, rowIndex) =>
        row.map((tile, tileIndex) => (
          <Tile
            color={(tileIndex + rowIndex) % 2 === 0 ? 'black' : 'white'}
            position={{ x: rowIndex, z: tileIndex }}
          />
        ))
      )}
      {/* <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color={'red'} />
      </mesh> */}
    </>
  );
};

export default ChessBoard;
