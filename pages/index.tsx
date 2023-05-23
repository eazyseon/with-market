import type { NextPage } from "next";
import Layout from "@/components/layout";
import FloatingButton from "@/components/floating-button";
import Item from "@/components/item";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { Product, Fav } from "@prisma/client";

interface productWithFav extends Product {
  favs: Fav;
  _count: {
    favs: number;
    members: number;
  };
  isFull: boolean;
}

interface getProductData {
  message?: string;
  products: productWithFav[];
}

const Home: NextPage = () => {
  const { data: session } = useSession();
  const { data } = useSWR<getProductData>("/api/products/get");
  return (
    <Layout image="/logo.jpg" hasTabBar>
      <div className="flex flex-col space-y-5 divide-y">
        {data?.products?.map((product) => (
          <Item
            id={product.id}
            key={product.id}
            name={product.name}
            place={product.place}
            price={product.price}
            people={product.people}
            image={product.image}
            hearts={product._count.favs}
            member={product._count.members}
            isFull={product.isFull}
            includeUserId={product.favs.some((el) => el.userId === session?.id)}
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
    </Layout>
  );
};

export default Home;
