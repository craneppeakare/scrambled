import { PropsWithChildren } from "react";
import CSS from "csstype";
import Tile from "./Tile";

const hand_size = 7;

export function shuffleRack(rack: (string | null)[]): (string | null)[] {
  let newRack: (string | null)[] = [];
  let picked = 0xff;

  for (let j = 0; j < hand_size; j++) {
    let i = Math.floor(Math.random() * hand_size);
    while (((picked >> i) & 1) === 0) i = Math.floor(Math.random() * hand_size);
    newRack.push(rack[i]);
    picked ^= 1 << i;
  }

  return newRack;
}

const styles: CSS.Properties = {
  display: "inline-flex",
  width: "100%",
  justifyContent: "center",
};

interface RackProps extends PropsWithChildren<any> {
  onClick: (i: number, letter: string) => void;
  rack: (string | null)[];
}

export default function Rack({ onClick, rack, children }: RackProps) {
  return (
    <div style={styles}>
      <>
        {rack.map((letter, idx) => (
          <Tile
            letter={letter}
            onClick={(letter) => onClick(idx, letter)}
            key={idx}
          />
        ))}
      </>
    </div>
  );
}
