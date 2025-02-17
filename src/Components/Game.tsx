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
import { TTile } from "../Types/Tile";
import TryCounter from "./TryCounter";

const styles: CSS.Properties = {
  justifyContent: "center",
  margin: "auto",
  width: "60%",
};

export default function Game() {
  const { configs } = useContext(ConfigContext);
  const [tileSelectorModalOpen, setTileSelectorModalOpen] = useState(false);
  const [answerKeyState, setAnswerKeyState] = useState<string[]>([]);
  const [selectionState, setSelectionState] = useState<(TTile | null)[]>(
    Array(configs.handSize).fill(null),
  );
  const [rackState, setRackState] = useState<(TTile | null)[]>(
    Array(configs.handSize).fill(null),
  );
  const [blankIdx, setBlankIdx] = useState(0);
  const [attemptsMade, setAttemptsMade] = useState(0);

  // remove from selection and add to rack
  function handleClickSelection(idx: number) {
    let rack = [...rackState];
    const i = rack.indexOf(null);
    rack[i] = selectionState[idx];
    if (rack[i]?.isBlank) rack[i]!.letter = " ";
    setRackState(rack);

    let sRack = [...selectionState];
    sRack[idx] = null;
    setSelectionState(sRack);
  }

  // remove from rack and add to selection
  function handleClickRack(idx: number) {
    if (rackState[idx]?.isBlank) {
      setBlankIdx(idx);
      setTileSelectorModalOpen(true);
      return;
    } else {
      let selRack = [...selectionState];
      let i = selRack.indexOf(null);
      selRack[i] = rackState[idx];
      setSelectionState(selRack);
    }

    let rack = [...rackState];
    rack[idx] = null;
    setRackState(rack);
  }

  // Opens the letter selector modal and adds the selected tile to selection
  function addBlankToSel(letter: string) {
    let selRack = [...selectionState];
    const i = selRack.indexOf(null);
    selRack[i] = { letter: letter, isBlank: true };
    setSelectionState(selRack);

    let newRack = [...rackState];
    newRack[blankIdx] = null;
    setRackState(newRack);
  }

  function clearSelection() {
    let sRack = selectionState.filter((t) => t !== null);
    let newRack = [...rackState];
    for (const t of sRack) {
      const i = newRack.indexOf(null);
      newRack[i] = t;
      if (t?.isBlank) newRack[i]!.letter = " ";
    }
    setRackState(newRack);
    setSelectionState(Array(configs.handSize).fill(null));
  }

  function shuffleRack(rack: (TTile | null)[]): (TTile | null)[] {
    let newRack: (TTile | null)[] = [];
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

  function getNewWord() {
    let answers: string[] = [];
    let newRack: (TTile | null)[] = [];

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

    while (answers.length <= 0) {
      newRack = [];
      if (configs.evenDistributionOn) {
        let rand = Math.floor(Math.random() * wordlist.length);
        newRack = wordlist[rand]
          .toUpperCase()
          .split("")
          .map((c) => ({ letter: c, isBlank: false }));
        // 13% chance to convert a tile to a blank tile
        if (Math.random() < 0.13) {
          let rand = Math.floor(Math.random() * configs.handSize);
          newRack[rand] = { letter: " ", isBlank: true };
        }
      } else {
        let tilebag = [...TileBag];
        for (let i = 0; i < configs.handSize; i++) {
          let rand = Math.floor(Math.random() * TileBag.length);
          if (configs.blankTilesOn === false && tilebag[rand] === " ") {
            i--;
            continue;
          }
          const l = tilebag.splice(rand, 1)[0];
          newRack.push({ letter: l, isBlank: l === " " });
        }
      }

      answers = findAllAnswers(
        newRack.map((t) => t?.letter).join(""),
        wordlist,
      );
    }

    console.log("answer keys: " + JSON.stringify(answers));
    setAttemptsMade(0);
    setAnswerKeyState(answers);
    setSelectionState(Array(configs.handSize).fill(null));
    setRackState(shuffleRack(newRack));
  }

  // eslint-disable-next-line
  useEffect(() => getNewWord(), []);

  return (
    <div style={styles}>
      <Rack rack={selectionState} onClick={handleClickSelection} />

      <div className="spacer" style={{ height: "100px" }} />

      <Rack rack={rackState} onClick={handleClickRack} />

      <div className="spacer" style={{ height: "40px" }} />

      {!configs.infiniteTriesOn && <TryCounter attempts={attemptsMade} />}

      <div className="spacer" style={{ height: "20px" }} />

      <ButtonControls
        selectionState={selectionState}
        answerKeyState={answerKeyState}
        setAnswerKeyState={setAnswerKeyState}
        onClearCallback={() => clearSelection()}
        onShuffleCallback={() => {
          setRackState(shuffleRack(rackState));
        }}
        setAttemptsMade={setAttemptsMade}
        attemptsMade={attemptsMade}
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
