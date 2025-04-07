import { useState, useRef, useEffect, useCallback } from "react";
import { IChatMessage } from "../interfaces/ChatHistoryInterfaces";

export function useGuaranteedMessages(initialState: IChatMessage[]) {
  const [messages, _setMessages] = useState<IChatMessage[]>(initialState);
  const messagesRef = useRef<IChatMessage[]>(initialState);
  const queueRef = useRef<((value: IChatMessage[]) => void)[]>([]);

  useEffect(() => {
    messagesRef.current = messages;
    while (queueRef.current.length > 0) {
      const resolve = queueRef.current.shift()!;
      resolve(messages);
    }
  }, [messages]);

  const setMessages = useCallback((setStateAction: (previusMessages: IChatMessage[]) => IChatMessage[]): Promise<IChatMessage[]> => {
    return new Promise((resolve) => {
      _setMessages((previusMessages) => {
        const newMessages = setStateAction(previusMessages);
        resolve(newMessages);
        return newMessages;
      });
    });
  }, []);

  const addMessage = useCallback((message: IChatMessage): Promise<IChatMessage[]> => {
    return new Promise((resolve) => {
      _setMessages((previusMessages) => {
        const newMessages = [...previusMessages, message];
        resolve(newMessages);
        return newMessages;
      });
    });
  }, []);

  const getMessages = useCallback(() => messagesRef.current, []);

  const getMessagesAsync = useCallback(() => {
    return new Promise<IChatMessage[]>((resolve) => {
      if (messagesRef.current === messages) {
        resolve(messagesRef.current);
      } else {
        queueRef.current.push(resolve);
      }
    });
  }, [messages]);

  return {
    testMessages: messages,
    setTestMessages: setMessages,
    addTestMessage: addMessage,
    getTestMessages: getMessages,
    getTestMessagesAsync: getMessagesAsync,
  };
}
