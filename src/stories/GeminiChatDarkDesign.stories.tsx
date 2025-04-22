import { GeminiChatDarkDesign } from "../apps/GeminiChatDarkDesign";
import { Meta, StoryObj } from "@storybook/react/*";

const meta = {
  title: "Apps/GeminiChatDarkDesign",
  component: GeminiChatDarkDesign,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof GeminiChatDarkDesign>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {},
};
