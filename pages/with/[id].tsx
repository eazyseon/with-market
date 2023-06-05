import type { NextPage } from "next";
import Layout from "@/components/layout";
import { useRouter } from "next/router";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Post, User, Answer } from "@prisma/client";
import useUploadData from "@/libs/client/useUploadData";
import { cls, timeForToday } from "@/libs/client/utils";
import useSWR from "swr";
import { useEffect } from "react";
import Loading from "@/components/loading";

interface AnswerWithUser extends Answer {
  user: User;
}

interface PostWithUser extends Post {
  user: User;
  _count: {
    answers: number;
    agrees: number;
  };
  answers: AnswerWithUser[];
}

interface withPostResponse {
  message: string;
  post: PostWithUser;
  isAgree: boolean;
}

interface AnswerForm {
  answer: string;
}

const WithDetail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { register, handleSubmit, reset } = useForm<Answer>();
  const { data, mutate } = useSWR<withPostResponse>(`/api/with/${id}`);
  const [uploadAgree, { loading: agreeLoading, data: agreeData }] =
    useUploadData(`/api/with/${router.query.id}/agree`);
  const [uploadAnswer, { loading: answerLoading, data: answerData }] =
    useUploadData(`/api/with/${router.query.id}/answer`);

  const onAgreeClick = () => {
    if (!data) return;
    mutate(
      {
        ...data,
        post: {
          ...data.post,
          _count: {
            ...data.post._count,
            agrees: data.isAgree
              ? data.post._count.agrees - 1
              : data.post._count.agrees + 1,
          },
        },
        isAgree: !data.isAgree,
      },
      false
    );
    if (!agreeLoading) {
      uploadAgree({});
    }
  };

  const onValid = (form: AnswerForm) => {
    if (answerLoading) return;
    uploadAnswer(form);
    reset();
  };

  useEffect(() => {
    if (answerData && answerData.message === "success") {
      mutate();
    }
  }, [answerData, mutate]);

  return (
    <Layout canGoBack>
      {!data ? (
        <Loading />
      ) : (
        <div>
          <div className="flex px-4 cursor-pointer px-4 py-4  items-center space-x-3">
            {data && (
              <Image
                src={data?.post?.user.image}
                alt="userProfile"
                width={50}
                height={50}
                className="rounded-full"
              />
            )}
            <p className="text-sm font-medium text-gray-700">
              {data?.post?.user.name}
            </p>
          </div>
          <div className="mt-2 px-4 text-gray-700 border-b pb-8">
            <span className="text-orange-500 font-medium mr-2">📢</span>
            {data?.post.question}
          </div>
          <div>
            <div className="flex px-4 space-x-5 text-gray-700 py-3 border-b-[2px]  w-full">
              <button
                onClick={onAgreeClick}
                className={cls(
                  "flex space-x-2 items-center text-sm ",
                  data?.isAgree ? "text-green-500" : ""
                )}
              >
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
                <span>공감하기 {data?.post?._count.agrees}</span>
              </button>
              <span className="flex space-x-2 items-center text-sm">
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
                <span>답변 {data?.post?._count.answers}</span>
              </span>
            </div>
          </div>
          {data?.post?.answers && (
            <div className="px-4 my-5 space-y-5 h-96 overflow-auto">
              {data?.post?.answers?.map((answer) => (
                <div key={answer.id} className="flex items-start space-x-3">
                  <Image
                    src={answer.user.image}
                    alt="userProfile"
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                  <div>
                    <span className="text-sm block font-medium text-gray-700">
                      {answer.user.name}
                    </span>
                    <span className="text-xs text-gray-500 block ">
                      {timeForToday(answer.createdAt)}
                    </span>
                    <p className="text-gray-700 mt-2">{answer.answer} </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <form
            className="fixed py-2 bg-white bottom-2 inset-x-0 focus:border-primaryB-400"
            onSubmit={handleSubmit(onValid)}
          >
            <div className="flex relative max-w-md items-center w-full mx-auto">
              <input
                name="answer"
                {...register("answer", { required: true })}
                required
                type="text"
                className="shadow-sm py-2 px-4 rounded-full w-full border-gray-300 focus:outline-none focus:outline-primaryB-400"
                placeholder="이웃과 정보를 나눠보세요 :)"
              />
              <div className="absolute flex py-2 pr-2 right-0">
                <button className="flex focus:ring-2 focus:ring-offset-2 focus:ring-primaryB-400 items-center bg-primaryB-400 rounded-full px-4 py-1 hover:bg-primaryB-500 text-md text-white">
                  {answerLoading ? "..." : "▶︎"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </Layout>
  );
};

export default WithDetail;
