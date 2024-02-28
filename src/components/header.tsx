"use client";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex w-full justify-between">
      <Link className="text-2xl font-bold" href="/">
        MarkTube
      </Link>
      <div className="link">
        <Button onClick={() => toast.error("To be adding")}>Login</Button>
      </div>
    </div>
  );
}
