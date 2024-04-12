import { Button, useMediaQuery } from "@mui/material";
import ModalButton from "./ModalButton";
import SubmitModalButton from "./SubmitModalButton";
import CSS from "csstype";
import { TTile } from "../Types/Tile";
import { ConfigContext } from "./ConfigContext";
import { useContext } from "react";

const styles: CSS.Properties = {
  fontSize: "24px",
  margin: "5px",
};

const mobileStyles: CSS.Properties = {
  fontSize: "14px",
  margin: "5px",
};

const rowStyles: CSS.Properties = {
  display: "flex",
  flexWrap: "wrap",
  width: "100%",
  justifyContent: "space-around",
};

interface ButtonControlsProps {
  answerKeyState: string[];
  setAnswerKeyState: Function;
  selectionState: (TTile | null)[];
  onClearCallback: Function;
  onShuffleCallback: Function;
  setAttemptsMade: Function;
  attemptsMade: number;
  getNewWord: () => void;
}

export default function ButtonControls({
  answerKeyState,
  setAnswerKeyState,
  selectionState,
  onClearCallback,
  onShuffleCallback,
  setAttemptsMade,
  attemptsMade,
  getNewWord,
}: ButtonControlsProps) {
  const isMobile = useMediaQuery("(max-width:800px)");
  const { configs } = useContext(ConfigContext);

  return (
    <div style={rowStyles}>
      <ModalButton
        modalText={
          "The " +
          (configs.hardModeOn ? "remaining " : "") +
          "answer(s): " +
          answerKeyState.join(", ")
        }
        closeEffect={() => getNewWord()}
        color="error"
        ariaLabel="give-up-new-word"
      >
        Give up (New Word)
      </ModalButton>
      <Button
        variant="outlined"
        style={isMobile ? mobileStyles : styles}
        onClick={() => onClearCallback()}
      >
        Clear
      </Button>
      <Button
        variant="outlined"
        style={isMobile ? mobileStyles : styles}
        onClick={() => onShuffleCallback()}
      >
        Shuffle
      </Button>
      <SubmitModalButton
        submission={selectionState}
        answerkey={answerKeyState}
        setAnswerkey={setAnswerKeyState}
        setAttemptsMade={setAttemptsMade}
        attemptsMade={attemptsMade}
        getNewWord={getNewWord}
      >
        Submit
      </SubmitModalButton>
    </div>
  );
}
