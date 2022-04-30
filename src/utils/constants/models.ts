interface models {
  [key: number]: { name: string; size: number };
}

const models: models = {
  1: { name: 'PrimaryWhitePawn007', size: 1 },
  2: { name: 'Rook001', size: 1.5 },
  3: { name: 'WhiteKnight001', size: 1.5 },
  4: { name: 'PrimaryWhiteBishop001', size: 0.25 },
  5: { name: 'WhiteKing', size: 1 },
  6: { name: 'WhiteQueen', size: 0.25 },
};

export default models;
