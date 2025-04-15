// import { Meta } from "storybook/internal/csf";
import { Meta, StoryObj } from "@storybook/react/*";
import { GeminiChatNewDesign } from "../pages/GeminiChatNewDesign";

const meta = {
  title: "Pages/GeminiChatNewDesign",
  component: GeminiChatNewDesign,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof GeminiChatNewDesign>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
