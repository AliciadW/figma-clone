"use client";

import type { ReactNode } from "react";
import type { Layer } from "~/types";

import { LiveList, LiveMap, type LiveObject } from "@liveblocks/client";

import { LiveblocksProvider, RoomProvider } from "@liveblocks/react";

export function Room({
  children,
  roomId,
}: {
  children: ReactNode;
  roomId: string;
}) {
  return (
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
      <RoomProvider
        id={roomId}
        initialPresence={{
          selection: [],
          cursor: null,
          penColor: null,
          pencilDraft: null,
        }}
        initialStorage={{
          roomColour: { r: 30, g: 30, b: 30 },
          layers: new LiveMap<string, LiveObject<Layer>>(),
          layerIds: new LiveList([]),
        }}
      >
        <p></p>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
