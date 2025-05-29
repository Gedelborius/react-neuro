import { ReactNode } from "react";
import { Box } from "@mui/material";

export const BottomPanel = ({ children, isNoMessages }: { children: ReactNode; isNoMessages: boolean }) => {
  return (
    <Box
      sx={{
        position: "sticky",
        left: 0,
        right: 0,
        zIndex: 1000,
        mb: 2,
        bottom: 8 * 2,
        ...(isNoMessages && {
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "& > *": {
            width: { xs: "90%", sm: "80%", md: "70%", lg: "60%" },
          },
        }),
      }}
    >
      {children}
    </Box>
  );
};
