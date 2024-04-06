import { Button, useTheme } from "@mui/material";
import { PropsWithChildren } from "react";
import CSS from "csstype";
import { TilePointValue } from "../Utilities/Constants";

const ButtonStyles: CSS.Properties = {
  width: "100px",
  height: "100px",
  padding: "4px",
  margin: "4px",
  backgroundColor: "#2a2a2a",
  fontSize: "64px",
  fontFamily: "Roboto",
};

const scoreStyles: CSS.Properties = {
  position: "absolute",
  right: "0px",
  bottom: "0px",
  width: "30px",
  height: "30px",

  margin: "4px",
  textAlign: "center",
  pointerEvents: "none",
  zIndex: "2",
  fontSize: "20px",
};

interface TileProps extends PropsWithChildren<any> {
  onClick: (letter: string) => void;
  letter: string | null;
}

export default function Tile({ onClick, letter = null, children }: TileProps) {
  const themes = useTheme();
  const score = letter != null ? TilePointValue[letter] : "";

  return (
    <div style={{ position: "relative", color: themes.palette.primary.main }}>
      {letter != null ? (
        <>
          <Button
            className="tile"
            aria-label={letter + "-tile-" + score + "-points"}
            onClick={() => onClick(letter)}
            style={ButtonStyles}
            variant="outlined"
          >
            {letter}
          </Button>
          <p style={scoreStyles}>{score}</p>
        </>
      ) : (
        <Button
          className="tile"
          style={{ ...ButtonStyles, backgroundColor: "#1a1a1a" }}
          variant="outlined"
          disabled
        />
      )}
    </div>
  );
}
