import { Box, Button, CircularProgress, Typography, useMediaQuery, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { ChatTextarea } from "./ChatTextarea";
import { useRef } from "react";
import { Send as SendIcon } from "@mui/icons-material";

interface IInputBoxProps {
  textareaValue: string;
  setTextareaValue: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  loading: boolean;
}

export const InputBox = ({ textareaValue, setTextareaValue, handleSubmit, loading }: IInputBoxProps) => {
  const theme = useTheme();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleСhange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    setTextareaValue(target.value);

    // if (textareaRef.current) {
    //   textareaRef.current.style.height = "auto";
    //   textareaRef.current.style.height = `${target.scrollHeight}px`;
    // }
  };
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        padding: 2,
        borderRadius: 2,
        backgroundColor: grey[800],
        transform: "translateZ(0)",
      }}
    >
      <form
        style={{ display: "flex", flexFlow: "column" }}
        onSubmit={handleSubmit}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.ctrlKey && (e.key === "Enter" || e.metaKey)) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
      >
        <ChatTextarea
          $backgroundColor={grey[400]}
          $color={"black"}
          $placeholderColor={grey[900]}
          $borderRadius={8 * 1}
          $padding={8 * 2}
          $minHeight={8 * 12}
          placeholder="Enter your question"
          ref={textareaRef}
          value={textareaValue}
          onChange={handleСhange}
          disabled={loading}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
            marginTop: `${8 * 1}px`,
          }}
        >
          {isMobile ? null : (
            <Typography variant="caption" sx={{ color: grey[600], mr: 2 }}>
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
              borderRadius: 2,
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
  );
};
