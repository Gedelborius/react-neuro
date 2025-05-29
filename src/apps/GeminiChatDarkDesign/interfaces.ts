export const ROLE = {
  USER: "user",
  MODEL: "model",
} as const;

export type RoleType = (typeof ROLE)[keyof typeof ROLE];

export type Part = { text: string };

export interface IMessage {
  role: RoleType;
  parts: Array<Part>;
}

export interface IChat {
  preview: string;
  messages: Array<IMessage>;
}

export interface IChatsState {
  currentIndex: number;
  chats: Array<IChat>;
}
