import { Button } from "./ui/button";

export default function Header() {
  return (
    <div className="flex w-full justify-between">
      <p className="text-2xl font-bold">VNote</p>
      <div className="link">
        <Button>Login</Button>
      </div>
    </div>
  );
}
