import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Stack, TextField, useTheme } from "@mui/material";
import { brown, grey } from "@mui/material/colors";
import { Delete as DeleteIcon, VpnKey as VpnKeyIcon, Close as CloseIcon, AddComment as AddCommentIcon } from "@mui/icons-material";
import { useState } from "react";
import { TopControlPanelButton } from "./TopContolPanelButton";

interface IControlPanelProps {
  clearMessages: () => void;
  apiKey: string;
  setApiKey: React.Dispatch<React.SetStateAction<string>>;
  addNewChat: () => void;
  deleteKey: () => void;
}

export const TopControlPanel = ({ clearMessages, apiKey, setApiKey, addNewChat, deleteKey }: IControlPanelProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const padding = 1,
    borderRadius = 2;
  const theme = useTheme();

  const handleDialogClickOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const mainBoxProps = {
    sx: {
      position: "sticky",
      top: theme.spacing(2),
      left: 0,
      right: 0,
      zIndex: 1001,
      mt: 1,
      display: "flex",
      p: padding,
      backgroundColor: grey["A700"],
      borderRadius: borderRadius,
      "&>:not(button:first-of-type)": { ml: 2 },
    },
  };

  const BtnAPIKeyProps = {
    text: "API Key",
    startIcon: <VpnKeyIcon />,
    onClick: handleDialogClickOpen,
    parentPadding: padding,
    parentBorderRadius: borderRadius,
  };

  const BtnClearChatProps = {
    text: "Clear Chat",
    startIcon: <DeleteIcon />,
    onClick: clearMessages,
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

  const DialogProps = {
    open: openDialog,
    onClose: handleDialogClose,
  };

  const DialogTitleProps = {
    sx: {
      m: 0,
      p: 2,
    },
    children: "Gemini API Key",
  };

  const IconBtnCloseProps = {
    "aria-label": "close",
    onClick: handleDialogClose,
    sx: {
      position: "absolute",
      right: 8,
      top: 8,
      color: theme.palette.grey[500],
    },
  };

  const StackProps = { spacing: { xs: 1, sm: 2 }, sx: { width: { sm: "300px", md: "500px" } } };

  const TextFieldProps = {
    autoComplete: "off",
    fullWidth: true,
    type: "password",
    label: "Enter your key",
    value: apiKey,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => setApiKey(event.target.value),
  };

  const BtnDeleteKeyProps: React.ComponentProps<typeof Button> = {
    children: "Delete Key",
    onClick: () => {
      deleteKey();
    },
    variant: "contained",
    color: "error",
  };

  return (
    <Box {...mainBoxProps}>
      <TopControlPanelButton {...BtnAPIKeyProps} />
      <TopControlPanelButton {...BtnClearChatProps} />
      <TopControlPanelButton {...BtnPropsNewChat} />
      <Dialog {...DialogProps}>
        <DialogContent>
          <DialogTitle {...DialogTitleProps} />
          <IconButton {...IconBtnCloseProps}>
            <CloseIcon />
          </IconButton>
          <Stack {...StackProps}>
            <TextField {...TextFieldProps} />
            <Button {...BtnDeleteKeyProps} />
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
