import { List, ListItem, Paper } from "@mui/material";
import { MaterialMarkdown } from "../../../../components/MaterialMarkdown";
import { IMessage } from "../../interfaces";
import { grey } from "@mui/material/colors";
import { useEffect } from "react";

export const ChatList = ({ messages }: { messages: Array<IMessage> }) => {
  return (
    <List sx={{ display: "flex", flexDirection: "column" }}>
      {messages.map(({ parts, role }: IMessage, index) => (
        <ListItem
          key={index}
          sx={{
            justifyContent: role === "user" ? "flex-end" : "flex-start",
            alignItems: "flex-start",
            px: 0,
          }}
        >
          <Paper sx={role === "user" ? { p: 1, backgroundColor: grey[600] } : { p: 1 }}>
            <MaterialMarkdown content={parts[0].text} />
          </Paper>
        </ListItem>
      ))}
    </List>
  );
};
