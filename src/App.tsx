import CSS from "csstype";
import { ThemeProvider, createTheme } from "@mui/material";
import "@fontsource/roboto";
import "@fontsource-variable/roboto-mono";
import Game from "./Components/Game";
import NavBar from "./Components/NavBar";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f0f0f0",
    },
    secondary: {
      main: "#111111",
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
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header style={styles} className="App-header">
          <NavBar />
          <Game />
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
