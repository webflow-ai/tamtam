export default function FareBadge({ amount, large = false, variant = "primary" }) {
  const variantStyle = {
    primary: {
      background: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)",
      color: "#ffffff",
      boxShadow: "0 4px 12px rgba(27,67,50,0.2)",
    },
    accent: {
      background: "linear-gradient(135deg, #F59E0B 0%, #d97706 100%)",
      color: "#ffffff",
      boxShadow: "0 4px 12px rgba(245,158,11,0.2)",
    },
    outline: {
      background: "#ffffff",
      color: "#1B4332",
      border: "1px solid rgba(27,67,50,0.18)",
      boxShadow: "0 1px 4px rgba(27,67,50,0.06)",
    },
  }[variant] || {};

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontWeight: 700,
        borderRadius: 100,
        padding: large ? "8px 18px" : "5px 12px",
        fontSize: large ? "1rem" : "0.78rem",
        fontFamily: "var(--font-family-poppins)",
        letterSpacing: "-0.01em",
        ...variantStyle,
      }}
    >
      <span
        style={{
          fontSize: large ? "0.82rem" : "0.65rem",
          fontWeight: 500,
          marginRight: 1,
          opacity: 0.8,
        }}
      >
        ₹
      </span>
      {amount}
    </span>
  );
}
