import CSS from "csstype";
import Tile from "./Tile";

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
