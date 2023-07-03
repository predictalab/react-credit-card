import type { Meta, StoryObj } from "@storybook/react";
import CreditCard from "../components/CreditCard";

const meta = {
  title: "CreditCard",
  component: CreditCard,
  tags: ["autodocs"],
} satisfies Meta<typeof CreditCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    gradientStartColor: "#113e9f",
    gradientEndColor: "#3083f7",
    buttonColor: "#113e9f",
    buttonTextColor: "#fff",
    submitAction: (values) => console.log(values),
  },
};
