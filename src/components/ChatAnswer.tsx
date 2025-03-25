import { Paper, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";

interface IChatAnswerProps {
  response: string;
}

export const ChatAnswer = ({ response }: IChatAnswerProps) => {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Answer:
      </Typography>
      <ReactMarkdown
        components={{
          p: ({ node, ...props }) => <Typography paragraph {...props} />,
          code: ({ node, ...props }) => (
            <code
              style={{
                backgroundColor: "#f5f5f5",
                padding: "2px 4px",
                borderRadius: 4,
              }}
              {...props}
            />
          ),
        }}
      >
        {response}
      </ReactMarkdown>
    </Paper>
  );
};
