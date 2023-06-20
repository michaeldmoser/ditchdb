import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';

import List from '../list';

const meta = {
  title: 'Properties/List',
  component: List,
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Properties: Story = {
  args: {
    properties: [
      { propertyid: 1, addr_number: '123', addr_street: 'Main St' },
      { propertyid: 2, addr_number: '456', addr_street: 'Broadway' },
      { propertyid: 3, addr_number: '789', addr_street: 'Elm St' },
      { propertyid: 4, addr_number: '1011', addr_street: 'Oak St' }
    ]
  }
};
