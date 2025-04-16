import type { RectangleLayer } from "~/types";
import { rgbToHex } from "~/utils";

export default function Rectangle({
  id,
  layer,
}: {
  id: string;
  layer: RectangleLayer;
}) {
  const { x, y, height, width, fill, stroke, opacity, cornerRadius } = layer;

  return (
    <g>
      <rect
        style={{ transform: `translate(${x}px, ${y}px)` }}
        height={height}
        width={width}
        stroke={stroke ? rgbToHex(stroke) : "#CCC"}
        fill={fill ? rgbToHex(fill) : "#CCC"}
        strokeWidth={1}
        x={x}
        y={y}
        opacity={opacity}
        rx={cornerRadius ?? 0}
        ry={cornerRadius ?? 0}
      />
    </g>
  );
}
