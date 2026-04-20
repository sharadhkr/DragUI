export const ButtonConfig = {
  type: "Button",
  label: "Button",

  defaultProps: {
    text: "Click Me",
    className: "bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition",
    backgroundColor: "#3b82f6",
    color: "#ffffff",
    padding: "8px 16px",
    borderRadius: "8px",
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
    backgroundColor: {
      type: "color",
      label: "Background Color",
    },
    color: {
      type: "color",
      label: "Text Color",
    },
    padding: {
      type: "text",
      label: "Padding (CSS)",
    },
    borderRadius: {
      type: "text",
      label: "Border Radius (CSS)",
    },
  },
};