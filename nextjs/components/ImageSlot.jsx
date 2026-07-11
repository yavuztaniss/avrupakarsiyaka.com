// Görsel yer tutucu: public/ klasörüne görsel koyup src verin → gerçek görsel gösterilir.
export default function ImageSlot({ src, alt = "", placeholder = "Görsel", height, radius = 0 }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        style={{ width: "100%", height, objectFit: "cover", borderRadius: radius, display: "block" }}
      />
    );
  }
  return (
    <div
      style={{
        width: "100%",
        height,
        borderRadius: radius,
        background: "repeating-linear-gradient(45deg, #EEF6F0, #EEF6F0 14px, #E2EDE5 14px, #E2EDE5 28px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#4A5B50",
        fontSize: 14,
        fontWeight: 700,
        textAlign: "center",
        padding: 16,
        border: "2px dashed #C9DCCF",
      }}
    >
      {placeholder}
    </div>
  );
}
