"use client";
import type { Point, RectangleLayer, Layer } from "~/types";

import { LayerType } from "~/types";
import { useMutation, useStorage } from "@liveblocks/react";
import { rgbToHex } from "~/utils";

import { nanoid } from "nanoid";
import { useEffect } from "react";
import { LiveObject } from "@liveblocks/client";

import LayerComponent from "~/components/canvas/LayerComponent";

const MAX_LAYERS = 100;

export default function Canvas() {
  const roomColour = useStorage((root) => root.roomColour);
  const layerIds = useStorage((root) => root.layerIds);

  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType: LayerType.Ellipse | LayerType.Rectangle | LayerType.Text,
      position: Point,
    ) => {
      const liveLayers = storage.get("layers");

      if (liveLayers.size >= MAX_LAYERS) {
        return;
      }

      const liveLayerIds = storage.get("layerIds");
      const layerId = nanoid();

      let layer: LiveObject<Layer> | null = null;

      if (layerType === LayerType.Rectangle) {
        layer = new LiveObject<RectangleLayer>({
          type: LayerType.Rectangle,
          x: position.x,
          y: position.y,
          height: 100,
          width: 100,
          fill: { r: 217, g: 217, b: 217 },
          stroke: { r: 217, g: 217, b: 217 },
          opacity: 100,
        });
      }

      if (layer) {
        liveLayerIds.push(layerId);
        liveLayers.set(layerId, layer);

        setMyPresence({ selection: [layerId] }, { addToHistory: true });
      }
    },
    [],
  );

  useEffect(() => {
    insertLayer(LayerType.Rectangle, { x: 100, y: 100 });
  }, []);

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
