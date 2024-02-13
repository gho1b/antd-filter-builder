import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { FilterBuilder } from "../lib/components/filter-builder";

const meta = {
  title: "Components/FilterBuilder",
  component: FilterBuilder,
  tags: ["autodocs"],
  args: {
    onFilter: fn(),
  },
  argTypes: {
    onFilter: {
      action: "onFilter",
      description: "Callback when submit",
    },
  },
} satisfies Meta<typeof FilterBuilder>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    filters: [
      { type: "number", label: "ID", dataIndex: "id" },
      { type: "string", label: "Name", dataIndex: "name" },
      { type: "datetime", label: "Birthday", dataIndex: "birthday" },
      { type: "boolean", label: "Status", dataIndex: "isActive" },
    ],
  },
};
