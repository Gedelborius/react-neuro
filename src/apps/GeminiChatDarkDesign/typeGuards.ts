import { IChat, IChatsState, IMessage, Part, ROLE, RoleType } from "./interfaces";

export function isObjectNotNull(x: unknown): x is object {
  return typeof x === "object" && x !== null;
}

export function isRole(x: unknown): x is RoleType {
  return x === ROLE.MODEL || x === ROLE.USER;
}

export function isPart(x: unknown): x is Part {
  return isObjectNotNull(x) && "text" in x && typeof x["text"] === "string";
}

export function isMessage(x: unknown): x is IMessage {
  return (
    isObjectNotNull(x) && "role" in x && isRole(x["role"]) && "parts" in x && Array.isArray(x["parts"]) && (x["parts"].length === 0 || isPart(x["parts"][0]))
  );
}

export function isChat(x: unknown): x is IChat {
  return (
    isObjectNotNull(x) &&
    "preview" in x &&
    typeof x["preview"] === "string" &&
    "messages" in x &&
    Array.isArray(x["messages"]) &&
    (x["messages"].length === 0 || isMessage(x["messages"][0]))
  );
}

export function isChatsState(x: unknown): x is IChatsState {
  return (
    isObjectNotNull(x) &&
    "currentIndex" in x &&
    typeof x["currentIndex"] === "number" &&
    "chats" in x &&
    Array.isArray(x["chats"]) &&
    (x["chats"].length === 0 || isChat(x["chats"][0]))
  );
}
