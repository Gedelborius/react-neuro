import { Meta, StoryObj } from "@storybook/react/*";
import { GeminiChatWithAgentKey } from "../pages/GeminiChatWithAgentKey";

const meta = {
  title: "Pages/GeminiChatWithAgentKey",
  component: GeminiChatWithAgentKey,
} satisfies Meta<typeof GeminiChatWithAgentKey>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
