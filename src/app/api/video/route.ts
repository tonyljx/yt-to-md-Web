import { errorResponse } from "@/lib/request";

export async function GET(request: Request) {
  // console.log("get 请求");
  const { searchParams } = new URL(request.url);
  const videoId = searchParams.get("videoId");
  if (!videoId) {
    return new Response(JSON.stringify({ error: "videoId null" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // const subtitles = await fetchSubtitles(videoId);
  const res = await fetch(
    // zjkBMFhNj_g
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.GOOGLE_API_KEY}`,
  );
  const json = await res.json();
  if (!res.ok) {
    errorResponse("fail to fetch google video info");
  }

  return new Response(JSON.stringify(json), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
