import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { GeminiChatWithAgentKey } from "./pages/GeminiChatWithAgentKey";
import { GeminiChatNewDesign } from "./pages/GeminiChatNewDesign";
import { GeminiChatDarkDesign } from "./apps/GeminiChatDarkDesign";
import { LeftControlPanel } from "./apps/GeminiChatDarkDesign/components/common/LeftControlPanel";

const theme = createTheme({
  palette: {
    mode: "dark",
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
      {/* <GeminiChatNewDesign /> */}
      <GeminiChatDarkDesign />
      {/* <LeftControlPanel /> */}
    </ThemeProvider>
  );
}

export default App;
