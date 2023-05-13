import type { NextPage } from "next";
import Layout from "@/components/layout";
import FloatingButton from "@/components/floating-button";
import Item from "@/components/item";
import { useEffect } from "react";
import useGetData from "@/libs/client/useGetData";
import { useSession } from "next-auth/react";

interface getProductData {
  message?: string;
  products: [];
}

const Home: NextPage = () => {
  const { data: session } = useSession();
  const [getProducts, { loading, data }] =
    useGetData<getProductData>("/api/products/get");
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Layout title="HOME" hasTabBar>
      {loading ? (
        <span>로딩중...</span>
      ) : (
        <div className="flex flex-col space-y-5 divide-y">
          {data?.products?.map((product) => (
            <Item
              key={product.id}
              name={product.name}
              place={product.place}
              price={product.price}
              people={product.people}
              id={product.id}
            />
          ))}
          <FloatingButton href="/products/upload">
            <svg
              className="h-6 w-6"
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </FloatingButton>
        </div>
      )}
    </Layout>
  );
};

export default Home;
