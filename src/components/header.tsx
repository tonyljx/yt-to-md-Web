"use client";
import toast from "react-hot-toast";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <div className="flex w-full justify-between">
      <p className="text-2xl font-bold">MarkTube</p>
      <div className="link">
        <Button onClick={() => toast.error("To be adding")}>Login</Button>
      </div>
    </div>
  );
}
