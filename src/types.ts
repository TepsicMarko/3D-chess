export type chessBoard = number[][];
export type position = { x: number; z: number };
export type SelectedPiece = {
  uuid: string;
  id: number;
  position: position;
  moved: boolean;
};
