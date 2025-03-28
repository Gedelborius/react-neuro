import ReactMarkdown from "react-markdown";
import { Typography, Link, List, ListItem, Divider, Paper, Box, useTheme } from "@mui/material";

export const MaterialMarkdown = ({ content }: { content: string }) => {
  const theme = useTheme();

  return (
    // <Paper elevation={0} sx={{ p: 3, background: "transparent" }}>
    <ReactMarkdown
      components={{
        // Заголовки
        h1: ({ node, ...props }) => <Typography variant="h3" gutterBottom {...props} />,
        h2: ({ node, ...props }) => <Typography variant="h4" gutterBottom {...props} />,
        h3: ({ node, ...props }) => <Typography variant="h5" gutterBottom {...props} />,

        // Параграфы
        p: ({ node, ...props }) => <Typography variant="body1" paragraph sx={{ m: 0 }} {...props} />,

        // Ссылки
        a: ({ node, ...props }) => <Link color="secondary" underline="hover" target="_blank" rel="noopener" {...props} />,

        // Списки
        ul: ({ node, ...props }) => <List dense sx={{ pl: 4 }} {...props} />,
        ol: ({ node, ...props }) => <List component="ol" dense sx={{ pl: 4 }} {...props} />,
        li: ({ node, ...props }) => (
          <ListItem
            sx={{
              display: "list-item",
              listStyleType: "disc",
              p: 0,
              pl: "4px",
            }}
            {...props}
          />
        ),

        // Горизонтальная линия
        hr: ({ node, ...props }) => <Divider sx={{ my: 2 }} {...props} />,

        // Цитаты
        blockquote: ({ node /*, ...props*/ }) => (
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              my: 2,
              borderLeft: `4px solid ${theme.palette.divider}`,
              bgcolor: "background.default",
            }}
            //   {...props}
          />
        ),

        // Код
        code: ({ node, ...props }) => (
          <Box
            component="span"
            sx={{
              fontFamily: "monospace",
              bgcolor: "action.hover",
              px: 0.5,
              borderRadius: 1,
              // display: inline ? "inline" : "block",
              whiteSpace: "pre-wrap",
              // ...(!inline && {
              //   p: 2,
              //   my: 1,
              //   display: "block",
              // }),
              p: 2,
              my: 1,
              display: "block",
            }}
            {...props}
          />
        ),

        // Выделение текста
        strong: ({ node, ...props }) => <Typography component="span" fontWeight="bold" {...props} />,
        em: ({ node, ...props }) => <Typography component="span" fontStyle="italic" {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
    // </Paper>
  );
};
