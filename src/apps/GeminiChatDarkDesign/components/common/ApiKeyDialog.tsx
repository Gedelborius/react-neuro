import { Button, Dialog, DialogContent, DialogTitle, IconButton, Stack, TextField } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Close as CloseIcon } from "@mui/icons-material";

interface IApiKeyDialogProps {
  openDialog: boolean;
  setOpenDialog: (b: boolean) => void;
  apiKey: string;
  setApiKey: React.Dispatch<React.SetStateAction<string>>;
  deleteKey: () => void;
}

export const ApiKeyDialog = ({ openDialog, setOpenDialog, apiKey, setApiKey, deleteKey }: IApiKeyDialogProps) => {
  const DialogProps = {
    open: openDialog,
    onClose: () => setOpenDialog(false),
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
    onClick: () => setOpenDialog(false),
    sx: {
      position: "absolute",
      right: 8,
      top: 8,
      color: grey[500],
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
  );
};
