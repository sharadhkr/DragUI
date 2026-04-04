export function Button({
  text = "Button",
  className = "",
}) {
  return (
    <button className={className}>
      {text}
    </button>
  );
}