export const TilePointValue: Record<string, number> = {
  A: 1,
  B: 3,
  C: 3,
  D: 2,
  E: 1,
  F: 4,
  G: 2,
  H: 4,
  I: 1,
  J: 8,
  K: 5,
  L: 1,
  M: 3,
  N: 1,
  O: 1,
  P: 3,
  Q: 10,
  R: 1,
  S: 1,
  T: 1,
  U: 1,
  V: 4,
  W: 4,
  X: 8,
  Y: 4,
  Z: 10,
  " ": 0,
};

// Double the frequency if for 4 players
// prettier-ignore
export const TileBag = [
  "A", "A", "A", "A", "A", "A", "A", "A", "A", // 9 As
  "B", "B", // 2 Bs
  "C", "C", // 2 Cs
  "D", "D", "D", "D", // 4 Ds
  "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", // 12 Es
  "F", "F", // 2 Fs
  "G", "G", "G", // 3 Gs
  "H", "H", // 2 Hs
  "I", "I", "I", "I", "I", "I", "I", "I", "I", // 9 Is
  "J", // 1 J
  "K", // 1 K
  "L", "L", "L", "L", // 4 Ls
  "M", "M", // 2 Ms
  "N", "N", "N", "N", "N", "N", // 6 Ns
  "O", "O", "O", "O", "O", "O", "O", "O", // 8 Os
  "P", "P", // 2 Ps
  "Q", // 1 Q
  "R", "R", "R", "R", "R", "R", // 6 Rs
  "S", "S", "S", "S", // 4 Ss
  "T", "T", "T", "T", "T", "T", // 6 Ts
  "U", "U", "U", "U", // 4 Us
  "V", "V", // 2 Vs
  "W", "W", // 2 Ws
  "X", // 1 X
  "Y", "Y", // 2 Ys
  "Z", // 1 Z
  " ", " " // 2 blank tiles,
];
