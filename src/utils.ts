import type { Colour, Camera, Point } from "~/types";

import type React from "react";

export function rgbToHex(colour: Colour) {
  return `#${colour.r.toString(16).padStart(2, "0")}${colour.g.toString(16).padStart(2, "0")}${colour.b.toString(16).padStart(2, "0")}`;
}

export const pointerEventToCanvasPoint = (
  event: React.PointerEvent,
  camera: Camera,
): Point => {
  return {
    x: Math.round(event.clientX) - camera.x,
    y: Math.round(event.clientY) - camera.y,
  };
};
