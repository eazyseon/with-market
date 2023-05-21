import type { NextPage } from "next";
import Layout from "@/components/layout";
import Button from "@/components/button";
import TextArea from "@/components/textarea";
import Input from "@/components/input";
import { useForm } from "react-hook-form";
import { Product } from "@prisma/client";
import useUploadData from "@/libs/client/useUploadData";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface UploadProductForm {
  name: string;
  place: string;
  price: number;
  people: number;
  description: string;
  photo: FileList;
}

interface UploadProduct {
  message: string;
  product: Product;
}

const Upload: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm<UploadProductForm>();
  const [uploadProduct, { loading, data }] =
    useUploadData<UploadProduct>("/api/products/add");
  const onValid = async ({
    name,
    place,
    price,
    people,
    description,
    photo,
  }: UploadProductForm) => {
    if (loading) return;
    if (photo && photo.length > 0) {
      const { uploadURL } = await (await fetch(`/api/file`)).json();
      const form = new FormData();
      form.append("file", photo[0], "name");
      const {
        result: { id },
      } = await (await fetch(uploadURL, { method: "POST", body: form })).json();
      uploadProduct({
        name,
        place,
        price,
        people,
        description,
        photoId: id,
      });
    }
  };
  useEffect(() => {
    if (data?.message === "success") {
      router.push(`/products/${data.newProduct.id}`);
    }
  }, [data, router]);

  const photo = watch("photo");
  const [photoPreview, setPhotoPreview] = useState("");
  useEffect(() => {
    if (photo && photo.length > 0) {
      const file = photo[0];
      setPhotoPreview(URL.createObjectURL(file));
    }
  }, [photo]);

  return (
    <Layout canGoBack>
      <form className="px-4 py-10" onSubmit={handleSubmit(onValid)}>
        {photoPreview ? (
          <img
            src={photoPreview}
            className="w-full text-gray-600 aspect-video h-46 rounded-md"
          />
        ) : (
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
              <input
                {...register("photo")}
                required
                className="hidden"
                type="file"
                accept="image/*"
              />
            </label>
          </div>
        )}
        <div className="my-5">
          <Input
            register={register("name", { required: true })}
            required
            label="글 제목"
            name="name"
            type="text"
            placeholder="제목을 입력해 주세요"
          />
        </div>
        <div className="my-5">
          <Input
            register={register("place", { required: true })}
            required
            label="장소"
            name="place"
            type="text"
            placeholder="장소를 입력해 주세요"
          />
        </div>
        <div className="my-5">
          <Input
            register={register("price", { required: true })}
            required
            label="가격"
            name="price"
            type="text"
            kind="price"
            placeholder="가격을 입력해 주세요"
          />
        </div>
        <div className="my-5">
          <Input
            register={register("people", { required: true })}
            required
            label="인원"
            id="people"
            type="text"
            placeholder="인원을 입력해 주세요"
          />
        </div>
        <TextArea
          register={register("description", { required: true })}
          required
          name="description"
          label="설명"
          placeholder="글 설명을 입력해 주세요"
        />
        <Button text={loading ? "loading..." : "완료"} />
      </form>
    </Layout>
  );
};

export default Upload;
