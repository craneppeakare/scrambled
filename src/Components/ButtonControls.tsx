import { Button, useMediaQuery } from "@mui/material";
import ModalButton from "./ModalButton";
import SubmitModalButton from "./SubmitModalButton";
import CSS from "csstype";
import { shuffleRack } from "./Rack";

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
  rackState: (string | null)[];
  setRackState: React.Dispatch<React.SetStateAction<(string | null)[]>>;
  selectionState: (string | null)[];
  setSelectionState: React.Dispatch<React.SetStateAction<(string | null)[]>>;
  onSubmitCallback: Function;
  getNewWord: () => void;
}

export default function ButtonControls({
  answerKeyState,
  rackState,
  setRackState,
  selectionState,
  setSelectionState,
  onSubmitCallback,
  getNewWord,
}: ButtonControlsProps) {
  function clearSelection() {
    let newRack = [...rackState];
    let selRack = [...selectionState.filter((c) => c != null)];
    newRack.forEach((c, i) => {
      if (c == null) newRack[i] = selRack.shift() as string;
    });
    setRackState(newRack);
    setSelectionState([null, null, null, null, null, null, null]);
  }
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
        onClick={clearSelection}
      >
        Clear
      </Button>
      <Button
        variant="outlined"
        style={isMobile ? mobileStyles : styles}
        onClick={() => setRackState(shuffleRack(rackState))}
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
