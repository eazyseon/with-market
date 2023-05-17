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
    const products = await client.product.findMany({
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
          },
        },
        favs: { select: { userId: true } },
      },
    });
    res.status(200).json({ message: "success", products });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create product." });
  }
}
