import { Box, Container, createTheme, CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { useAgentKey } from "../../hooks/useAgentKey";
// import { useGoogleGenerativeAI } from "../../hooks/useGoogleGenerativeAI";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChatList } from "./components/common/ChatList";
import { ROLE, IMessage } from "./interfaces";
import { ControlPanel } from "./components/common/ControlPanel";
import { InputBox } from "./components/common/InputBox";
import { GoogleGenAI } from "@google/genai";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const GeminiChatDarkDesign = () => {
  const { apiKey, setApiKey, deleteKey } = useAgentKey();
  const googleGenerativeAI = useMemo(() => {
    return new GoogleGenAI({ apiKey });
  }, [apiKey]);
  // const { googleGenerativeAI } = useGoogleGenerativeAI(apiKey);
  const [textareaValue, setTextareaValue] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // const abortControllerRef = useRef<AbortController | null>(null);
  const chatHistoryEnd = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<IMessage[]>(() => {
    try {
      const savedMessages = localStorage.getItem("MESSAGES_KEY");
      if (savedMessages) {
        const parsedMessages: IMessage[] = JSON.parse(savedMessages);
        if (parsedMessages.length > 0) {
          return parsedMessages;
        }
      }
    } catch (error) {
      console.error("Error load from localStorage key MESSAGES_KEY:", error);
    }
    return [];
  });

  useEffect(() => {
    try {
      const valueToStore = JSON.stringify(messages);
      localStorage.setItem("MESSAGES_KEY", valueToStore);
    } catch (error) {
      console.error("Error saving to localStorage key MESSAGES_KEY:", error);
    }
  }, [messages]);

  const scrollToBottom = () => {
    if (chatHistoryEnd.current) {
      chatHistoryEnd.current.scrollIntoView({
        behavior: "auto",
        block: "center",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const clearMessages = () => {
    setMessages([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loading) {
      const inputText = textareaValue;
      setTextareaValue("");
      if (!inputText.trim()) return;
      // abortControllerRef.current = new AbortController();

      setLoading(true);
      setError("");

      const messagesWithInput = [...messages, { parts: [{ text: inputText }], role: ROLE.USER }];
      setMessages(messagesWithInput);

      try {
        // const model = googleGenerativeAI.models. getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await googleGenerativeAI.models.generateContentStream(
          { model: "gemini-1.5-flash", contents: messagesWithInput }
          // { signal: abortControllerRef.current?.signal }
        );
        setMessages((p) => [...p, { parts: [{ text: "" }], role: ROLE.MODEL }]);
        for await (const chunk of result) {
          const chunkText = chunk.text;
          setMessages((previusMessages) => {
            const newMessages = [...previusMessages];
            newMessages[newMessages.length - 1].parts[0].text += chunkText;
            return newMessages;
          });
        }
      } catch (error) {
        setError("Error: " + (error instanceof Error ? error.message : "Failed to fetch"));
        console.error("API Error:", error);
      } finally {
        setLoading(false);
        // abortControllerRef.current = null;
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            overflow: "hidden",
          },
        }}
      />
      <Box
        // ref={containerRef}
        sx={{
          height: "100vh",
          width: "100%",
          overflowY: "auto",
          position: "relative",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "grey.500",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "grey.100",
          },
        }}
      >
        <Container>
          <Container sx={{ pb: 19, pt: 8 }}>
            <ChatList messages={messages} />
            <div ref={chatHistoryEnd} />
          </Container>
          <Container
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              mt: 1,
            }}
          >
            <ControlPanel clearMessages={clearMessages} apiKey={apiKey} setApiKey={setApiKey} deleteKey={deleteKey} />
          </Container>
          <Container
            sx={{
              backgroundColor: theme.palette.background.default,
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
            }}
          >
            <InputBox textareaValue={textareaValue} setTextareaValue={setTextareaValue} handleSubmit={handleSubmit} loading={loading} />
          </Container>
        </Container>
      </Box>
    </ThemeProvider>
  );
};
