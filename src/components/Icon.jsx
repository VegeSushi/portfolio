export default function Icon({ label, onDoubleClick, emoji, image }) {
  return (
    <div className="icon" onDoubleClick={onDoubleClick}>
      <div className="icon-image">
        {image ? (
          <img
            src={image}
            alt={label}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        ) : (
          emoji || "📁"
        )}
      </div>
      <div className="icon-label">{label}</div>
    </div>
  );
}