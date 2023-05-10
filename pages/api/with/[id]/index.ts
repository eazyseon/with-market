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
    const post = await client.post.findUnique({
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
        answers: {
          select: {
            answer: true,
            id: true,
            createdAt: true,
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
            answers: true,
          },
        },
      },
    });
    res.status(200).json({ message: "success", post });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create product." });
  }
}
