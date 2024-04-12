import { PropsWithChildren, useState } from "react";
import CSS from "csstype";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Box, useMediaQuery } from "@mui/material";
import { TTile } from "../Types/Tile";

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
  minHeight: "150px",
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
  minHeight: "75px",
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
  submission: (TTile | null)[];
  answerkey: string[];
  successCloseEffect?: () => any;
  color?: any;
  ariaLabel?: string;
}

export default function SubmitModalButton({
  submission,
  answerkey,
  successCloseEffect,
  color = "primary",
  ariaLabel = "",
  children,
}: SubmitModalButtonProps) {
  const [winModalOpen, setWinModalOpen] = useState(false);
  const [invalidModalOpen, setInvalidModalOpen] = useState(false);
  const [useTilesModalOpen, setUseTilesModalOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:800px)");

  function submitSelection() {
    if (submission.some((t) => t == null)) {
      setUseTilesModalOpen(true);
      return;
    }
    let s = submission.map((t) => t!.letter).join("");
    if (answerkey.indexOf(s) !== -1) {
      setWinModalOpen(true);
    } else {
      setInvalidModalOpen(true);
    }
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
          {answerkey.length > 1
            ? " Other possible answers: " +
              answerkey.filter((w) => w !== submission.join("")).join(", ")
            : ""}
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
