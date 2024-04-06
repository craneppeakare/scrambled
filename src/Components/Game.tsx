import CSS from "csstype";
import Rack, { shuffleRack } from "./Rack";
import { useEffect, useState } from "react";
import Wordlist from "../Utilities/Wordlist";
import ButtonControls from "./ButtonControls";
import { findAllAnswers } from "../Utilities/Common";

const styles: CSS.Properties = {
  justifyContent: "center",
  margin: "auto",
  width: "50%",
};

export default function Game() {
  const [answerKeyState, setAnswerKeyState] = useState<string[]>([]);
  const [selectionState, setSelectionState] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [rackState, setRackState] = useState<(string | null)[]>([
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
  ]);

  // remove from selection and add to rack
  function handleClickSelection(idx: number, letter: string) {
    let sRack = [...selectionState];
    sRack[idx] = null;
    setSelectionState(sRack);

    let rack = [...rackState];
    idx = rack.indexOf(null);
    rack[idx] = letter;
    setRackState(rack);
  }

  // remove from rack and add to selection
  function handleClickRack(idx: number, letter: string) {
    let rack = [...rackState];
    rack[idx] = null;
    setRackState(rack);

    let selRack = [...selectionState];
    idx = selRack.indexOf(null);
    selRack[idx] = letter;
    setSelectionState(selRack);
  }

  function getNewWord() {
    let i = Math.floor(Math.random() * Wordlist.length);
    const newWord = Wordlist[i].toUpperCase();
    const answers = findAllAnswers(Wordlist[i], Wordlist);
    console.log("answer keys: " + JSON.stringify(answers));
    setAnswerKeyState(answers);
    setSelectionState([null, null, null, null, null, null, null]);
    let newRack: (string | null)[] = [];
    for (let i = 0; i < newWord.length; i++) {
      let c = newWord.at(i);
      if (c !== undefined) newRack.push(c);
    }
    setRackState(shuffleRack(newRack));
  }

  useEffect(() => getNewWord(), []);

  return (
    <div style={styles}>
      <Rack rack={selectionState} onClick={handleClickSelection} />

      <div className="spacer" style={{ height: "100px" }} />

      <Rack rack={rackState} onClick={handleClickRack} />

      <div className="spacer" style={{ height: "80px" }} />

      <ButtonControls
        answerKeyState={answerKeyState}
        rackState={rackState}
        setRackState={setRackState}
        selectionState={selectionState}
        setSelectionState={setSelectionState}
        getNewWord={getNewWord}
      />
    </div>
  );
}
