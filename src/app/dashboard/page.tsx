"use client";

import { signout } from "~/app/actions/auth";

export default function Page() {
  return (
    <div>
      <p>My Dashboard</p>
      <button onClick={() => signout()}>Sign out</button>
    </div>
  );
}
