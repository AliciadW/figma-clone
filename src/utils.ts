import type { Colour } from "~/types";

export function rgbToHex(colour: Colour) {
  return `#${colour.r.toString(16).padStart(2, "0")}${colour.g.toString(16).padStart(2, "0")}${colour.b.toString(16).padStart(2, "0")}`;
}
