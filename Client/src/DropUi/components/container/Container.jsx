import React from "react";

const ContainerComponent = React.forwardRef(({ children, className = "", ...props }, ref) => {
  console.log("📦 Container component rendered");
  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  );
});

ContainerComponent.displayName = "Container";

export const Container = ContainerComponent;