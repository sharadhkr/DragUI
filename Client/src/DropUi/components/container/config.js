export const ContainerConfig = {
  type: "Container",
  label: "Container",

  defaultProps: {
    className: "p-4 border",
  },

  propsSchema: {
    className: {
      type: "text",
      label: "Tailwind Classes",
    },
  },
};