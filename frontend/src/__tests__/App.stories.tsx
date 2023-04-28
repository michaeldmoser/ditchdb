import type { Meta, StoryObj } from '@storybook/react';

import App from '@/App';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'App',
  component: App,
  tags: ['autodocs'],
  argTypes: {}
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Primary: Story = {
  args: {}
};
