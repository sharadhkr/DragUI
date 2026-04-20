export function Sidebar({ children, className = "" }) {
  return (
    <div className={`bg-red-700 rounded-4xl ${className}`}>
      {children || "Sidebar"}
    </div>
  );
}
