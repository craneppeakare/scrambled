import { PropsWithChildren, useState } from "react";
import CSS from "csstype";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Box, useMediaQuery } from "@mui/material";

const styles: CSS.Properties = {
  fontSize: "24px",
  margin: "5px",
};

const mobileStyles: CSS.Properties = {
  fontSize: "14px",
  margin: "5px",
};

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

const mobileModalStyles: CSS.Properties = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "75px",
  width: "200px",
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
  fontSize: "16px",
};

interface SubmitModalButtonProps extends PropsWithChildren<any> {
  submission: (string | null)[];
  answerkey: string[];
  successCloseEffect?: () => any;
  onSubmitCallback: Function;
  color?: any;
  ariaLabel?: string;
}

export default function SubmitModalButton({
  submission,
  answerkey,
  successCloseEffect,
  onSubmitCallback,
  color = "primary",
  ariaLabel = "",
  children,
}: SubmitModalButtonProps) {
  const [winModalOpen, setWinModalOpen] = useState(false);
  const [invalidModalOpen, setInvalidModalOpen] = useState(false);
  const [useTilesModalOpen, setUseTilesModalOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:800px)");

  function submitSelection() {
    if (submission.some((c) => c == null)) {
      setUseTilesModalOpen(true);
      return;
    }
    let s = [...submission].join("");
    if (answerkey.indexOf(s) !== -1) {
      setWinModalOpen(true);
    } else {
      setInvalidModalOpen(true);
    }
    onSubmitCallback();
  }

  return (
    <>
      <Button
        variant="outlined"
        aria-label={ariaLabel}
        color={color}
        style={isMobile ? mobileStyles : styles}
        onClick={submitSelection}
      >
        {children}
      </Button>
      <Modal
        open={winModalOpen}
        onClose={() => {
          setWinModalOpen(false);
          if (successCloseEffect) successCloseEffect();
        }}
        aria-labelledby="submit-selection"
      >
        <Box sx={isMobile ? mobileModalStyles : modalStyles}>
          Yay you found the bingo!
        </Box>
      </Modal>
      <Modal
        open={invalidModalOpen}
        onClose={() => setInvalidModalOpen(false)}
        aria-labelledby="submit-selection"
      >
        <Box sx={isMobile ? mobileModalStyles : modalStyles}>
          Invalid word! Try again
        </Box>
      </Modal>
      <Modal
        open={useTilesModalOpen}
        onClose={() => setUseTilesModalOpen(false)}
        aria-labelledby="submit-selection"
      >
        <Box sx={isMobile ? mobileModalStyles : modalStyles}>
          Use all tiles before submitting!
        </Box>
      </Modal>
    </>
  );
}
