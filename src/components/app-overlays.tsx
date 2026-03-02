"use client";

import RemoteCursors from "@/components/realtime/remote-cursors";
import ElasticCursor from "@/components/ui/ElasticCursor";

export default function AppOverlays() {
  return (
    <>
      <RemoteCursors />
      <ElasticCursor />
    </>
  );
}
