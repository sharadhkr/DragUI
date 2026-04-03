export const registry = [
  {
    type: "Button",
    label: "Button",
    defaultProps: {
      text: "Click Me",
      variant: "primary",
    },
    propsSchema: {
      text: { type: "text" },
      variant: {
        type: "select",
        options: ["primary", "secondary"],
      },
    },
  },
];