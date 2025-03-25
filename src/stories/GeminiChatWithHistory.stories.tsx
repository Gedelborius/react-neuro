import { Meta, StoryObj } from "@storybook/react/*";
import { GeminiChatWithHistory } from "../pages/GeminiChatWithHistory";

const meta = {
  title: "Pages/GeminiChatWithHistory",
  component: GeminiChatWithHistory,
} satisfies Meta<typeof GeminiChatWithHistory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
