import type { NextPage } from "next";
import Layout from "@/components/layout";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import useSWR from "swr";
import { useState } from "react";
import { cls } from "@/libs/client/utils";
import Item from "@/components/item";

const MyWith: NextPage = () => {
  const [kind, setKind] = useState("withme");
  const { data: session } = useSession();
  const { data } = useSWR(`/api/mypage/${kind}`);
  return (
    <Layout hasTabBar title="나의 WITH">
      <div className="px-4">
        <div className="flex items-center mt-6 space-x-3">
          {session ? (
            <div className="flex items-center">
              <Image
                src={session?.user?.image}
                alt="userProfile"
                width={64}
                height={64}
                className="rounded-full mr-3"
              />
              <span className="font-medium text-lg text-gray-500 mr-2">
                {session?.user?.name}님 반가워요 😁
              </span>
              <span
                onClick={() => signOut()}
                className="text-sm text-gray-500 cursor-pointer"
              >
                로그아웃
              </span>
            </div>
          ) : (
            <div className="flex items-center">
              <div className="w-16 h-16 bg-slate-500 rounded-full mr-4" />
              <span
                onClick={() => signIn("google")}
                className="font-medium text-lg text-gray-500 cursor-pointer"
              >
                로그인 해주세요 😁
              </span>
            </div>
          )}
        </div>
        <div className="mt-10 flex justify-around">
          <div
            onClick={() => setKind("withme")}
            className="flex flex-col items-center"
          >
            <div
              className={cls(
                "w-14 h-14 text-white rounded-full flex items-center justify-center",
                kind === "withme" ? "bg-primaryB-400" : "bg-gray-400"
              )}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
            <span
              className={cls(
                "text-sm mt-2 font-medium",
                kind === "withme" ? "text-primaryB-400" : "text-gray-400"
              )}
            >
              WITH ME
            </span>
          </div>
          <div
            onClick={() => setKind("withyou")}
            className="flex flex-col items-center"
          >
            <div
              className={cls(
                "w-14 h-14 text-white rounded-full flex items-center justify-center",
                kind === "withyou" ? "bg-primaryB-400" : "bg-gray-400"
              )}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                ></path>
              </svg>
            </div>
            <span
              className={cls(
                "text-sm mt-2 font-medium",
                kind === "withyou" ? "text-primaryB-400" : "text-gray-400"
              )}
            >
              WITH YOU
            </span>
          </div>
          <div
            onClick={() => setKind("favs")}
            className="flex flex-col items-center"
          >
            <div
              className={cls(
                "w-14 h-14 text-white rounded-full flex items-center justify-center",
                kind === "favs" ? "bg-primaryB-400" : "bg-gray-400"
              )}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            </div>
            <span
              className={cls(
                "text-sm mt-2 font-medium",
                kind === "favs" ? "text-primaryB-400" : "text-gray-400"
              )}
            >
              관심목록
            </span>
          </div>
        </div>
        <div className="flex flex-col space-y-5 divide-y">
          {data &&
            data?.products?.map((product) => (
              <Item
                key={product.id}
                name={product.name}
                place={product.place}
                price={product.price}
                people={product.people}
                image={product.image}
                id={product.id}
                hearts={product._count.favs}
                member={product._count.members}
                isFull={product.isFull}
                includeUserId={product.favs.some(
                  (el) => el.userId === session?.id
                )}
              />
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default MyWith;
