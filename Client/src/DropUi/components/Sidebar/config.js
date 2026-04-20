export const SidebarConfig = {
  type: "Sidebar",
  label: "Sidebar",

  defaultProps: {
    className: "bg-red-700 rounded-4xl p-4 min-h-[300px]",
    backgroundColor: "#b91c1c",
    borderRadius: "32px",
    padding: "16px",
    minHeight: "300px",
  },

  propsSchema: {
    className: {
      type: "text",
      label: "Tailwind Classes",
    },
    backgroundColor: {
      type: "color",
      label: "Background Color",
    },
    borderRadius: {
      type: "text",
      label: "Border Radius (CSS)",
    },
    padding: {
      type: "text",
      label: "Padding (CSS)",
    },
    minHeight: {
      type: "text",
      label: "Min Height (CSS)",
    },
  },
};
