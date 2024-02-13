import { Meta, StoryObj } from "@storybook/react";
import { FilterBuilder } from "../src/components/filter-builder";

const meta = {
  title: "Organisms/FilterBuilder",
  component: FilterBuilder,
  tags: ["autodocs"],
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
