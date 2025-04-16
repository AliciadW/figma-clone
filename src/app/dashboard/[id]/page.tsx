import { auth } from "~/server/auth";

type ParamsType = Promise<{ id: string }>;

import { Room } from "~/components/liveblocks/Room";

export default async function Page({ params }: { params: ParamsType }) {
  const { id } = await params;

  const session = await auth();

  return (
    <Room roomId={"room" + id}>
      <p>Hi</p>
    </Room>
  );
}
