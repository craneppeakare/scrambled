import CSS from "csstype";
import { ThemeProvider, createTheme } from "@mui/material";
import "@fontsource/roboto";
import "@fontsource-variable/roboto-mono";
import Game from "./Components/Game";
import NavBar from "./Components/NavBar";
import ConfigsProvider from "./Components/ConfigContext/ConfigContext";
import configData from "./Components/ConfigContext/config.json";
import { useState } from "react";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#f3f3f3",
    },
    secondary: {
      main: "#141414",
    },
  },
});

const styles: CSS.Properties = {
  backgroundColor: "#202020",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

function App() {
  const [rerender, setRerender] = useState(true);

  const forceRerender = () => {
    setRerender(!rerender);
  };

  return (
    <ConfigsProvider configJson={configData}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <header style={styles} className="App-header">
            <NavBar rerender={forceRerender} />
            <Game />
          </header>
        </div>
      </ThemeProvider>
    </ConfigsProvider>
  );
}

export default App;
