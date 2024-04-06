import { PropsWithChildren, useState } from "react";
import CSS from "csstype";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";

const modalStyles: CSS.Properties = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "150px",
  width: "400px",
  backgroundColor: "#1f1f1f",
  border: "solid",
  borderWidth: "2px",
  borderColor: "white",
  boxShadow: "24",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  color: "white",
  fontSize: "30px",
};

interface ModalButtonProps extends PropsWithChildren<any> {
  modalText: string;
  closeEffect?: () => any;
  color?: any;
  ariaLabel?: string;
}

export default function ModalButton({
  closeEffect,
  modalText,
  color = "primary",
  ariaLabel = "",
  children,
}: ModalButtonProps) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Button
        variant="outlined"
        aria-label={ariaLabel}
        color={color}
        style={{ fontSize: "24px" }}
        onClick={() => setModalOpen(true)}
      >
        {children}
      </Button>
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          if (closeEffect != null) closeEffect();
        }}
        aria-labelledby={ariaLabel}
      >
        <Box sx={modalStyles}>{modalText}</Box>
      </Modal>
    </>
  );
}
