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
    query: { id },
  } = req;
  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
    const alreadyExists = await client.member.findFirst({
      where: {
        productId: Number(id),
        userId: (session as sessionId).id,
      },
    });
    if (alreadyExists) {
      await client.member.delete({
        where: {
          id: alreadyExists.id,
        },
      });
    } else {
      await client.member.create({
        data: {
          user: {
            connect: {
              id: (session as sessionId).id,
            },
          },
          product: {
            connect: {
              id: Number(id),
            },
          },
        },
      });
    }
    res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create product." });
  }
}
