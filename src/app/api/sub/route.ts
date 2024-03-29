import { getVideo } from "./../../../server/get-video";
import { z } from "zod";
import { prisma } from "@/server/db";
import { getVideoCnt } from "@/server/get-video-cnt";
const SubtitleSchema = z.object({
  start: z.number(),
  text: z.string(),
});

const SubtitlesSchema = z.array(SubtitleSchema);

function errorRes(message: string) {
  return new Response(JSON.stringify({ error: message }), {
    status: 500,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function fetchSubtitles(videoId: string) {
  const url = `https://subtitles-for-youtube.p.rapidapi.com/subtitles/${videoId}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY!!,
      "X-RapidAPI-Host": process.env.RAPID_API_HOST!!,
    },
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch subtitles: ${response.status} ${response.statusText}`,
    );
  }

  const originalArray = await response.json();
  const parsedArray = SubtitlesSchema.parse(originalArray);

  return parsedArray.map((item) => ({
    start: item.start,
    text: item.text,
  }));
}

export async function GET(request: Request) {
  console.log("get 字幕数据");
  const { searchParams } = new URL(request.url);
  const videoId = searchParams.get("videoId");
  if (!videoId) {
    return errorRes("videoId required");
  }
  const subtitle = await fetchSubtitles(videoId);

  // const subtitles = await fetchSubtitles(videoId);
  const res = await getVideo(videoId);

  return new Response(JSON.stringify({ ...res, subtitle }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(request: Request) {
  // 1 拿到字幕数据
  const { searchParams } = new URL(request.url);
  const videoId = searchParams.get("videoId");
  if (!videoId) {
    return new Response(JSON.stringify({ message: "videoId null" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const requestJson = await request.json();
    const videoCnt = await getVideoCnt(videoId);

    // 2/ 上传json数据
    const chapters = requestJson?.chapters;
    if (videoCnt > 0) {
      await prisma?.video.updateMany({
        where: { videoId: videoId },
        data: { chapters },
      });
      return new Response(JSON.stringify({ message: "videoId exists" }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const data = {
      videoId,
      // subtitle: subtitles,
      chapters,
    };
    let res = await prisma?.video.create({ data });
    const result = {
      ...res,
      message: "success upload",
    };
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return errorRes("error ");
  }
}
