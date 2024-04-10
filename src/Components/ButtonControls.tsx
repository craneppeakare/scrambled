import { Button, useMediaQuery } from "@mui/material";
import ModalButton from "./ModalButton";
import SubmitModalButton from "./SubmitModalButton";
import CSS from "csstype";

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
  selectionState: (string | null)[];
  onClearCallback: Function;
  onShuffleCallback: Function;
  onSubmitCallback: Function;
  getNewWord: () => void;
}

export default function ButtonControls({
  answerKeyState,
  selectionState,
  onClearCallback,
  onShuffleCallback,
  onSubmitCallback,
  getNewWord,
}: ButtonControlsProps) {
  const isMobile = useMediaQuery("(max-width:800px)");

  return (
    <div style={rowStyles}>
      <ModalButton
        modalText={"The answer(s): " + answerKeyState.join(", ")}
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
        onSubmitCallback={onSubmitCallback}
        successCloseEffect={() => getNewWord()}
      >
        Submit
      </SubmitModalButton>
    </div>
  );
}
