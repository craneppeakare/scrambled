import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import CSS from "csstype";
import SettingsIcon from "@mui/icons-material/Settings";

const titleStyles: CSS.Properties = {
  flexGrow: 1,
  color: "white",
  fontFamily: "Monospace",
  fontSize: "64px",
  textAlign: "center",
  margin: "0px",
};

export default function NavBar() {
  return (
    <AppBar position="sticky" color="secondary" enableColorOnDark>
      <Toolbar>
        <Typography variant="h6" component="div" sx={titleStyles}>
          SCRAMBLED
        </Typography>

        <IconButton
          aria-label="settings"
          size="large"
          color="primary"
          style={{}}
        >
          <SettingsIcon sx={{ fontSize: "50px" }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
