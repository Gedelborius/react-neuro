export interface IMessage {
  text: string;
  author: "user" | "ai";
}

export const ROLE_NAMES = {
  USER: "user",
  MODEL: "model",
} as const;

export type RoleTypes = (typeof ROLE_NAMES)[keyof typeof ROLE_NAMES];

export interface IChatMessage {
  parts: Array<{ text: string }>;
  role: RoleTypes;
}
