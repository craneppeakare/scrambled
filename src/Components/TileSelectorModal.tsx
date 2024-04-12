import CSS from "csstype";
import Modal from "@mui/material/Modal";
import { Box, useMediaQuery } from "@mui/material";
import Tile from "./Tile";

const modalStyles: CSS.Properties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "600px",
  width: "600px",
  backgroundColor: "#222222",
  border: "solid",
  borderWidth: "2px",
  borderColor: "white",
  boxShadow: "24",

  padding: "100px 50px",
  display: "flex",
  flexWrap: "wrap",
  color: "white",
};

const mobileModalStyles: CSS.Properties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "300px",
  width: "350px",
  backgroundColor: "#222222",
  border: "solid",
  borderWidth: "2px",
  borderColor: "white",
  boxShadow: "24",

  margin: "20px",
  padding: "100px 40px",
  display: "flex",
  flexWrap: "wrap",
  color: "white",
};

interface TileSelectorModalProps {
  modalOpen: boolean;
  onClose: () => any;
  callback: (s: string) => any;
  ariaLabel?: string;
}

export default function TileSelectorModal({
  callback,
  modalOpen,
  onClose,
  ariaLabel = "",
}: TileSelectorModalProps) {
  const isMobile = useMediaQuery("(max-width:800px)");
  const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  return (
    <Modal open={modalOpen} onClose={onClose} aria-labelledby={ariaLabel}>
      <Box sx={isMobile ? mobileModalStyles : modalStyles}>
        {alpha.map((a, i) => (
          <Tile
            key={i}
            tile={{ letter: a, isBlank: false }}
            onClick={() => {
              callback(a);
            }}
          />
        ))}
      </Box>
    </Modal>
  );
}
