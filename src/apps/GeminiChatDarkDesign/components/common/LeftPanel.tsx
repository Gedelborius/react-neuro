import { Box, Button, Chip, Divider, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import {
  Menu as MenuIcon,
  MenuOpen as MenuOpenIcon,
  Delete as DeleteIcon,
  VpnKey as VpnKeyIcon,
  Close as CloseIcon,
  AddComment as AddCommentIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { TopControlPanelButton } from "./TopContolPanelButton";
import { ApiKeyDialog } from "./ApiKeyDialog";
import { IChat, IChatsState } from "../../interfaces";

interface ILeftPanelProps {
  apiKey: string;
  setApiKey: React.Dispatch<React.SetStateAction<string>>;
  chatsState: IChatsState;
  changeChat: (i: number) => void;
  addNewChat: () => void;
  deleteChat: () => void;
  deleteKey: () => void;
}

export const LeftPanel = ({ apiKey, setApiKey, chatsState, changeChat, addNewChat, deleteChat, deleteKey }: ILeftPanelProps) => {
  const [openPanel, setOpenPanel] = useState<boolean>(true);
  const [openDialog, setOpenDialog] = useState(false);

  const padding = 1,
    borderRadius = 1;

  const BtnPropsAPIKey = {
    text: "API Key",
    startIcon: <VpnKeyIcon />,
    onClick: () => setOpenDialog(true),
    parentPadding: padding,
    parentBorderRadius: borderRadius,
  };

  const BtnPropsNewChat = {
    text: "New Chat",
    startIcon: <AddCommentIcon />,
    onClick: addNewChat,
    parentPadding: padding,
    parentBorderRadius: borderRadius,
  };

  const BtnPropsDeleteChat = {
    text: "Delete Chat",
    startIcon: <DeleteIcon />,
    onClick: deleteChat,
    parentPadding: padding,
    parentBorderRadius: borderRadius,
  };

  const ApiKeyDialogProps = {
    openDialog,
    setOpenDialog,
    apiKey,
    setApiKey,
    deleteKey,
  };

  return (
    <Box
      sx={{
        width: openPanel ? "300px" : "max-content",
        backgroundColor: grey["A700"],
        position: "sticky",
        left: 0,
        top: 0,
        bottom: 0,
        p: 1,
      }}
    >
      <Button
        variant="contained"
        sx={{
          width: "100%",
          wordBreak: "break-word",
          height: 8 * 6 + "px",
          "& .MuiButton-endIcon": {
            ml: openPanel ? "8px" : 0,
            mr: 0,
          },
        }}
        endIcon={openPanel ? <MenuOpenIcon /> : <MenuIcon />}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          e.preventDefault();
          setOpenPanel((p) => !p);
        }}
      >
        {openPanel ? "Close sidebar" : null}
      </Button>
      {openPanel ? (
        <>
          <Divider sx={{ mt: 2, mb: 2, color: grey[100] }}>
            <Chip label="Control" size="small" />
          </Divider>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              "& > :not(*:first-of-type)": { mt: 1 },
            }}
          >
            <TopControlPanelButton {...BtnPropsAPIKey} />
            <TopControlPanelButton {...BtnPropsNewChat} />
            <TopControlPanelButton {...BtnPropsDeleteChat} />
            <ApiKeyDialog {...ApiKeyDialogProps} />
          </Box>
          <Divider sx={{ mt: 2, mb: 2, color: grey[100] }}>
            <Chip label="Chats" size="small" />
          </Divider>

          <Box sx={{ backgroundColor: grey[900], width: "100%", borderRadius: 2, boxShadow: 4 }}>
            <Stack sx={{ p: 1 }}>
              {chatsState.chats.map((c, i, a) =>
                c.messages.length !== 0 ? (
                  <Box key={i}>
                    <Button onClick={() => changeChat(i)}>
                      <Typography variant="body2" gutterBottom sx={{ overflowX: "hidden", wordWrap: "normal", wordBreak: "keep-all" }}>
                        {c.messages[0].parts[0].text}
                      </Typography>
                    </Button>
                    {i > 0 || i < a.length - 1 ? <Divider variant="middle" /> : null}
                  </Box>
                ) : null
              )}
            </Stack>
          </Box>
        </>
      ) : null}
    </Box>
  );
};
