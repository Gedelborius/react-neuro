import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { GeminiChatWithAgentKey } from "./pages/GeminiChatWithAgentKey";
import { GeminiChatNewDesign } from "./pages/GeminiChatNewDesign";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#9c27b0",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <GeminiChatWithAgentKey /> */}
      <GeminiChatNewDesign />
    </ThemeProvider>
  );
}

export default App;
