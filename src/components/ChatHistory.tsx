import { List, ListItem, Paper, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { IMessage } from "../interfaces/ChatHistoryInterfaces";
import ReactMarkdown from "react-markdown";
import { MaterialMarkdown } from "./MaterialMarkdown";

export const ChatHistory = ({ messagesHistory }: { messagesHistory: Array<IMessage> }) => {
  const chatHistoryEnd = useRef<HTMLDivElement>(null);

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
  }, [messagesHistory]);

  return (
    <Paper
      elevation={3}
      sx={{
        height: "44vh",
        overflowY: "scroll",
        bgcolor: "background.default",
        display: "flex",
        flexDirection: "column",
        py: 2,
        px: 3,
      }}
    >
      <List sx={{ display: "flex", flexDirection: "column" }}>
        {messagesHistory.map(({ text, author }, index) => (
          <ListItem
            key={index}
            sx={{
              justifyContent: author === "user" ? "flex-end" : "flex-start",
              alignItems: "flex-start",
            }}
          >
            <Paper sx={author === "user" ? { p: 1, backgroundColor: "primary.light" } : { p: 1 }}>
              <MaterialMarkdown content={text} />
              {/* <ReactMarkdown
                components={{
                  p: ({ node, ...props }) => <Typography paragraph {...props} />,
                  code: ({ node, ...props }) => (
                    <code
                      style={{
                        backgroundColor: "#f5f5f5",
                        padding: "2px 4px",
                        borderRadius: 4,
                      }}
                      {...props}
                    />
                  ),
                }}
              >
                {text}
              </ReactMarkdown> */}
              {/* <Typography variant="body1">{text}</Typography> */}
            </Paper>
          </ListItem>
        ))}
      </List>
      <div ref={chatHistoryEnd} />
    </Paper>
  );
};
