import type { NextPage } from "next";
import Layout from "@/components/layout";
import Button from "@/components/button";
import TextArea from "@/components/textarea";
import Input from "@/components/input";

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
          <Input
            label="글 제목"
            id="name"
            type="text"
            placeholder="제목을 입력해 주세요"
          />
        </div>
        <div className="my-5">
          <Input
            label="장소"
            id="place"
            type="text"
            placeholder="장소를 입력해 주세요"
          />
        </div>
        <div className="my-5">
          <Input
            label="가격"
            id="price"
            type="text"
            kind="price"
            placeholder="가격을 입력해 주세요"
          />
        </div>
        <div className="my-5">
          <Input
            label="인원"
            id="people"
            type="text"
            placeholder="인원을 입력해 주세요"
          />
        </div>
        <div>
          <TextArea label="설명" placeholder="글 설명을 입력해 주세요" />
        </div>
        <Button text="완료" />
      </div>
    </Layout>
  );
};

export default Upload;
