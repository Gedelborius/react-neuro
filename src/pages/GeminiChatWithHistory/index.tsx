import { Alert, Box } from "@mui/material";
import { useAgentKey } from "../../hooks/useAgentKey";
import { useGoogleGenerativeAI } from "../../hooks/useGoogleGenerativeAI";
import { TextInputForm } from "../../components/TextInputForm";
import AgentKey from "../../components/AgentKey";
import { IMessage } from "../../interfaces/ChatHistoryInterfaces";
import { ChatHistory } from "../../components/ChatHistory";
import { useEffect, useState } from "react";

// const testHistory: Array<IMessage> = Array.from({ length: 10 }, (_, index: number) => ({
//   text: index % 2 ? "2" : "1 + 1",
//   author: index % 2 ? "ai" : "user",
//   timestamp: new Date(),
// }));

export const GeminiChatWithHistory = () => {
  const { apiKey, setApiKey, deleteKey } = useAgentKey();
  const { googleGenerativeAI } = useGoogleGenerativeAI(apiKey);

  const [messageHistory, setMessageHistory] = useState(() => {
    try {
      const savedData = localStorage.getItem("MESSAGE_HISTORY_KEY");
      if (savedData) {
        const parsedData: Array<IMessage> = JSON.parse(savedData);
        if (parsedData.length > 0) {
          return parsedData;
        }
      }
    } catch (error) {
      console.error("Error load from localStorage key MESSAGE_HISTORY_KEY:", error);
    }
    return [];
  });

  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // const { loading, error, handleSubmit } = useFormForGoogleGenerativeAI(googleGenerativeAI, input, (text: string) => {
  //   setMessageHistory((previusState) => {
  //     const newState = [...previusState];
  //     newState.push({ text: text, author: "ai" });
  //     return newState;
  //   });
  //   setResponse(text);
  // });

  useEffect(() => {
    try {
      const valueToStore = JSON.stringify(messageHistory);
      localStorage.setItem("MESSAGE_HISTORY_KEY", valueToStore);
    } catch (error) {
      console.error("Error saving to localStorage key MESSAGE_HISTORY_KEY:", error);
    }
  }, [messageHistory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const inputText = input;
    setInput("");
    if (!inputText.trim()) return;

    setLoading(true);
    setError("");

    try {
      const model = googleGenerativeAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(inputText);
      const text = await result.response.text();

      setMessageHistory((previusState) => {
        const newState = [...previusState];
        newState.push({ text: text, author: "ai" });
        return newState;
      });
      setResponse(text);
    } catch (err) {
      setError("Error: " + (err instanceof Error ? err.message : "Failed to fetch"));
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

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
      <Box>
        <ChatHistory {...{ messagesHistory: messageHistory }} />
      </Box>

      <Box sx={{ mt: 1 }}>
        <TextInputForm
          {...{
            handleSubmit: (e: React.FormEvent) => {
              setMessageHistory((previusState) => {
                const newState = [...previusState];
                newState.push({ text: input, author: "user" });
                return newState;
              });
              return handleSubmit(e);
            },
            input,
            loading,
            setInput,
          }}
        />
      </Box>

      <Box sx={{ mt: 2 }}>
        <AgentKey {...{ apiKey, setApiKey, deleteKey }} />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};
