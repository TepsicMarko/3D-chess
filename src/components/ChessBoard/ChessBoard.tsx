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
            color={(tileIndex + rowIndex) % 2 !== 0 ? 'black' : 'white'}
            position={{ x: rowIndex, z: tileIndex }}
          />
        ))
      )}
      {chessBoard.map((row, rowIndex) =>
        row.map(
          (tile, tileIndex) =>
            tile && (
              <mesh position={[tileIndex - 4, (0.5 * tile) / 5, rowIndex - 4]}>
                <boxGeometry args={[0.6, tile / 5, 0.6]} />
                <meshStandardMaterial />
              </mesh>
            )
        )
      )}
    </>
  );
};

export default ChessBoard;
