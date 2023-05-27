import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  const { keyword } = req.query;
  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
    const productData = await client.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        name: {
          contains: keyword,
        },
      },
      include: {
        _count: {
          select: {
            favs: true,
            members: true,
          },
        },
        favs: { select: { userId: true } },
      },
    });
    const products = productData.map((data: any) => {
      const memberCount = 1 + data._count.members;
      const isFull = data.people <= memberCount;
      return {
        ...data,
        isFull,
      };
    });

    res.status(200).json({ message: "success", products });
  } catch (error) {
    return res.status(500).json({ message: "Failed to get product data." });
  }
}
