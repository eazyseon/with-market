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
  const {
    query: { latitude, longitude },
  } = req;

  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
    const parseLatitude = parseFloat(latitude.toString());
    const parseLongitude = parseFloat(longitude.toString());
    const posts = await client.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
        _count: {
          select: {
            answers: true,
            agrees: true,
          },
        },
      },
      where: {
        latitude: {
          gte: parseLatitude - 0.01,
          lte: parseLatitude + 0.01,
        },
        longitude: {
          gte: parseLongitude - 0.01,
          lte: parseLongitude + 0.01,
        },
      },
    });
    res.status(200).json({ message: "success", posts });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create product." });
  }
}
