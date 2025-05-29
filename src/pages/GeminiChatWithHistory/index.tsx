import { Alert, Box } from "@mui/material";
import { useAgentKey } from "../../hooks/useAgentKey";
import { useGoogleGenerativeAI } from "../../hooks/useGoogleGenerativeAI";
import { TextInputForm } from "../../components/TextInputForm";
import AgentKey from "../../components/AgentKey";
import { ChatHistory } from "../../components/ChatHistory";
import { useEffect, useRef, useState } from "react";
import { IChatMessage, ROLE_NAMES } from "../../interfaces/ChatHistoryInterfaces";

export const GeminiChatWithHistory = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const abortControllerRef = useRef<AbortController | null>(null);

  const [messages, setMessages] = useState<IChatMessage[]>(() => {
    try {
      const savedMessages = localStorage.getItem("MESSAGES_KEY");
      if (savedMessages) {
        const parsedMessages: IChatMessage[] = JSON.parse(savedMessages);
        if (parsedMessages.length > 0) {
          return parsedMessages;
        }
      }
    } catch (error) {
      console.error("Error load from localStorage key MESSAGES_KEY:", error);
    }
    return [];
  });

  const { apiKey, setApiKey, deleteKey } = useAgentKey();
  const { googleGenerativeAI } = useGoogleGenerativeAI(apiKey);

  useEffect(() => {
    try {
      const valueToStore = JSON.stringify(messages);
      localStorage.setItem("MESSAGES_KEY", valueToStore);
    } catch (error) {
      console.error("Error saving to localStorage key MESSAGES_KEY:", error);
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loading) {
      const inputText = input;
      setInput("");
      if (!inputText.trim()) return;
      abortControllerRef.current = new AbortController();

      setLoading(true);
      setError("");

      const messagesWithInput = [...messages, { parts: [{ text: inputText }], role: ROLE_NAMES.USER }];
      // { parts: [{ text: "" }], role: ROLE_NAMES.MODEL }
      setMessages(messagesWithInput);

      try {
        const model = googleGenerativeAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        // const result = await model.generateContent({ contents: newMessages });

        const result = await model.generateContentStream({ contents: messagesWithInput }, { signal: abortControllerRef.current?.signal });

        setMessages((p) => [...p, { parts: [{ text: "" }], role: ROLE_NAMES.MODEL }]);

        let response = "";

        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          response += chunkText;
          setMessages((previusMessages) => {
            const newMessages = [...previusMessages];
            newMessages[newMessages.length - 1].parts[0].text = response;
            return newMessages;
          });
        }

        // const outputText = await result.response.text();
        // newMessages.push({ parts: [{ text: outputText }], role: ROLE_NAMES.MODEL });
        // setMessages(newMessages);
      } catch (error) {
        setError("Error: " + (error instanceof Error ? error.message : "Failed to fetch"));
        console.error("API Error:", error);
        // if (error?.name !== "AbortError") {
        //   setMessages((p) => {
        //     const newMessages = [...p];
        //     newMessages[newMessages.length - 1].parts[0].text = "Ошибка запроса.";
        //     return newMessages;
        //   });
        // }
      } finally {
        setLoading(false);
        abortControllerRef.current = null;
      }
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
        <ChatHistory {...{ messagesHistory: messages }} />
      </Box>

      <Box sx={{ mt: 1 }}>
        <TextInputForm
          {...{
            handleSubmit: handleSubmit,
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
