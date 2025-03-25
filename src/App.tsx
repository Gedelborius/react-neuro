import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { GeminiChatWithAgentKey } from "./pages/GeminiChatWithAgentKey";

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
      <GeminiChatWithAgentKey />
    </ThemeProvider>
  );
}

export default App;
