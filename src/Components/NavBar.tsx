import { AppBar, Toolbar, Typography } from "@mui/material";
import CSS from "csstype";
import SettingsIconButton from "./SettingsIconButton";
import InfoIconButton from "./InfoIconButton";

const titleStyles: CSS.Properties = {
  flexGrow: 1,
  color: "white",
  fontFamily: "Monospace",
  fontSize: "48px",
  textAlign: "center",
  margin: "0px",
};

type NavBarProps = {
  rerender: () => void;
};

export default function NavBar({ rerender }: NavBarProps) {
  return (
    <AppBar position="sticky" color="secondary" enableColorOnDark>
      <Toolbar>
        <div className="spacer" style={{ width: "148px", height: "74px" }} />

        <Typography component="div" sx={titleStyles}>
          SCRAMBLED
        </Typography>

        <InfoIconButton />
        <SettingsIconButton rerender={rerender} />
      </Toolbar>
    </AppBar>
  );
}
