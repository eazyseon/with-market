import type { NextPage } from "next";
import Layout from "@/components/layout";

const Write: NextPage = () => {
  return (
    <Layout canGoBack>
      <form className="px-4 py-10">
        <textarea
          className="px-4 py-2 my-1 shadow-sm w-full rounded-md focus:outline-none focus:outline-primaryB-400"
          rows={4}
          placeholder="✏️우리동네 궁금한 점을 질문 해보세요!"
        />
        <button
          className="mt-2 w-full bg-primaryB-400 hover:bg-primaryB-500 text-white py-2 px-4 border border-transparent
        rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-primaryB-500 focus:outline-none"
        >
          질문하기
        </button>
      </form>
    </Layout>
  );
};

export default Write;
