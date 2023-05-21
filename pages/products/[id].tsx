import type { NextPage } from "next";
import Layout from "@/components/layout";
import { useRouter } from "next/router";
import Link from "next/link";
import useUploadData from "@/libs/client/useUploadData";
import { cls } from "@/libs/client/utils";
import { Product, User, Member } from "@prisma/client";
import useSWR from "swr";
import Button from "@/components/button";
import { useSession } from "next-auth/react";

interface productWithUserAndMember extends Product {
  user: User;
  members: Member[];
  _count: {
    members: number;
  };
}

interface ItemDetailResponse {
  message: string;
  product: productWithUserAndMember;
  relatedProducts: Product[];
  isLiked: boolean;
  isFull: boolean;
}

const ItemDetail: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const { data, mutate } = useSWR<ItemDetailResponse>(
    router.query.id ? `/api/products/${router.query.id}` : null
  );
  const [toggleFav] = useUploadData(`/api/products/${id}/fav`);
  const onFavClick = () => {
    toggleFav({});
    if (!data) return;
    mutate({ ...data, isLiked: !data.isLiked }, false);
  };
  const [joinWith] = useUploadData(`/api/products/${id}/member`);
  const onClickWithYouBtn = () => {
    joinWith({});
    const alreadyExist = data.product.members.some(
      (member) => member.user.id === session.id
    );
    if (!data) return;
    if (alreadyExist) {
      mutate(
        {
          ...data,
          product: {
            ...data.product,
            members: [
              ...data.product.members.filter(
                (member) => member.user.id !== session.id
              ),
            ],
            _count: {
              members: data.product._count.members - 1,
            },
          },
          isFull:
            data.product.people === data.product._count.members - 1
              ? true
              : false,
        },
        false
      );
    } else {
      mutate(
        {
          ...data,
          product: {
            ...data.product,
            members: [
              ...data.product.members,
              {
                user: {
                  id: session.id,
                  image: session.user.image,
                  name: session.user.name,
                },
              },
            ],
            _count: {
              members: data.product._count.members + 1,
            },
          },
          isFull:
            data.product.people === data.product._count.members + 2
              ? true
              : false,
        },
        false
      );
    }
  };
  return (
    <Layout canGoBack>
      {!data ? (
        <span>로딩중...</span>
      ) : (
        <div className="px-4 py-10">
          <div className="mb-8">
            <img
              src={`https://imagedelivery.net/KzdrdSk01564feEO2hTHug/${data?.product?.image}/public`}
              className="h-96"
            />
            <div className="flex justify-between py-3 border-t border-b items-center space-x-3">
              <div className="flex items-center">
                <img
                  src={data?.product?.user.image}
                  className="w-12 h-12 rounded-full bg-slate-300 mr-2"
                />
                <p className="text-sm font-medium text-gray-700">
                  {data?.product?.user.name}
                </p>
              </div>
              <div className="flex items-center">
                <div className="p-3 flex items-center space-x-1.5">
                  <span className="text-gray-600 text-lg">WITH</span>
                  <span className="text-primaryB-400 text-lg">
                    {data?.product?._count.members + 1}/{data?.product?.people}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <h1 className="text-3xl font-bold text-gray-900">
                {data?.product?.name}
              </h1>
              <span className="text-md block mt-3 text-gray-900">
                {data?.product?.place}
              </span>
              <span className="text-2xl block mt-3 text-gray-900">
                {data?.product?.price}원
              </span>
              <p className=" my-6 text-gray-700">
                {data?.product?.description}
              </p>
              <div className="flex items-center justify-between space-x-2">
                <Button text="WITH YOU" onClick={onClickWithYouBtn} />
                <button
                  onClick={onFavClick}
                  className={cls(
                    "p-3 rounded-md flex items-center  justify-center",
                    data?.isLiked
                      ? "text-primaryP-400 hover:text-primaryP-500"
                      : "text-gray-400  hover:text-gray-500 hover:bg-gray-100"
                  )}
                >
                  <svg
                    className="h-6 w-6 "
                    xmlns="http://www.w3.org/2000/svg"
                    fill={data?.isLiked ? "#EBA4C6" : "none"}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col space-y-3">
                <span className="text-gray-600 text-lg font-bold mt-2">
                  참여중인 멤버
                </span>
                <div className="flex items-center">
                  <img
                    src={data?.product?.user.image}
                    className="w-12 h-12 rounded-full bg-slate-300 mr-2"
                  />
                  <p className="text-sm font-medium text-gray-700">
                    {data?.product?.user.name}
                  </p>
                </div>
                {data.product.members.map((member) => (
                  <div key={member.user.id} className="flex items-center">
                    <img
                      src={member.user.image}
                      className="w-12 h-12 rounded-full bg-slate-300 mr-2"
                    />
                    <p className="text-sm font-medium text-gray-700">
                      {member.user.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {data?.relatedProducts?.length ? (
            <div>
              <h2 className="text-2xl font-bold text-gray-900">비슷한 상품</h2>
              <div className=" mt-6 grid grid-cols-2 gap-4">
                {data?.relatedProducts?.map((product) => (
                  <Link href={`/products/${product.id}`} key={product.id}>
                    <img
                      src={`https://imagedelivery.net/KzdrdSk01564feEO2hTHug/${product.image}/public`}
                      className="h-56 w-full mb-4"
                    />
                    <h3 className="text-gray-700 -mb-1">{product.name}</h3>
                    <span className="text-sm font-medium text-gray-900">
                      {product.price}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </Layout>
  );
};

export default ItemDetail;
