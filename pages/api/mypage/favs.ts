import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Session } from "next-auth/src/core/types";

interface sessionId extends Session {
  id?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
    const productData = await client.fav.findMany({
      where: {
        userId: (session as sessionId).id,
      },
      include: {
        product: {
          include: {
            favs: { select: { userId: true } },
            _count: {
              select: {
                favs: true,
                members: true,
              },
            },
          },
        },
      },
    });
    const products = productData.map((data) => {
      const memberCount = 1 + data.product._count.members;
      const isFull = data.product.people <= memberCount;
      return {
        ...data.product,
        isFull,
      };
    });
    res.status(200).json({ message: "success", products });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create product." });
  }
}
