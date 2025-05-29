import { useEffect, useMemo, useState } from "react";
import { IChat, IChatsState, IMessage, Part, ROLE } from "../interfaces";
import { loadFromLocalStorage } from "../utils/loadFromLocalStorage";
import { isChatsState } from "../typeGuards";
import { saveToLocalStorage } from "../utils/saveToLocalStorage";
import { useAgentKey } from "../../../hooks/useAgentKey";
import { GoogleGenAI } from "@google/genai";

const initializeChatsState = (): IChatsState => {
  const loaded = loadFromLocalStorage("CHATS_STATE");
  if (isChatsState(loaded)) return loaded;
  return { currentIndex: 0, chats: [{ preview: "", messages: [] }] };
};

export const useChats = () => {
  const { apiKey, setApiKey, deleteKey } = useAgentKey();
  const genAI = useMemo(() => new GoogleGenAI({ apiKey }), [apiKey]);

  const [chatsState, setChatsState] = useState<IChatsState>(initializeChatsState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    saveToLocalStorage("CHATS_STATE", chatsState);
  }, [chatsState]);

  const changeChat = (index: number) => {
    if (!loading) {
      setChatsState((previousState) => ({
        currentIndex: index,
        chats: previousState.chats.map((chat: IChat) => ({
          preview: chat.preview,
          messages: chat.messages.map((message: IMessage) => ({
            role: message.role,
            parts: message.parts.map((part) => ({ ...part })),
          })),
        })),
      }));
    }
  };

  // chatsState.chats[chatsState.chats.le].messages.length !== 0
  const addNewChat = () => {
    if (!loading) {
      if (chatsState.chats[chatsState.chats.length - 1].messages.length !== 0) {
        setChatsState((previousState) => {
          const newChatsState: IChatsState = {
            currentIndex: previousState.chats.length,
            chats: previousState.chats.map((chat: IChat) => ({
              preview: chat.preview,
              messages: chat.messages.map((message: IMessage) => ({
                role: message.role,
                parts: message.parts.map((part) => ({ ...part })),
              })),
            })),
          };
          newChatsState.chats.push({ preview: "", messages: [] });
          return newChatsState;
        });
      } else {
        setChatsState((previousState) => ({
          currentIndex: previousState.chats.length - 1,
          chats: previousState.chats.map((chat: IChat) => ({
            preview: chat.preview,
            messages: chat.messages.map((message: IMessage) => ({
              role: message.role,
              parts: message.parts.map((p) => ({ ...p })),
            })),
          })),
        }));
      }
    }
  };

  const deleteChat = () => {
    if (!loading && chatsState.chats.length !== 1) {
      setChatsState((previousState) => {
        const newChatsState: IChatsState = {
          currentIndex: previousState.currentIndex,
          chats: [],
        };
        for (let i = 0; i < previousState.chats.length; i++)
          if (i !== previousState.currentIndex)
            newChatsState.chats.push({
              preview: previousState.chats[i].preview,
              messages: previousState.chats[i].messages.map((message: IMessage) => ({
                role: message.role,
                parts: message.parts.map((part) => ({ ...part })),
              })),
            });
        newChatsState.currentIndex = newChatsState.chats.length - 1;
        return newChatsState;
      });
    }
  };

  const nextChat = () => {
    if (!loading) {
      setChatsState((previousState) => ({
        currentIndex: previousState.currentIndex !== previousState.chats.length - 1 ? previousState.currentIndex + 1 : 0,
        chats: previousState.chats.map((chat: IChat) => ({
          preview: chat.preview,
          messages: chat.messages.map((message: IMessage) => ({
            role: message.role,
            parts: message.parts.map((part) => ({ ...part })),
          })),
        })),
      }));
    }
  };

  const clearMessages = () => {};

  const handleSubmit = async (e: React.FormEvent, textareaValue: string) => {
    if (!loading) {
      const inputText = textareaValue;
      if (!inputText.trim()) return;
      setLoading(true);
      setError("");

      const messagesWithInput = chatsState.chats[chatsState.currentIndex].messages.map((message: IMessage) => ({
        ...message,
        parts: [{ ...message.parts[0] }],
      }));

      messagesWithInput.push({ parts: [{ text: inputText }], role: ROLE.USER });

      try {
        console.log("messagesWithInput in try: ", messagesWithInput);
        const result = await genAI.models.generateContentStream({ model: "gemini-2.0-flash-001", contents: messagesWithInput });
        // console.log("result: ", result);

        setChatsState((previousState) => {
          const newChatsState: IChatsState = {
            currentIndex: previousState.currentIndex,
            chats: previousState.chats.map((chat, chatIndex) => ({
              preview: chat.preview,
              messages:
                previousState.currentIndex === chatIndex
                  ? [...messagesWithInput, { parts: [{ text: "" }], role: ROLE.MODEL }]
                  : chat.messages.map((message) => ({ ...message, parts: [{ ...message.parts[0] }] })),
            })),
          };
          return newChatsState;
        });

        for await (const chunk of result) {
          const chunkText = chunk.text;
          // console.log("chunkText: ", chunkText);

          setChatsState((previousState) => {
            // console.log("from setChatsState inside (for await): ", previousState);
            const newChatsState: IChatsState = {
              currentIndex: previousState.currentIndex,
              chats: previousState.chats.map((chat, chatIndex /*, chatArray*/) => ({
                preview: chat.preview,
                messages: chat.messages.map((message, тessageIndex, messageArray) => ({
                  role: message.role,
                  parts: [
                    chatIndex !== previousState.currentIndex || тessageIndex !== messageArray.length - 1
                      ? { ...message.parts[0] }
                      : { text: message.parts[0].text + chunkText },
                  ],
                })),
              })),
            };
            // const currentMessagesLength = newChatsState.chats[p.currentIndex].messages.length;
            // newChatsState.chats[p.currentIndex].messages[currentMessagesLength - 1].parts[0].text += chunkText;
            // console.log("newChatsState inside for await setChatsState: ", newChatsState);
            return newChatsState;
          });
        }
      } catch (error) {
        setError("Error: " + (error instanceof Error ? error.message : "Failed to fetch"));
        console.error("API Error:", error);
      } finally {
        // console.log("chatsState finally: ", chatsState);
        setLoading(false);
      }
    }
  };

  return {
    apiKey,
    setApiKey,
    deleteKey,
    chatsState,
    loading,
    error,
    changeChat,
    addNewChat,
    deleteChat,
    nextChat,
    clearMessages,
    handleSubmit,
  };
};
