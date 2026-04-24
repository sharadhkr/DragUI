import React from "react";

const SidebarComponent = React.forwardRef(({ children, className = "", ...props }, ref) => {
  console.log("🔴 Sidebar component rendered");
  return (
    <div ref={ref} className={`bg-red-700 rounded-4xl ${className}`} {...props}>
      {children || "Sidebar"}
    </div>
  );
});

SidebarComponent.displayName = "Sidebar";

export const Sidebar = SidebarComponent;
