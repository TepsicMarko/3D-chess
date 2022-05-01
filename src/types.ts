export type position = { x: number; z: number };
export interface SelectedPiece {
  id: number;
  position: position;
  moved: boolean;
}
interface pieceInfo {
  uuid: string;
  id: number;
  owner: string;
  moved: boolean;
  color: string;
}
export type chessBoard = (pieceInfo | null)[][];
export interface chessGame {
  state: chessBoard;
  owner: string;
  guest: string;
  nextTurn: string;
}
export interface moveInfo {
  gameId: string;
  selectedPiece: SelectedPiece;
  newPosition: position;
}
