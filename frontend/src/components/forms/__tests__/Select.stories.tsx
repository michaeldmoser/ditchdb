import type { Meta, StoryObj } from "@storybook/react";

import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@/testing/chai";

import Select from "../Select";

const options = [
  { value: "apple", label: "Apple" },
  { value: "orange", label: "Orange" },
  { value: "grape", label: "Grape" },
  { value: "pear", label: "Pear" },
];

const meta: Meta<typeof Select> = {
  title: "Forms/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Primary: Story = {
  args: {
    label: "Select",
    name: "select",
    placeholder: "Select a fruit…",
    options,
  },
};

export const Disabled: Story = {
  args: {
    label: "Select",
    name: "select",
    placeholder: "Select a fruit…",
    options,
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(await canvas.getByRole("combobox", { name: "Select" })).to.be
      .disabled;
  },
};

export const Required: Story = {
  args: {
    label: "Select",
    name: "select",
    placeholder: "Select a fruit…",
    options,
    required: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(await canvas.getByRole("combobox", { name: "Select *" })).to.be
      .required;
  },
};
