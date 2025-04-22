import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  createTheme,
  CssBaseline,
  Dialog,
  DialogContent,
  DialogTitle,
  GlobalStyles,
  IconButton,
  List,
  ListItem,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import VpnKeyIcon from "@mui/icons-material/VpnKey";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { IChatMessage, ROLE_NAMES } from "../../interfaces/ChatHistoryInterfaces";
import { useAgentKey } from "../../hooks/useAgentKey";
import { useGoogleGenerativeAI } from "../../hooks/useGoogleGenerativeAI";
import { MaterialMarkdown } from "../../components/MaterialMarkdown";
import DeleteIcon from "@mui/icons-material/Delete";

const ChatTextarea = styled.textarea`
  overflow: hidden;
  font-size: 16px;
  resize: none;
  width: 100%;
  display: block;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  outline: none;
  outline-style: none;
  border: none;
  margin: 0;
  padding: 0;
  min-height: 60px;
  background-color: transparent;
  color: white;
  &::placeholder {
    color: white;
  }
`;

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const GeminiChatNewDesign = () => {
  // const [input, setInput] = useState("");
  const { apiKey, setApiKey, deleteKey } = useAgentKey();
  const { googleGenerativeAI } = useGoogleGenerativeAI(apiKey);
  const [openDialog, setOpenDialog] = useState(false);
  const [textareaValue, setTextareaValue] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const abortControllerRef = useRef<AbortController | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const chatHistoryEnd = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<IChatMessage[]>(() => {
    try {
      const savedMessages = localStorage.getItem("MESSAGES_KEY");
      if (savedMessages) {
        const parsedMessages: IChatMessage[] = JSON.parse(savedMessages);
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

  const handleDialogClickOpen = () => {
    setOpenDialog(true);
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleСhange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    setTextareaValue(target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${target.scrollHeight}px`;
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loading) {
      const inputText = textareaValue;
      setTextareaValue("");
      if (!inputText.trim()) return;
      abortControllerRef.current = new AbortController();

      setLoading(true);
      setError("");

      const messagesWithInput = [...messages, { parts: [{ text: inputText }], role: ROLE_NAMES.USER }];
      setMessages(messagesWithInput);

      try {
        const model = googleGenerativeAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContentStream({ contents: messagesWithInput }, { signal: abortControllerRef.current?.signal });
        setMessages((p) => [...p, { parts: [{ text: "" }], role: ROLE_NAMES.MODEL }]);
        // let response = "";
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          // response += chunkText;
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
        abortControllerRef.current = null;
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            overflow: "auto",
          },
        }}
      />
      <Container>
        <Container sx={{ pb: 19, pt: 8 }}>
          <List sx={{ display: "flex", flexDirection: "column" }}>
            {messages.map(({ role, parts }: IChatMessage, index) => (
              <ListItem
                key={index}
                sx={{
                  justifyContent: role === "user" ? "flex-end" : "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <Paper sx={role === "user" ? { p: 1, backgroundColor: grey[600] } : { p: 1 }}>
                  <MaterialMarkdown content={parts[0].text} />
                </Paper>
              </ListItem>
            ))}
          </List>
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
          <Box sx={{ display: "flex", p: 1, backgroundColor: grey[900], borderRadius: 2, "&>:not(button:first-of-type)": { ml: 2 } }}>
            <Button
              onClick={handleDialogClickOpen}
              startIcon={<VpnKeyIcon />}
              variant="contained"
              sx={{
                backgroundColor: grey[500],
                "&:hover": {
                  backgroundColor: grey[600],
                },
                color: "black",
              }}
            >
              API Key
            </Button>
            <Button
              onClick={clearMessages}
              startIcon={<DeleteIcon />}
              variant="contained"
              sx={{
                backgroundColor: grey[500],
                "&:hover": {
                  backgroundColor: grey[600],
                },
                color: "black",
              }}
            >
              Clear Chat
            </Button>
            <Dialog open={openDialog} onClose={handleDialogClose}>
              <DialogContent>
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                  Gemini API Key
                </DialogTitle>
                <IconButton
                  aria-label="close"
                  onClick={handleDialogClose}
                  sx={(theme) => ({
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                  })}
                >
                  <CloseIcon />
                </IconButton>
                <Stack spacing={{ xs: 1, sm: 2 }} sx={{ width: { sm: "300px", md: "500px" } }}>
                  <TextField
                    autoComplete="off"
                    fullWidth
                    type="password"
                    label="Enter your key"
                    value={apiKey}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setApiKey(event.target.value)}
                  />
                  <Button
                    onClick={() => {
                      deleteKey();
                    }}
                    variant="contained"
                    color="error"
                  >
                    Delete Key
                  </Button>
                </Stack>
              </DialogContent>
            </Dialog>
          </Box>
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
          <Box
            sx={{
              borderRadius: 2,
              backgroundColor: grey[800],
              mb: 3,
              transform: "translateZ(0)",
            }}
          >
            <Box
              sx={{
                padding: 2,
              }}
            >
              <form
                onSubmit={handleSubmit}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.ctrlKey && (e.key === "Enter" || e.metaKey)) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                  if (e.key === "Enter" && !e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                  }
                }}
              >
                <ChatTextarea
                  placeholder="Enter your question"
                  ref={textareaRef}
                  value={textareaValue}
                  onChange={handleСhange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.ctrlKey && !e.metaKey) {
                      e.preventDefault();
                    }
                  }}
                  disabled={loading}
                />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "right",
                  }}
                >
                  {isMobile ? null : (
                    <Typography variant="caption" sx={{ color: grey[600], mr: 4 }}>
                      To send, press Control(Ctrl) + Enter
                    </Typography>
                  )}
                  <Button
                    type="submit"
                    endIcon={<SendIcon />}
                    color="primary"
                    variant="contained"
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : null}
                    sx={{
                      borderRadius: 4,
                      backgroundColor: grey[500],
                      "&:hover": {
                        backgroundColor: grey[600],
                      },
                      color: "black",
                    }}
                  >
                    {loading ? "Processing..." : "Send"}
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Container>
      </Container>
    </ThemeProvider>
  );
};
