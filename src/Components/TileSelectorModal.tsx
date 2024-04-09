import { PropsWithChildren, useState } from "react";
import CSS from "csstype";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Box, useMediaQuery } from "@mui/material";
import Tile from "./Tile";

const styles: CSS.Properties = {
  fontSize: "24px",
  margin: "5px",
};

const mobileStyles: CSS.Properties = {
  fontSize: "14px",
  margin: "5px",
};

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

interface TileSelectorModalProps extends PropsWithChildren<any> {
  modalOpen: boolean;
  onClose: () => any;
  callback: (s: string) => any;
  color?: any;
  ariaLabel?: string;
}

export default function TileSelectorModal({
  callback,
  modalOpen,
  onClose,
  color = "primary",
  ariaLabel = "",
  children,
}: TileSelectorModalProps) {
  const isMobile = useMediaQuery("(max-width:800px)");
  const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  return (
    <Modal open={modalOpen} onClose={onClose} aria-labelledby={ariaLabel}>
      <Box sx={isMobile ? mobileModalStyles : modalStyles}>
        {alpha.map((a, i) => (
          <Tile
            key={i}
            onClick={() => {
              callback(a);
            }}
            highlight="primary"
            letter={a}
          />
        ))}
      </Box>
    </Modal>
  );
}
