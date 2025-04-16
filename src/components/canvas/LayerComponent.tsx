"use client";
import { memo } from "react";
import { useStorage } from "@liveblocks/react";

const LayerComponent = memo(({ id }: { id: string }) => {
  const layer = useStorage((root) => root.layers.get(id));

  if (!layer) {
    return null;
  }

  return (
    <g>
      <rect x={0} y={0} width={200} height={200} fill="#55C425" />
    </g>
  );
});

LayerComponent.displayName = "LayerComponent";
export default LayerComponent;
