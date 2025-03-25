import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

export const useFormForGoogleGenerativeAI = (googleGenerativeAI: GoogleGenerativeAI, input: string, setResponse: (text: string) => void) => {
  // const [input, setInput] = useState("");
  // const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError("");

    try {
      const model = googleGenerativeAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(input);
      const text = await result.response.text();

      setResponse(text);
    } catch (err) {
      setError("Error: " + (err instanceof Error ? err.message : "Failed to fetch"));
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    // input,
    // setInput,
    // response,
    loading,
    error,
    handleSubmit,
  };
};
