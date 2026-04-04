export const ButtonConfig = {
  type: "Button",
  label: "Button",

  defaultProps: {
    text: "Click Me",
    className: "bg-blue-500 text-white px-4 py-2",
  },

  propsSchema: {
    text: {
      type: "text",
      label: "Button Text",
    },
    className: {
      type: "text",
      label: "Tailwind Classes",
    },
  },
};