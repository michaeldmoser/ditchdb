import type { Meta, StoryObj } from "@storybook/react";

import { InfoAlert } from "../";

const meta: Meta<typeof InfoAlert> = {
  title: "Alerts/InfoAlert",
  component: InfoAlert,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Primary: Story = {
  args: {
    children: "This is an info alert",
  },
};
