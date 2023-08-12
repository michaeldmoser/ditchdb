import type { Meta, StoryObj } from "@storybook/react";

import { Address } from "..";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta: Meta<typeof Address> = {
  title: "Address",
  component: Address,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Primary: Story = {
  args: {
    address1: "123 Main St",
    city: "Missoula",
    state: "MT",
    zip: "59801",
  },
};

export const TwoAddressLines: Story = {
  args: {
    address1: "Bill and Alice",
    address2: "123 Main St",
    city: "Missoula",
    state: "MT",
    zip: "59801",
  },
};

export const ThreeAddressLines: Story = {
  args: {
    address1: "Bill and Alice",
    address2: "ATTN: Bill",
    address3: "123 Main St",
    city: "Missoula",
    state: "MT",
    zip: "59801",
  },
};

export const CityStateZip: Story = {
  args: {
    city: "Missoula",
    state: "MT",
    zip: "59801",
  },
};

export const CityState: Story = {
  args: {
    city: "Missoula",
    state: "MT",
  },
};
