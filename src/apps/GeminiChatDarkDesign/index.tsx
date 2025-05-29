import { Box, Container, createTheme, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { ChatList } from "./components/common/ChatList";
import { TopControlPanel } from "./components/common/TopControlPanel";
import { InputBox } from "./components/common/InputBox";
import { ScrollBox } from "./components/layouts/ScrollBox";
import { ScrollToBottomButton } from "./components/common/ScrollToBottomButton";
import { useScrollControl } from "./hooks/useScrollControl";
import { useChats } from "./hooks/useChats";
import { BottomPanel } from "./components/layouts/BottomPanel";
import { LeftPanel } from "./components/common/LeftPanel";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const GeminiChatDarkDesign = () => {
  const [textareaValue, setTextareaValue] = useState<string>("");
  const { apiKey, setApiKey, deleteKey, chatsState, loading, changeChat, addNewChat, deleteChat, handleSubmit } = useChats();
  const { showScrollDownButton, scrollContainerRef, scrollToBottom } = useScrollControl(chatsState.chats[chatsState.currentIndex].messages);
  // console.log(chatsState);

  const LeftPanelProps = { apiKey, setApiKey, chatsState, changeChat, addNewChat, deleteChat, deleteKey };

  return (
    <ThemeProvider theme={theme}>
      <ScrollBox ref={scrollContainerRef}>
        <LeftPanel {...LeftPanelProps} />
        <Container>
          {/* <TopControlPanel clearMessages={clearMessages} apiKey={apiKey} setApiKey={setApiKey} addNewChat={addNewChat} deleteKey={deleteKey} /> */}
          <Container sx={{ mt: 1, mb: 1 }}>
            <ChatList messages={chatsState.chats[chatsState.currentIndex].messages} />
          </Container>
          <BottomPanel isNoMessages={chatsState.chats[chatsState.currentIndex].messages.length === 0}>
            <ScrollToBottomButton show={showScrollDownButton} onClick={scrollToBottom} />
            <InputBox
              textareaValue={textareaValue}
              setTextareaValue={setTextareaValue}
              handleSubmit={(e: React.FormEvent) => {
                e.preventDefault();
                const text = textareaValue;
                setTextareaValue("");
                return handleSubmit(e, text);
              }}
              loading={loading}
            />
          </BottomPanel>
        </Container>
      </ScrollBox>
    </ThemeProvider>
  );
};
