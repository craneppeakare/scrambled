import CSS from "csstype";
import Rack from "./Rack";
import { useContext, useEffect, useState } from "react";
import { Wordlist as WordfindList } from "../Utilities/WordfindWordlist";
import { Wordlist as WordnikList } from "../Utilities/WordnikWordlist";
import ButtonControls from "./ButtonControls";
import { findAllAnswers } from "../Utilities/Common";
import { TileBag } from "../Utilities/Constants";
import { ConfigContext } from "./ConfigContext";
import TileSelectorModal from "./TileSelectorModal";

const styles: CSS.Properties = {
  justifyContent: "center",
  margin: "auto",
  width: "50%",
};

export default function Game() {
  const { configs } = useContext(ConfigContext);
  const [tileSelectorModalOpen, setTileSelectorModalOpen] = useState(false);
  const [blankIdxState, setBlankIdxState] = useState(0);
  const [answerKeyState, setAnswerKeyState] = useState<string[]>([]);
  // TODO - these are not very good for variable rack lengths
  const [selectionState, setSelectionState] = useState<(string | null)[]>(
    Array(configs.handSize).fill(null)
  );
  const [rackState, setRackState] = useState<(string | null)[]>(
    Array(configs.handSize).fill(null)
  );
  const [rackColors, setRackColors] = useState<
    ("primary" | "success" | "error" | "info")[]
  >(Array(configs.handSize).fill("primary"));
  const [selColors, setSelColors] = useState<
    ("primary" | "success" | "error" | "info")[]
  >(Array(configs.handSize).fill("primary"));

  // remove from selection and add to rack
  function handleClickSelection(idx: number) {
    let letter = selectionState[idx];
    let sRack = [...selectionState];
    let sColors = [...selColors];
    const colorCopy = sColors[idx];
    sRack[idx] = null;
    sColors[idx] = "primary";
    setSelectionState(sRack);
    setSelColors(sColors);

    let rack = [...rackState];
    idx = rack.indexOf(null);
    let rColors = [...rackColors];
    if (colorCopy === "info") {
      rColors[idx] = "info";
      letter = " ";
    } else {
      rColors[idx] = "primary";
    }
    rack[idx] = letter;
    setRackColors(rColors);
    setRackState(rack);
  }

  // remove from rack and add to selection
  function handleClickRack(idx: number) {
    const letter = rackState[idx];
    if (letter === " ") {
      setBlankIdxState(idx);
      setTileSelectorModalOpen(true);
      return;
    }
    let rack = [...rackState];
    rack[idx] = null;
    setRackState(rack);

    let selRack = [...selectionState];
    idx = selRack.indexOf(null);
    selRack[idx] = letter;
    setSelectionState(selRack);
  }

  function addBlankToSel(letter: string) {
    let rack = [...rackState];
    rack[blankIdxState] = null;
    setRackState(rack);

    let selRack = [...selectionState];
    const idx = selRack.indexOf(null);
    selRack[idx] = letter;
    setSelectionState(selRack);

    let sColors = [...selColors];
    sColors[idx] = "info";
    setSelColors(sColors);
  }

  function clearSelection() {
    let newRack = [...rackState];
    let rColors = [...rackColors];
    for (let i = 0; i < configs.handSize; i++) {
      const letter = selectionState[i];
      if (letter === null) {
        continue;
      } else {
        const idx = newRack.indexOf(null);
        if (selColors[i] === "info") {
          newRack[idx] = " ";
          rColors[idx] = "info";
        } else {
          newRack[idx] = letter;
          rColors[idx] = "primary";
        }
      }
    }
    setRackState(newRack);
    setRackColors(rColors);
    setSelectionState(Array(configs.handSize).fill(null));
    setSelColors(Array(configs.handSize).fill("primary"));
  }

  function shuffleRack(rack: (string | null)[]): (string | null)[] {
    let newRack: (string | null)[] = [];
    let picked = 0xff;

    for (let j = 0; j < rack.length; j++) {
      let i = Math.floor(Math.random() * rack.length);
      while (((picked >> i) & 1) === 0)
        i = Math.floor(Math.random() * rack.length);
      newRack.push(rack[i]);
      picked ^= 1 << i;
    }

    return newRack;
  }

  function onSubmit() {
    if (configs.easyModeEnabled) {
      setSelColors(
        selColors.map((c, i) => {
          if (c === "info") return "info";
          if (c === answerKeyState[0][i]) return "success";
          return "error";
        })
      );
    } else {
      setSelColors(selColors.map((c) => (c === "info" ? "info" : "primary")));
    }
  }

  function getNewWord() {
    let answers: string[] = [];
    let newRack: (string | null)[] = [];

    while (answers.length <= 0) {
      newRack = [];
      let tilebag = [...TileBag];
      for (let i = 0; i < configs.handSize; i++) {
        let rand = Math.floor(Math.random() * TileBag.length);
        if (configs.blankTilesOn === false && tilebag[rand] === " ") {
          i--;
          continue;
        }
        newRack.push(tilebag.splice(rand, 1)[0]);
      }

      let wordlist;
      switch (configs.wordlist) {
        case "wordnik":
          wordlist = WordnikList;
          break;
        default:
        case "wordfind":
          wordlist = WordfindList;
          break;
      }
      answers = findAllAnswers(newRack.join(""), wordlist);
    }

    console.log("answer keys: " + JSON.stringify(answers));
    setAnswerKeyState(answers);
    setSelectionState([null, null, null, null, null, null, null]);
    setRackState(shuffleRack(newRack));
    setRackColors(Array(configs.handSize).fill("primary"));
    setSelColors(Array(configs.handSize).fill("primary"));
  }

  useEffect(() => getNewWord(), []);

  return (
    <div style={styles}>
      <Rack
        rack={selectionState}
        highlight={selColors}
        onClick={handleClickSelection}
      />

      <div className="spacer" style={{ height: "100px" }} />

      <Rack rack={rackState} highlight={rackColors} onClick={handleClickRack} />

      <div className="spacer" style={{ height: "80px" }} />

      <ButtonControls
        answerKeyState={answerKeyState}
        selectionState={selectionState}
        onClearCallback={() => clearSelection()}
        onShuffleCallback={() => {
          setRackState(shuffleRack(rackState));
          setRackColors(Array(configs.handSize).fill("primary"));
        }}
        onSubmitCallback={onSubmit}
        getNewWord={getNewWord}
      />

      <TileSelectorModal
        callback={(l) => {
          setTileSelectorModalOpen(false);
          addBlankToSel(l);
        }}
        modalOpen={tileSelectorModalOpen}
        onClose={() => {
          setTileSelectorModalOpen(false);
        }}
      />
    </div>
  );
}
