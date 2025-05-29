import { ReactNode } from "react";
import { Box } from "@mui/material";

export const ScrollBox = ({ children, ref }: { children: ReactNode; ref?: React.RefObject<HTMLDivElement | null> }) => {
  return (
    <Box
      ref={ref}
      sx={{
        // height: "100vh",
        display: "flex",
        flexDirection: "row",
        height: "100%",
        minHeight: "100%",
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        // minHeight: "max-content",
        // maxHeight: "max-content",
        // width: "100%",
        overflowY: "auto",
        // position: "relative",
        // "&::-webkit-scrollbar": {
        //   width: "8px",
        // },
        // "&::-webkit-scrollbar-thumb": {
        //   backgroundColor: "grey.500",
        //   borderRadius: "4px",
        // },
        // "&::-webkit-scrollbar-track": {
        //   backgroundColor: "grey.100",
        // },
      }}
    >
      {children}
    </Box>
  );
};
