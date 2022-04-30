export type position = { x: number; z: number };
export interface SelectedPiece {
  uuid: string;
  id: number;
  position: position;
  moved: boolean;
}
interface rowState {
  id: number;
  owner: string;
  moved: boolean;
  color: string;
}
export type chessBoard = (rowState | null)[][];
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
