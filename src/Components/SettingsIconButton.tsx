import {
  IconButton,
  Box,
  Modal,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
  Typography,
  Divider,
  Slider,
  useMediaQuery,
} from "@mui/material";
import CSS from "csstype";
import SettingsIcon from "@mui/icons-material/Settings";
import { useContext, useState } from "react";
import { ConfigContext } from "./ConfigContext/ConfigContext";

const modalStyles: CSS.Properties = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "600px",
  width: "600px",
  backgroundColor: "#222222",
  border: "solid",
  borderWidth: "2px",
  borderColor: "white",
  boxShadow: "24",

  padding: "100px 50px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "left",
  textAlign: "left",
  color: "white",
  fontSize: "30px",
};

const mobileModalStyles: CSS.Properties = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "650px",
  width: "350px",
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

const labelStyles: CSS.Properties = {
  fontSize: "24px",
  fontWeight: "bold",
  paddingTop: "15px",
};

type SettingsIconButtonProps = {
  rerender: () => void;
};

export default function SettingsIconButton({
  rerender,
}: SettingsIconButtonProps) {
  const [refreshModal, setRefreshModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { configs, addConfig } = useContext(ConfigContext);
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
        <SettingsIcon sx={{ fontSize: "50px" }} />
      </IconButton>
      <Modal
        open={modalOpen}
        onClose={() => {
          console.log(configs);
          rerender();
          setModalOpen(false);
        }}
        aria-labelledby={"some-label"}
      >
        <Box sx={isMobile ? mobileModalStyles : modalStyles}>
          <Typography variant="h4" align="center" padding="5px">
            Settings
          </Typography>
          <Divider />
          <FormControl color="secondary" fullWidth>
            <FormLabel
              id="settings-switches-header"
              color="primary"
              sx={labelStyles}
              focused
            >
              Game Settings
            </FormLabel>
            <Typography
              id="word-length-slider"
              gutterBottom
              style={{ paddingTop: "15px", margin: "0px" }}
            >
              Word length:
            </Typography>
            <Slider
              aria-label="word-length-adjuster"
              defaultValue={7}
              valueLabelDisplay="auto"
              shiftStep={1}
              step={1}
              marks={[
                { value: 3, label: "3" },
                { value: 7, label: "7" },
              ]}
              min={3}
              max={7}
              style={{ width: "50%", padding: "15px 0px" }}
              disabled // TODO - remove disable this!
            />
            <FormControlLabel
              control={
                <Switch
                  checked={configs.showTileScore}
                  onChange={() => {
                    addConfig(configs, {
                      key: "showTileScore",
                      value: !configs.showTileScore,
                    });
                    setRefreshModal(!refreshModal);
                  }}
                />
              }
              label="Show tile point values"
            />
            <FormControlLabel
              control={<Switch />}
              label="Enable Pro Controls"
              onChange={() => console.log("beep boop TODO")}
              disabled // TODO - remove disable this!
            />
            <FormControlLabel
              control={<Switch />}
              label="Enable blank tiles"
              checked={configs.blankTilesOn}
              onChange={() => {
                addConfig(configs, {
                  key: "blankTilesOn",
                  value: !configs.blankTilesOn,
                });
                setRefreshModal(!refreshModal);
              }}
            />
            <FormLabel
              id="select-dictionary-to-use-label"
              color="primary"
              sx={labelStyles}
              focused
            >
              Dictionary Type
            </FormLabel>
            <RadioGroup
              aria-labelledby="dictionary-type-selector"
              value={configs.wordlist}
              onChange={(e) => {
                addConfig(configs, { key: "wordlist", value: e.target.value });
                setRefreshModal(!refreshModal);
              }}
              name="radio-buttons-group"
              color="primary"
            >
              <FormControlLabel
                value="wordfind"
                control={<Radio />}
                label="wordfind.com (Scrabble Online)"
              />
              <FormControlLabel
                value="wordnik"
                control={<Radio />}
                label="Wordnik (Letter League)"
              />
              <FormControlLabel
                value="naspa"
                control={<Radio />}
                label="NASPA (Unavailable Currently)"
                disabled
              />
              <FormControlLabel
                value="csw"
                control={<Radio />}
                label="CSW/SOWPODS (Unavailable Currently)"
                disabled
              />
            </RadioGroup>
          </FormControl>
        </Box>
      </Modal>
    </>
  );
}
