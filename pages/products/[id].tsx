import type { NextPage } from "next";
import Layout from "@/components/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

const ItemDetail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState({});
  useEffect(() => {
    if (id) {
      fetch(`/api/products/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setData(data));
    }
  }, [id]);
  return (
    <Layout canGoBack>
      <div className="px-4 py-10">
        <div className="mb-8">
          <div className="h-96 bg-slate-300" />
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
                  {data?.product?.people}
                </span>
              </div>
              <button className="p-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 cursor-pointer">
                <svg
                  className="h-6 w-6 "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
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
            <p className=" my-6 text-gray-700">{data?.product?.description}</p>
          </div>
        </div>
        {data.relatedProducts?.length ? (
          <div>
            <h2 className="text-2xl font-bold text-gray-900">비슷한 상품</h2>
            <div className=" mt-6 grid grid-cols-2 gap-4">
              {data?.relatedProducts?.map((product) => (
                <Link href={`/products/${product.id}`} key={product.id}>
                  <div className="h-56 w-full mb-4 bg-slate-300" />
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
    </Layout>
  );
};

export default ItemDetail;
