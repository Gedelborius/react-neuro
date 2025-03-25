import { Alert, Box, Typography } from "@mui/material";
import { useAgentKey } from "../hooks/useAgentKey";
import { useFormForGoogleGenerativeAI } from "../hooks/useFormForGoogleGenerativeAI";
import { useGoogleGenerativeAI } from "../hooks/useGoogleGenerativeAI";
import { TextInputForm } from "../components/TextInputForm";
import AgentKey from "../components/AgentKey";
import { ChatAnswer } from "../components/ChatAnswer";
import { useState } from "react";

export const GeminiChatWithAgentKey = () => {
  const { apiKey, setApiKey, deleteKey } = useAgentKey();
  const { googleGenerativeAI } = useGoogleGenerativeAI(apiKey);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const { loading, error, handleSubmit } = useFormForGoogleGenerativeAI(googleGenerativeAI, input, setResponse);

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: "auto",
        p: 3,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Gemini Chat Interface
      </Typography>

      <Box sx={{ mt: 1 }}>
        <TextInputForm {...{ handleSubmit, input, loading, setInput }} />
      </Box>

      <Box sx={{ mt: 2 }}>
        <AgentKey {...{ apiKey, setApiKey, deleteKey }} />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {response && (
        <Box sx={{ mt: 2 }}>
          <ChatAnswer {...{ response }} />
        </Box>
      )}
    </Box>
  );
};
