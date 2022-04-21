import { OrbitControls, Select } from '@react-three/drei';
import { useEffect, useState } from 'react';
import { position, SelectedPiece } from '../../types';
import Piece from '../Piece';
import Tile from '../Tile';
import moves from '../../game-conf/moves';
import newGame from '../../game-conf/newGame';

const ChessBoard = () => {
  const [chessBoard, setChessBoard] = useState(newGame);
  const [selectedPiece, setSelectedPiece] = useState<SelectedPiece>({
    uuid: '',
    id: 0,
    position: { x: -1, z: -1 },
    moved: false,
  });
  const [possibleMoves, setPossibleMoves] = useState<number[][]>([]);

  const movePiece = (newPosition: position) => {
    const currentPosition = selectedPiece.position;
    const newChessBoard = [...chessBoard];
    newChessBoard[newPosition.z][newPosition.x] = {
      id: selectedPiece.id,
      enemy: newChessBoard[currentPosition.z][currentPosition.x]?.enemy || false,
      moved: true,
    };
    newChessBoard[currentPosition.z][currentPosition.x] = null;

    setChessBoard(newChessBoard);
    setSelectedPiece({
      uuid: '',
      id: 0,
      position: { x: -1, z: -1 },
      moved: false,
    });
  };

  useEffect(() => {
    const pieceMoves = moves[selectedPiece.id];
    const operations = ['-0', '-+', '0+', '++', '+0', '+-', '0-', '--'];

    if (pieceMoves) {
      const possibleMoves = pieceMoves
        .flatMap((move, i) => {
          if (move !== 0) {
            const [forX, forZ] = operations[i];

            if (typeof move === 'number') {
              if (move === -1) {
                let possibleMoves = [];
                let x = 0,
                  z = 0,
                  i = 0;
                while (x <= 7 && x >= 0 && z <= 7 && z >= 0) {
                  i++;
                  x =
                    selectedPiece.position.x +
                    (forX === '0' ? 0 : forX === '+' ? -move - i : move + i);
                  z =
                    selectedPiece.position.z +
                    (forZ === '0' ? 0 : forZ === '+' ? -move - i : move + i);

                  possibleMoves.push([x, z]);
                }

                return possibleMoves;
              } else {
                const x =
                  selectedPiece.position.x +
                  (forX === '0' ? 0 : forX === '+' ? -move : move);
                const z =
                  selectedPiece.position.z +
                  (forZ === '0' ? 0 : forZ === '+' ? -move : move);

                if (selectedPiece.id === 1 && !selectedPiece.moved) return [[x, z - 1]];
                else return [[x, z]];
              }
            } else {
              return move.map((m, i) => {
                let x = 0,
                  z = 0;

                if (forZ === '0') {
                  x = selectedPiece.position.x + (forX === '+' ? -move[0] : move[0]);
                  z = selectedPiece.position.z + (i === 0 ? -1 : 1);
                }
                if (forX === '0') {
                  z = selectedPiece.position.z + (forZ === '+' ? -move[0] : move[0]);
                  x = selectedPiece.position.x + (i === 0 ? -1 : 1);
                }

                return [x, z];
              });
            }
          } else return null;
        })
        .filter((f) => f !== null);
      //@ts-ignore
      setPossibleMoves(possibleMoves);
    } else setPossibleMoves([]);
  }, [selectedPiece]);

  return (
    <>
      <OrbitControls />
      {chessBoard.map((row, rowIndex) =>
        row.map((tile, tileIndex) => (
          <Tile
            key={`${tileIndex}-${rowIndex}`}
            color={(tileIndex + rowIndex) % 2 !== 0 ? 'black' : 'white'}
            position={{ x: rowIndex, z: tileIndex }}
            movePiece={movePiece}
            isPossiblePosition={possibleMoves.some(
              ([x, y]) => x === rowIndex && y === tileIndex
            )}
          />
        ))
      )}

      <Select>
        {newGame.map((row, rowIndex) =>
          row.map(
            (piece, tileIndex) =>
              piece && (
                <Piece
                  {...piece}
                  key={`${tileIndex}-${rowIndex}`}
                  position={{ x: tileIndex, z: rowIndex }}
                  setSelectedPiece={setSelectedPiece}
                />
              )
          )
        )}
      </Select>
    </>
  );
};

export default ChessBoard;
