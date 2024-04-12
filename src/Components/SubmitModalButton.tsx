import { PropsWithChildren, useContext, useState } from "react";
import CSS from "csstype";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Box, useMediaQuery } from "@mui/material";
import { TTile } from "../Types/Tile";
import { ConfigContext } from "./ConfigContext";

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
  setAnswerkey: Function;
  setAttemptsMade: Function;
  attemptsMade: number;
  getNewWord: () => void;
  color?: any;
  ariaLabel?: string;
}

export default function SubmitModalButton({
  submission,
  answerkey,
  setAnswerkey,
  setAttemptsMade,
  attemptsMade,
  getNewWord,
  color = "primary",
  ariaLabel = "",
  children,
}: SubmitModalButtonProps) {
  const [winModalOpen, setWinModalOpen] = useState(false);
  const [invalidModalOpen, setInvalidModalOpen] = useState(false);
  const [useTilesModalOpen, setUseTilesModalOpen] = useState(false);
  const [failedAllTriesModalOpen, setFailedAllTriesModalOpen] = useState(false);
  const [alreadySubmittedModalOpen, setAlreadySubmittedModalOpen] =
    useState(false);
  const [prevSubmitted, setPrevSubmitted] = useState<string[]>([]);
  const isMobile = useMediaQuery("(max-width:800px)");
  const { configs } = useContext(ConfigContext);

  function submitSelection() {
    if (submission.some((t) => t == null)) {
      setUseTilesModalOpen(true);
      return;
    }
    let s = submission.map((t) => t!.letter).join("");
    if (prevSubmitted.indexOf(s) !== -1) {
      setAlreadySubmittedModalOpen(true);
    } else if (answerkey.indexOf(s) !== -1) {
      if (configs.hardModeOn) {
        let ak = [...answerkey];
        ak.splice(answerkey.indexOf(s), 1);
        setAnswerkey(ak);

        let ps = [...prevSubmitted];
        ps.push(s);
        setPrevSubmitted(ps);
      }
      setWinModalOpen(true);
    } else {
      if (!configs.infiniteTriesOn && attemptsMade + 1 >= configs.maxTries) {
        setFailedAllTriesModalOpen(true);
      } else {
        setInvalidModalOpen(true);
      }
      if (!configs.infiniteTriesOn) setAttemptsMade(attemptsMade + 1);
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
          if (!configs.hardModeOn || answerkey.length === 0) {
            setPrevSubmitted([]);
            getNewWord();
          }
        }}
        aria-labelledby="submit-selection"
      >
        <Box sx={isMobile ? mobileModalStyles : modalStyles}>
          Yay you found a bingo!
          {configs.hardModeOn &&
            answerkey.length > 0 &&
            " More bingos are possible!"}
          {!configs.hardModeOn &&
            answerkey.length > 1 &&
            " All possible answers: " + answerkey.join(", ")}
        </Box>
      </Modal>
      <Modal
        open={alreadySubmittedModalOpen}
        onClose={() => {
          setAlreadySubmittedModalOpen(false);
        }}
        aria-labelledby="repeat-submit-selection"
      >
        <Box sx={isMobile ? mobileModalStyles : modalStyles}>
          You already submitted this answer!
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
      <Modal
        open={failedAllTriesModalOpen}
        onClose={() => {
          setFailedAllTriesModalOpen(false);
          getNewWord();
        }}
        aria-labelledby={ariaLabel}
      >
        <Box sx={isMobile ? mobileModalStyles : modalStyles}>
          {"The " +
            (configs.hardModeOn ? "remaining " : "") +
            "answer(s): " +
            answerkey.join(", ")}
        </Box>
      </Modal>
    </>
  );
}
