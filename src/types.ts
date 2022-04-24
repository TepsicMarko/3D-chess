export type position = { x: number; z: number };
export interface SelectedPiece {
  uuid: string;
  id: number;
  position: position;
  moved: boolean;
}
interface rowState {
  id: number;
  enemy: boolean;
  moved: boolean;
}
export type chessBoard = (rowState | null)[][];
