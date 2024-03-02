"use client";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex w-full items-center justify-between bg-white px-4 py-2 shadow-md md:px-8 md:py-6">
      <Link
        href="/"
        className="text-2xl font-bold text-blue-600 hover:text-blue-800"
      >
        MarkTube
      </Link>
      <div className="flex items-center space-x-4">
        <Link
          href="/blogs"
          className="text-lg text-gray-700 hover:text-gray-900"
        >
          Blog
        </Link>
        <Button onClick={() => toast.error("To be adding")}>Login</Button>
      </div>
    </div>
  );
}
