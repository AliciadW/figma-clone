import { auth } from "~/server/auth";

type ParamsType = Promise<{ id: string }>;

import { Room } from "~/components/liveblocks/Room";
import Canvas from "~/components/canvas/Canvas";

export default async function Page({ params }: { params: ParamsType }) {
  const { id } = await params;

  const session = await auth();

  return (
    <Room roomId={"room:" + id}>
      <Canvas />
    </Room>
  );
}
