import { Button, useMediaQuery, useTheme } from "@mui/material";
import { useContext } from "react";
import CSS from "csstype";
import { TilePointValue } from "../Utilities/Constants";
import { ConfigContext } from "./ConfigContext";
import { TTile } from "../Types/Tile";

const ButtonStyles: CSS.Properties = {
  width: "100px",
  height: "100px",
  padding: "4px",
  margin: "4px",
  backgroundColor: "#2a2a2a",
  fontSize: "64px",
  fontFamily: "Roboto",
};

const mobileButtonStyles: CSS.Properties = {
  maxHeight: "50px",
  maxWidth: "50px",
  minHeight: "50px",
  minWidth: "50px",
  padding: "2px",
  margin: "2px",
  backgroundColor: "#2a2a2a",
  fontSize: "26px",
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

const mobileScoreStyles: CSS.Properties = {
  position: "absolute",
  right: "0px",
  bottom: "0px",
  width: "20px",
  height: "20px",

  margin: "4px",
  textAlign: "center",
  pointerEvents: "none",
  zIndex: "2",
  fontSize: "12px",
};

interface TileProps {
  onClick: () => void;
  tile: TTile | null;
}

export default function Tile({ onClick, tile = null }: TileProps) {
  const { configs } = useContext(ConfigContext);
  const themes = useTheme();
  const score = tile != null ? TilePointValue[tile.letter] : "";
  const isMobile = useMediaQuery("(max-width:800px)");

  return (
    <div style={{ position: "relative", color: themes.palette.primary.main }}>
      {tile != null ? (
        <>
          <Button
            className="tile"
            color={tile.isBlank ? "info" : "primary"}
            aria-label={tile.letter + "-tile-" + score + "-points"}
            onClick={() => onClick()}
            sx={isMobile ? mobileButtonStyles : ButtonStyles}
            variant="outlined"
          >
            {tile.letter}
          </Button>
          {configs.showTileScore === true && (
            <p style={isMobile ? mobileScoreStyles : scoreStyles}>
              {tile.isBlank ? 0 : score}
            </p>
          )}
        </>
      ) : (
        <Button
          className="tile"
          sx={{
            ...(isMobile ? mobileButtonStyles : ButtonStyles),
            backgroundColor: "#1a1a1a",
          }}
          variant="outlined"
          disabled
        />
      )}
    </div>
  );
}
