import type { Preview } from "@storybook/react";

export const parameters = {
  layout: "fullscreen", // Убирает все отступы по умолчанию
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
