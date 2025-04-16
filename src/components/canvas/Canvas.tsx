"use client";

import { useStorage } from "@liveblocks/react";
import { rgbToHex } from "~/utils";

import LayerComponent from "~/components/canvas/LayerComponent";

export default function Canvas() {
  const roomColour = useStorage((root) => root.roomColour);
  // const roomColour = { r: 85, g: 196, b: 37 };
  const layerIds = useStorage((root) => root.layerIds);

  return (
    <div className="flex h-screen w-full">
      <main className="fixed right-0 left-0 h-screen overflow-y-auto">
        <div
          style={{
            backgroundColor: roomColour ? rgbToHex(roomColour) : "#1e1e1e",
          }}
          className="h-full w-full touch-none"
        >
          <svg className="h-full w-full">
            <g>
              {layerIds?.map((layerId) => (
                <LayerComponent key={layerId} id={layerId} />
              ))}
            </g>
          </svg>
        </div>
      </main>
    </div>
  );
}
