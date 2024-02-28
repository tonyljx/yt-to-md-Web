import "server-only";
import { prisma } from "./db";

export const getVideoCnt = async (videoId: string) =>
  prisma.video.count({
    where: {
      videoId: videoId,
    },
  });
