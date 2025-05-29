import { useEffect } from "react";
import { IMessage } from "../interfaces";

export const useLocalStorage = (messages: IMessage[]) => {
  useEffect(() => {
    try {
      const valueToStore = JSON.stringify(messages);
      localStorage.setItem("MESSAGES_KEY", valueToStore);
    } catch (error) {
      console.error("Error saving to localStorage key MESSAGES_KEY:", error);
    }
  }, [messages]);
};
