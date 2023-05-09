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
    const { question, latitude, longitude } = req.body;
    const post = await client.post.create({
      data: {
        question,
        latitude,
        longitude,
        user: {
          connect: {
            id: (session as sessionId).id,
          },
        },
      },
    });
    res.status(200).json({ message: "success", post });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create product." });
  }
}
