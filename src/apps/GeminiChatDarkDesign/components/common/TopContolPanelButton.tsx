import { Button, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { ReactNode } from "react";

interface ITopControlPanelProps {
  text?: string;
  startIcon?: ReactNode;
  onClick?: () => void;
  parentBorderRadius?: number;
  parentPadding?: number;
}

export const TopControlPanelButton = ({ text, onClick, startIcon, parentBorderRadius, parentPadding }: ITopControlPanelProps) => {
  const theme = useTheme();
  const borderRadius = parentBorderRadius !== undefined && parentPadding !== undefined ? 1 + (parentBorderRadius - parentPadding) : 1;
  return (
    <Button
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        if (onClick !== undefined) onClick();
      }}
      startIcon={startIcon}
      variant="contained"
      sx={{
        cursor: "pointer",
        borderRadius: theme.spacing(borderRadius),
        backgroundColor: grey[500],
        "&:hover": {
          backgroundColor: grey[600],
        },
        color: "black",
      }}
    >
      {text}
    </Button>
  );
};
