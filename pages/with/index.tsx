import type { NextPage } from "next";
import Layout from "@/components/layout";
import FloatingButton from "@/components/floating-button";
import useGetData from "@/libs/client/useGetData";
import { useEffect } from "react";
import useCoords from "@/libs/client/useCoords";
import Link from "next/link";
import { timeForToday } from "@/libs/client/utils";
import { Post, User } from "@prisma/client";

interface PostWithUser extends Post {
  user: User;
  _count: {
    answers: number;
  };
}

interface getWithsData {
  message: string;
  posts: PostWithUser[];
}

const With: NextPage = () => {
  const { latitude, longitude } = useCoords();
  const [getWiths, { loading, data }] = useGetData<getWithsData>(
    `/api/with/get?latitude=${latitude}&longitude=${longitude}`
  );
  useEffect(() => {
    getWiths();
  }, [latitude, longitude]);
  return (
    <Layout hasTabBar title="WITH생활">
      {loading ? (
        <span>로딩중...</span>
      ) : (
        <div className="space-y-4 divide-y-[2px]">
          {data?.posts?.map((post) => (
            <Link href={`/with/${post.id}`} key={post.id}>
              <div className="flex cursor-pointer flex-col pt-4 items-start">
                <span className="flex ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  궁금해요 📢
                </span>
                <span className="mt-2 px-4 text-gray-700">{post.question}</span>
                <div className="mt-5 px-4 flex items-center justify-between w-full text-gray-500 font-medium text-xs">
                  <div className="flex items-center">
                    <span className="mr-1">{post?.user?.name}</span>
                    <span className="mr-1">•</span>
                    <span>{timeForToday(post.createdAt)}</span>
                  </div>
                  <div className="flex px-4 space-x-5 mt-3 text-gray-600 text-sm">
                    <span className="flex space-x-2 items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                        />
                      </svg>
                      <span>1</span>
                    </span>
                    <span className="flex space-x-2 items-center">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        ></path>
                      </svg>
                      <span>{post?._count?.answers}</span>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          <FloatingButton href="/with/write">
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
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              ></path>
            </svg>
          </FloatingButton>
        </div>
      )}
    </Layout>
  );
};

export default With;
