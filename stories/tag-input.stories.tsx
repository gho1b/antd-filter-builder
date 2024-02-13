import { Meta, StoryObj } from "@storybook/react";
import { TagInput } from "../lib/components/tag-input/tag-input";

const meta = {
  title: "Components/TagInput",
  component: TagInput,
  tags: ["autodocs"],
} satisfies Meta<typeof TagInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Initial: Story = {
  args: {
    value: ["value", "name"],
  },
};

export const Disabled: Story = {
  args: {
    value: ["value", "name"],
    disabled: true,
  },
};
