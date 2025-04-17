"use client";
import {
  type Camera,
  type Layer,
  LayerType,
  type Point,
  type RectangleLayer,
} from "~/types";
import { useMutation, useStorage } from "@liveblocks/react";
import { pointerEventToCanvasPoint, rgbToHex } from "~/utils";

import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/client";

import LayerComponent from "~/components/canvas/LayerComponent";
import React, { useState } from "react";

const MAX_LAYERS = 100;

export default function Canvas() {
  const roomColour = useStorage((root) => root.roomColour);
  const layerIds = useStorage((root) => root.layerIds);
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0, zoom: 1 });

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

  const onPointerUp = useMutation(({}, event: React.PointerEvent) => {
    const point = pointerEventToCanvasPoint(event, camera);

    insertLayer(LayerType.Rectangle, point);
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
          <svg onPointerUp={onPointerUp} className="h-full w-full">
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
