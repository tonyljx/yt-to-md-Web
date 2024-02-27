import React from "react";

type Props = {};

// 定义一个异步函数，使用 setTimeout 和 Promise 来实现延迟
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function Note({}: Props) {
  await delay(2000); // 等待2秒

  return <div>Note 2s</div>;
}
