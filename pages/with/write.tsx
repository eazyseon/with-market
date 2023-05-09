import type { NextPage } from "next";
import Layout from "@/components/layout";
import Button from "@/components/button";
import TextArea from "@/components/textarea";
import { useForm } from "react-hook-form";
import useUploadData from "@/libs/client/useUploadData";
import useCoords from "@/libs/client/useCoords";
import { Post } from "@prisma/client";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface WriteForm {
  question: string;
}
interface WriteResponse {
  message: string;
  post: Post;
}

const Write: NextPage = () => {
  const router = useRouter();
  const { latitude, longitude } = useCoords();
  const { register, handleSubmit } = useForm<WriteForm>();
  const [uploadPost, { loading, data }] =
    useUploadData<WriteResponse>("/api/with/add");
  const onValid = (data: WriteForm) => {
    if (loading) return;
    uploadPost({ ...data, latitude, longitude });
  };
  useEffect(() => {
    if (data && data.message === "success") {
      router.push("/with");
    }
  }, [data, router]);
  return (
    <Layout canGoBack>
      <form className="px-4 py-10" onSubmit={handleSubmit(onValid)}>
        <TextArea
          register={register("question", { required: true })}
          name="question"
          required
          placeholder="✏️우리동네 궁금한 점을 질문 해보세요!"
        />
        <Button text={loading ? "loading..." : "질문하기"} />
      </form>
    </Layout>
  );
};

export default Write;
