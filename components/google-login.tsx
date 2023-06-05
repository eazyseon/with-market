import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Component() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const loading = status === "loading";
  if (session) {
    router?.push("/");
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        <Image
          src="/logo.jpg"
          alt="logo"
          width={120}
          height={120}
          className="rounded-full"
        />
        <p className="font-bold text-2xl text-gray-400 my-4">함께 사는</p>
        <p className="font-bold text-2xl text-primaryB-400">WITH</p>
        <p className="font-bold text-2xl text-primaryP-400 my-4">MARKET</p>
        <div className="flex items-center justify-between border border-gray-300 p-2 w-48 ">
          <Image
            src="/googleLogo.png"
            alt="userProfile"
            width={40}
            height={40}
            className="rounded-full"
          />
          <button onClick={() => signIn("google")}>
            <span className="text-sm text-gray-500">Google로 시작하기</span>
          </button>
        </div>
      </div>
    </div>
  );
}
