import type { NextPage } from "next";
import Layout from "@/components/layout";

const Upload: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="px-4 py-10">
        <div>
          <label className="w-full cursor-pointer text-gray-600 hover:border-primaryB-400 hover:text-primaryB-400 flex items-center justify-center border-2 border-dashed border-gray-300 h-48 rounded-md">
            <svg
              className="h-12 w-12"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input className="hidden" type="file" />
          </label>
        </div>
        <div className="my-5">
          <label
            className="mb-1 block text-sm font-medium text-gray-700"
            htmlFor="name"
          >
            글 제목
          </label>
          <div className="rounded-md relative flex  items-center shadow-sm">
            <input
              id="name"
              className="appearance-none pl-7 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primaryB-400 focus:border-primaryB-400"
              type="text"
              placeholder="제목을 입력해 주세요"
            />
          </div>
        </div>
        <div className="my-5">
          <label
            className="mb-1 block text-sm font-medium text-gray-700"
            htmlFor="place"
          >
            장소
          </label>
          <div className="rounded-md relative flex  items-center shadow-sm">
            <input
              id="place"
              className="appearance-none pl-7 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primaryB-400 focus:border-primaryB-400"
              type="text"
              placeholder="장소를 입력해 주세요"
            />
          </div>
        </div>
        <div className="my-5">
          <label
            className="mb-1 block text-sm font-medium text-gray-700"
            htmlFor="price"
          >
            가격
          </label>
          <div className="rounded-md relative flex  items-center shadow-sm">
            <div className="absolute left-0 pointer-events-none pl-3 flex items-center justify-center">
              <span className="text-gray-500 text-sm">₩</span>
            </div>
            <input
              id="price"
              className="appearance-none pl-7 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primaryB-400 focus:border-primaryB-400"
              type="text"
              placeholder="가격을 입력해 주세요"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            설명
          </label>
          <textarea
            className="px-4 py-2 my-1 shadow-sm w-full rounded-md focus:outline-none focus:outline-primaryB-400"
            rows={4}
            placeholder="글 설명을 입력해 주세요"
          />
        </div>
        <button className="mt-5 w-full bg-primaryB-400 hover:bg-primaryB-500 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-primaryB-400 focus:border-primaryB-400">
          완료
        </button>
      </div>
    </Layout>
  );
};

export default Upload;
