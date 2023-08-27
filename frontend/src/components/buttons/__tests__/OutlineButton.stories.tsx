import type { Meta, StoryObj } from "@storybook/react";

import { OutlineButton } from "..";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta: Meta<typeof OutlineButton> = {
  title: "Buttons/OutlineButton",
  component: OutlineButton,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Primary: Story = {
  args: {
    children: "Outline",
  },
};
