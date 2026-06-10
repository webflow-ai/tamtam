export default function FareBadge({ amount, large = false, variant = "primary" }) {
  const styles = {
    primary: "gradient-primary text-white",
    accent: "gradient-accent text-white",
    outline: "bg-white text-primary border border-primary/20 shadow-sm",
  };

  return (
    <span
      className={`inline-flex items-center font-bold rounded-full ${styles[variant]} ${
        large ? "px-5 py-2.5 text-base" : "px-3.5 py-1.5 text-xs"
      }`}
    >
      <span className={large ? "text-sm font-medium mr-0.5 opacity-80" : "mr-0.5 opacity-70 text-[10px]"}>₹</span>
      {amount}
    </span>
  );
}
