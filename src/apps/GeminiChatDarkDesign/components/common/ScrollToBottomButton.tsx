import { KeyboardArrowDown } from "@mui/icons-material";
import { Box, Button, Zoom } from "@mui/material";

interface IScrollToBottomButtonProps {
  onClick?: () => void;
  show: boolean;
}

export const ScrollToBottomButton = ({ show, onClick }: IScrollToBottomButtonProps) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: -(8 * 7),
        width: "100%",
        left: 0,
        zIndex: 1000,
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Zoom in={show}>
        <Button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            e.preventDefault();
            if (onClick !== undefined) onClick();
          }}
          variant="contained"
          sx={{ p: 1, m: 0, minWidth: "max-content", borderRadius: "50%" }}
        >
          <KeyboardArrowDown />
        </Button>
      </Zoom>
    </Box>
  );
};
