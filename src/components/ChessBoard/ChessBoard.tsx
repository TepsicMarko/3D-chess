import { Select } from '@react-three/drei';
import { chessBoard } from '../../types';
import Piece from '../Piece';
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
            key={`${tileIndex}-${rowIndex}`}
            color={(tileIndex + rowIndex) % 2 !== 0 ? 'black' : 'white'}
            position={{ x: rowIndex, z: tileIndex }}
          />
        ))
      )}

      <Select>
        {chessBoard.map((row, rowIndex) =>
          row.map(
            (tile, tileIndex) =>
              tile && (
                <Piece
                  key={`${tileIndex}-${rowIndex}`}
                  position={{ x: tileIndex, z: rowIndex }}
                  pieceId={tile}
                />
              )
          )
        )}
      </Select>
    </>
  );
};

export default ChessBoard;
