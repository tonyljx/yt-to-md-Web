import "server-only";
import { prisma } from "./db";

export const getVideo = async (videoId: string) =>
  prisma.video.findFirst({
    where: {
      videoId: videoId,
    },
  });
