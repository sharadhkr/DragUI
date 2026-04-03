export const registry = [
  {
    type: "Button",
    label: "Button",
    defaultProps: {
      text: "Click Me",
      className: "bg-blue-500 text-white px-4 py-2",
    },
    propsSchema: {
      text: { type: "text" },
      className: { type: "text" },
    },
  },
  {
    type: "div",
    label: "Container",
    defaultProps: {
      className: "p-4 border",
    },
    propsSchema: {
      className: { type: "text" },
    },
  },
];