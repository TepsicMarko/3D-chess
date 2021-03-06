import { OrbitControls, Select } from '@react-three/drei';
import { useContext, useEffect, useState } from 'react';
import { chessGame, chessBoard, position, SelectedPiece, moveInfo } from '../../types';
import Piece from '../Piece';
import Tile from '../Tile';
import moves from '../../utils/constants/moves';
import { SocketContext } from '../../contexts/SocketContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

interface ChessBoardProps {
  newGame: chessGame;
  gameId: string;
  openPromotionForm: (moveInfo: moveInfo) => void;
}

const ChessBoard = ({ newGame, gameId, openPromotionForm }: ChessBoardProps) => {
  const socket = useContext(SocketContext);
  const user = useContext(CurrentUserContext);
  const [gameOwner] = useState(newGame.owner);
  const [nextTurn, setNextTurn] = useState(newGame.nextTurn);
  const [chessBoard, setChessBoard] = useState(() =>
    gameOwner === user.name
      ? [...newGame.state].reverse().map((el) => [...el].reverse())
      : newGame.state
  );
  const [selectedPiece, setSelectedPiece] = useState<SelectedPiece>({
    id: 0,
    position: { x: -1, z: -1 },
    moved: false,
  });
  const [possibleMoves, setPossibleMoves] = useState<number[][]>([]);

  const movePiece = (newPosition: position) => {
    const moveInfo: moveInfo = {
      gameId,
      selectedPiece:
        gameOwner === user.name
          ? {
              ...selectedPiece,
              position: {
                x: -selectedPiece.position.x + 7,
                z: -selectedPiece.position.z + 7,
              },
            }
          : selectedPiece,
      newPosition:
        gameOwner === user.name
          ? { x: -newPosition.x + 7, z: -newPosition.z + 7 }
          : newPosition,
    };

    if (newPosition.z === 0 && selectedPiece.id === 1) {
      openPromotionForm(moveInfo);
    } else {
      socket?.emit('move piece', moveInfo);
    }
    setSelectedPiece({
      id: 0,
      position: { x: -1, z: -1 },
      moved: false,
    });
  };

  const getPossiblePawnMoves = (chessBoard: chessBoard, z: number, x: number) => {
    let possiblePawnMoves = [];

    if (chessBoard[z][x + 1])
      chessBoard[z][x + 1]?.owner !== user.name && possiblePawnMoves.push([x + 1, z]);
    if (chessBoard[z][x - 1])
      chessBoard[z][x - 1]?.owner !== user.name && possiblePawnMoves.push([x - 1, z]);
    if (!chessBoard[z][x]) possiblePawnMoves.push([x, z]);

    return possiblePawnMoves;
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
                  n = 0;
                while (x <= 7 && x >= 0 && z <= 7 && z >= 0) {
                  n++;
                  x =
                    selectedPiece.position.x + (forX === '0' ? 0 : forX === '+' ? -n : n);
                  z =
                    selectedPiece.position.z + (forZ === '0' ? 0 : forZ === '+' ? -n : n);

                  if (x >= 0 && z >= 0 && x <= 7 && z <= 7) {
                    if (
                      chessBoard[z][x] === null ||
                      chessBoard[z][x]?.owner !== user.name
                    )
                      possibleMoves.push([x, z]);
                    if (chessBoard[z][x]) break;
                  }
                }

                return possibleMoves;
              } else {
                const x =
                  selectedPiece.position.x +
                  (forX === '0' ? 0 : forX === '+' ? -move : move);
                const z =
                  selectedPiece.position.z +
                  (forZ === '0' ? 0 : forZ === '+' ? -move : move);

                console.log(x, z);
                if (x >= 0 && x <= 7 && z >= 0 && z <= 7) {
                  if (chessBoard[z][x] === null || chessBoard[z][x]?.owner !== user.name)
                    if (selectedPiece.id === 1)
                      if (!selectedPiece.moved) {
                        let possiblePawnMoves = getPossiblePawnMoves(chessBoard, z, x);
                        if (!chessBoard[z - 1][x]) possiblePawnMoves.push([x, z - 1]);

                        return possiblePawnMoves;
                      } else {
                        return getPossiblePawnMoves(chessBoard, z, x);
                      }
                    else return [[x, z]];
                }
                {
                  return [[]];
                }
              }
            } else {
              return move.map((m, i) => {
                let x = 0,
                  z = 0;

                if (forZ === '0') {
                  x = selectedPiece.position.x + (forX === '+' ? -move[0] : move[0]);
                  z = selectedPiece.position.z + (i === 0 ? 1 : -1);
                }
                if (forX === '0') {
                  z = selectedPiece.position.z + (forZ === '+' ? -move[0] : move[0]);
                  x = selectedPiece.position.x + (i === 0 ? -1 : 1);
                }

                if (x >= 0 && x <= 7 && z >= 0 && z <= 7) {
                  if (
                    chessBoard[z][x] === null ||
                    chessBoard[z][x]?.owner !== user.name
                  ) {
                    return [x, z];
                  } else return [];
                } else return [];
              });
            }
          } else return null;
        })
        .filter((f) => f !== null);
      //@ts-ignore
      setPossibleMoves(possibleMoves);
    } else setPossibleMoves([]);
  }, [selectedPiece]);

  useEffect(() => {
    socket?.on('piece moved', (game: chessGame) => {
      setChessBoard(
        game.owner === user.name
          ? game.state.reverse().map((el) => el.reverse())
          : game.state
      );
      setNextTurn(game.nextTurn);
    });
    socket?.on('pawn promoted', (game: chessGame) => {
      setChessBoard(
        game.owner === user.name
          ? game.state.reverse().map((el) => el.reverse())
          : game.state
      );
      setNextTurn(game.nextTurn);
    });
  }, [user]);

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
        {chessBoard.flatMap((row, rowIndex) =>
          row.map((piece, tileIndex) =>
            piece ? (
              <Piece
                {...piece}
                disabled={piece.owner !== user.name || nextTurn !== user.name}
                key={piece.uuid}
                position={{ x: tileIndex, z: rowIndex }}
                setSelectedPiece={setSelectedPiece}
              />
            ) : null
          )
        )}
      </Select>
    </>
  );
};

export default ChessBoard;
