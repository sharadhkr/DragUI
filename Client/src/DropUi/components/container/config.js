export const ContainerConfig = {
  type: "Container",
  label: "Container",

  defaultProps: {
    className: "p-4 border border-slate-300 rounded-lg bg-slate-50 min-h-[200px]",
    backgroundColor: "#f8fafc",
    padding: "16px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    minHeight: "200px",
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
    padding: {
      type: "text",
      label: "Padding (CSS)",
    },
    border: {
      type: "text",
      label: "Border (CSS)",
    },
    borderRadius: {
      type: "text",
      label: "Border Radius (CSS)",
    },
    minHeight: {
      type: "text",
      label: "Min Height (CSS)",
    },
  },
};