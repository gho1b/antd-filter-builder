import { Meta, StoryObj } from "@storybook/react";
import { TagInputNumber } from "../src/components/tag-input/tag-input-number";

const meta = {
  title: "Components/TagInputNumber",
  component: TagInputNumber,
  tags: ["autodocs"],
} satisfies Meta<typeof TagInputNumber>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InitialValue: Story = {
  args: {
    value: [1, 2, 3],
  },
};

export const Disabled: Story = {
  args: {
    value: [1, 2, 3, 4],
    disabled: true,
  },
};

export const CustomFormat: Story = {
  args: {
    value: [1, 2, 3, 4],
    format: {
      thousandSeparated: true,
      mantissa: 2,
      forceSign: true,
    },
  },
};

export const CutomTagColor: Story = {
  args: {
    value: [1, 2, 3, 4],
    tagColor: "success",
  },
};
