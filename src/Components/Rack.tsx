import CSS from "csstype";
import Tile from "./Tile";
import { TTile } from "../Types/Tile";

const styles: CSS.Properties = {
  display: "inline-flex",
  width: "100%",
  justifyContent: "center",
};

interface RackProps {
  onClick: (i: number) => void;
  rack: (TTile | null)[];
}

export default function Rack({ onClick, rack }: RackProps) {
  return (
    <div style={styles}>
      {rack.map((tile, idx) => (
        <Tile key={idx} tile={tile} onClick={() => onClick(idx)} />
      ))}
    </div>
  );
}
