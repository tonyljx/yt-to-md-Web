function errorRes(message: string) {
  return new Response(JSON.stringify({ error: message }), {
    status: 500,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(request: Request) {
  try {
    const requestJson = await request.json();

    // 2/ 上传json数据
    const messgae = requestJson?.chapters;

    return new Response(JSON.stringify("hello"), {
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
