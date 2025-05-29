import { Inbox } from "@mui/icons-material";
import {
  Box,
  Button,
  CssBaseline,
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
  createTheme,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState } from "react";

// const Layout = styled(Box)(() => ({}));
// const MyDrawer = (open: boolean) => {
//     return <Drawer
// }

// const MyDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => property !== "open" })(() => ({
//   width: 250,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
// }));

// const MyDrawer = ({ children, open }: { children: React.ReactNode; open: boolean }) => {
//   return (
//     <MuiDrawer
//       variant="permanent"
//       sx={{
//         width: 250,
//         flexShrink: 0,
//         "& .MuiDrawer-paper": {
//           width: 250,
//           boxSizing: "border-box",
//         },
//       }}
//     >
//       {children}
//     </MuiDrawer>
//   );
// };

const theme = createTheme();

const Drawer = ({ children, open }: { children?: React.ReactNode; open?: boolean }) => {
  const width = open !== undefined && open !== false ? 250 : 50;
  return (
    <Box
      sx={{
        zIndex: 1000,
        width: width,
        height: "100vh",
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        backgroundColor: grey[300],
      }}
    >
      {children}
    </Box>
  );
};

export const LeftControlPanel = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <CssBaseline />
      <Drawer open={open}></Drawer>
      {/* <Box sx={{ display: "flex", flexFlow: "row no-wrap" }}></Box> */}
      <Button sx={{ position: "fixed", right: 0 }} onClick={() => setOpen(!open)}>
        Open Drawer
      </Button>

      {/* <MyDrawer open={true}>
        <></>
      </MyDrawer> */}
      {/* <MuiDrawer open={open} onClose={() => setOpen(false)}> */}
      {/* <Box sx={{ width: 250, display: "flex", flexDirection: "column", flexWrap: "nowrap" }}>
          {Array.from({ length: 10 }, (_, i) => `Test ${i}`).map((t, j) => (
            <Button>{t}</Button>
          ))}
        </Box> */}
      {/* </MuiDrawer> */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography sx={{ marginBottom: 2 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et molestie ac.
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
          gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
          tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Box>
    </>
  );
};
