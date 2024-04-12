import {
  IconButton,
  Box,
  Modal,
  Typography,
  Divider,
  useMediaQuery,
} from "@mui/material";
import CSS from "csstype";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useState } from "react";

const modalStyles: CSS.Properties = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "650px",
  width: "600px",
  backgroundColor: "#222222",
  border: "solid",
  borderWidth: "2px",
  borderColor: "white",
  boxShadow: "24",

  padding: "50px 50px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "left",
  textAlign: "left",
  color: "white",
  fontSize: "24px",
};

const mobileModalStyles: CSS.Properties = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "780px",
  width: "450px",
  backgroundColor: "#222222",
  border: "solid",
  borderWidth: "2px",
  borderColor: "white",
  boxShadow: "24",

  padding: "20px 20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "left",
  textAlign: "left",
  color: "white",
  fontSize: "18px",
};

type InfoIconButtonProps = {};

export default function SettingsIconButton({}: InfoIconButtonProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:800px)");

  return (
    <>
      <IconButton
        aria-label="settings"
        size="large"
        color="primary"
        onClick={() => setModalOpen(true)}
        style={{}}
      >
        <InfoOutlinedIcon sx={{ fontSize: "50px" }} />
      </IconButton>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby={"info-popup-box"}
      >
        <Box sx={isMobile ? mobileModalStyles : modalStyles}>
          <Typography variant="h4" padding="4px">
            Info
          </Typography>
          <Divider />
          <Typography variant="body1" padding="4px">
            SCRAMBLED is an addictive online game, players are presented with
            seven Scrabble tiles, each holding a letter. Your task? Unravel the
            hidden mystery word by rearranging these tiles into the correct
            sequence to form a bingo. With thousands of potential words waiting
            to be discovered, every round promises a fresh challenge and an
            opportunity to expand your vocabulary.
          </Typography>
          <Divider />
          <Typography variant="h4" padding="4px">
            How To Play
          </Typography>
          <Typography variant="body1" padding="4px">
            Click any tiles on the lower rack to add it to the upper rack. The
            upper rack is your selection, try to form a 7-letter word (A.K.A. A
            bingo) there. Click any tiles from the upper rack to return it to
            the lower rack.
          </Typography>
          <Typography variant="body1" padding="4px">
            Once you think you have the bingo, hit the "Submit" button. To
            rearrange your bottom rack hit the "Shuffle" button. To move ALL
            tiles from the upper rack back down to the lower rack hit "Clear".
            Hit "Give up" and get a new word to find.
          </Typography>
          <Typography variant="body1" padding="4px">
            Pro controls allow you to dictate exactly where to send a tile and
            swap with any other tiles. Simply click a tile to light it up, then
            select an empty place to send it there or another tile to swap
            places with it.
          </Typography>
          <Divider />
          <Typography variant="h4" padding="4px">
            About
          </Typography>
          <Typography variant="body1" padding="4px">
            A game made by craneppeakare. I released this game for free for
            everyone! Any donations at any amount would be highly appreciated.
          </Typography>
          <a
            href="https://ko-fi.com/O5O7WT8Z2"
            target="_blank"
            rel="noreferrer"
          >
            <img
              height="36"
              style={{ border: "0px", height: "36px" }}
              src="https://storage.ko-fi.com/cdn/kofi5.png?v=3"
              alt="Buy Me a Coffee at ko-fi.com"
            />
          </a>
        </Box>
      </Modal>
    </>
  );
}
