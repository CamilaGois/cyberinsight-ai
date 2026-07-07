type Props = {
  title: string;
  value: number;
  color?: string;
};

export default function StatsCard({
  title,
  value,
  color = "#0f172a",
}: Props) {
  return (
    <div
      style={{
        background: "#fff",
        padding: 20,
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,.08)",
        borderLeft: `5px solid ${color}`,
      }}
    >
      <p
        style={{
          margin: 0,
          color: "#64748b",
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        {title}
      </p>

      <h1
        style={{
          margin: "10px 0 0",
          color,
          fontSize: 32,
        }}
      >
        {value}
      </h1>
    </div>
  );
}