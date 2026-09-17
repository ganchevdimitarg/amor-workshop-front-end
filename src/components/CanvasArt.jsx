// Stands in for a real product photo. Two overlapping, blurred color fields
// per palette plus a grain texture give each piece a distinct, painterly
// look without needing actual artwork photography. Swap in a real <img> per
// product whenever photos are ready — see README.md.

export default function CanvasArt({ palette, image, title, large = false }) {
  const [c1, c2] = palette;
  return (
      <div className={`canvas-art${large ? " canvas-art--large" : ""}`} role="img" aria-label={title}>
          {image ? (
              <img src={image} alt={title} className="canvas-art__image" />
          ) : (
              <>
                  <svg viewBox="0 0 240 240" className="canvas-art__paint" preserveAspectRatio="xMidYMid slice">
                      <rect width="240" height="240" fill={c2} />
                      <circle cx="75" cy="80" r="95" fill={c1} opacity="0.75" />
                      <circle cx="170" cy="150" r="105" fill={c2} opacity="0.55" />
                      <path
                          d="M25,175 C80,90 140,60 220,120"
                          stroke="#ffffff"
                          strokeOpacity="0.22"
                          strokeWidth="20"
                          fill="none"
                          strokeLinecap="round"
                      />
                  </svg>
                  <div className="canvas-art__grain" />
              </>
          )}
      </div>
  );
}
