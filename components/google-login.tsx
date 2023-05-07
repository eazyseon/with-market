import { useSession, signIn, signOut } from "next-auth/react";
import { Session } from "next-auth/src/core/types";

interface sessionId extends Session {
  id?: string;
}

export default function Component() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        name : {session.user?.name} <br />
        id : {(session as sessionId).id} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn("google")}>Sign in</button>
    </>
  );
}
