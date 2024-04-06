import { Button } from "@mui/material";
import ModalButton from "./ModalButton";
import SubmitModalButton from "./SubmitModalButton";
import CSS from "csstype";
import { shuffleRack } from "./Rack";

const styles: CSS.Properties = {
  display: "flex",
  width: "100%",
  justifyContent: "space-around",
};

interface ButtonControlsProps {
  answerKeyState: string[];
  rackState: (string | null)[];
  setRackState: React.Dispatch<React.SetStateAction<(string | null)[]>>;
  selectionState: (string | null)[];
  setSelectionState: React.Dispatch<React.SetStateAction<(string | null)[]>>;
  getNewWord: () => void;
}

export default function ButtonControls({
  answerKeyState,
  rackState,
  setRackState,
  selectionState,
  setSelectionState,
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

  return (
    <div style={styles}>
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
        style={{ fontSize: "24px" }}
        onClick={clearSelection}
      >
        Clear
      </Button>
      <Button
        variant="outlined"
        style={{ fontSize: "24px" }}
        onClick={() => setRackState(shuffleRack(rackState))}
      >
        Shuffle
      </Button>
      <SubmitModalButton
        submission={selectionState}
        answerkey={answerKeyState}
        successCloseEffect={() => getNewWord()}
      >
        Submit
      </SubmitModalButton>
    </div>
  );
}
