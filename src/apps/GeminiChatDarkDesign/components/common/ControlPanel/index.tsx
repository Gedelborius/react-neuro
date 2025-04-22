import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Stack, TextField } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Delete as DeleteIcon, VpnKey as VpnKeyIcon, Close as CloseIcon } from "@mui/icons-material";
import { useState } from "react";

interface IControlPanelProps {
  clearMessages: () => void;
  apiKey: string;
  setApiKey: React.Dispatch<React.SetStateAction<string>>;
  deleteKey: () => void;
}

export const ControlPanel = ({ clearMessages, apiKey, setApiKey, deleteKey }: IControlPanelProps) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogClickOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
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
  );
};
