import { useContext } from "react";
import CSS from "csstype";
import { ConfigContext } from "./ConfigContext";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { Typography } from "@mui/material";

const styles: CSS.Properties = {
  padding: "5px",
  alignContent: "center",
};

interface TryCounterProps {
  attempts: number;
}

export default function TryCounter({ attempts }: TryCounterProps) {
  const { configs } = useContext(ConfigContext);
  // const isMobile = useMediaQuery("(max-width:800px)");
  const a = Array(configs.maxTries).fill(0);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        fontFamily="Roboto Variable"
        variant="body1"
        color={"primary"}
      >
        {"Attempts left: "}
      </Typography>

      {a.map((a, i) =>
        i < attempts ? (
          <RadioButtonCheckedIcon sx={styles} color="error" fontSize="small" />
        ) : (
          <RadioButtonUncheckedIcon
            sx={styles}
            color="primary"
            fontSize="small"
          />
        )
      )}
    </div>
  );
}
