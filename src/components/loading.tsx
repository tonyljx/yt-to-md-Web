import { Loader2 } from "lucide-react";
import React from "react";

type Props = {};

export default function Loading({}: Props) {
  return (
    <div className="animate-spin">
      {" "}
      <Loader2 className="h-8 w-8" />
    </div>
  );
}
