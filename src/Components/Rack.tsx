import CSS from "csstype";
import Tile from "./Tile";

export function shuffleRack(rack: (string | null)[]): (string | null)[] {
  let newRack: (string | null)[] = [];
  let picked = 0xff;

  for (let j = 0; j < rack.length; j++) {
    let i = Math.floor(Math.random() * rack.length);
    while (((picked >> i) & 1) === 0)
      i = Math.floor(Math.random() * rack.length);
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

interface RackProps {
  onClick: (i: number, letter: string) => void;
  rack: (string | null)[];
  highlight: ("primary" | "success" | "error" | "info")[];
}

export default function Rack({ onClick, rack, highlight }: RackProps) {
  return (
    <div style={styles}>
      <>
        {rack.map((letter, idx) => (
          <Tile
            letter={letter}
            onClick={(letter) => onClick(idx, letter)}
            highlight={highlight[idx]}
            key={idx}
          />
        ))}
      </>
    </div>
  );
}
