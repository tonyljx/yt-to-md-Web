import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPNEAI_BASE_URL,
});

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
    const messgae = requestJson?.message;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `
          Write a system prompt in English that instructs the AI to do the following tasks:
          1. Convert the content into markdown-friendly format.
          2. Appropriately segment the content, transforming colloquial language into blog-friendly content as much as possible.
          3. If necessary, restructure the headings, with the default heading level starting at h3, at most 3 h3, do not add to much headings
          4. must be markdown-friendly
          5. only return the markdown content, do not return other content
          6. do not return markdown parse success response
          `,
        },
        { role: "user", content: messgae },
      ],
      model: "gpt-3.5-turbo",
    });

    const res = completion.choices[0];

    return new Response(JSON.stringify({ message: res }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return errorRes("error maybe tokens too large, try decrease context");
  }
}
