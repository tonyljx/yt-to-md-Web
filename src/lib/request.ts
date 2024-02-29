export function errorResponse(message: string) {
  return new Response(JSON.stringify(message), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
