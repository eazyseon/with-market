import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  const {
    query: { id },
  } = req;

  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
    const product = await client.product.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        members: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
        _count: {
          select: {
            members: true,
          },
        },
      },
    });

    const terms = product?.name
      .split(" ")
      .map((word: any) => ({ name: { contains: word } }));
    const relatedProducts = await client.product.findMany({
      where: {
        OR: terms,
        AND: {
          id: {
            not: product?.id,
          },
        },
      },
    });
    const isLiked = Boolean(
      await client.fav.findFirst({
        where: {
          productId: product?.id,
          userId: session?.id,
        },
        select: {
          id: true,
        },
      })
    );
    const memberCount = await client.member.count({
      where: {
        productId: product?.id,
      },
    });
    const isFull = memberCount + 1 === product.people ? true : false;
    res
      .status(200)
      .json({ message: "success", product, relatedProducts, isLiked, isFull });
  } catch (error) {
    return res.status(500).json({ message: "Failed to get product." });
  }
}
