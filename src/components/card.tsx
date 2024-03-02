import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const markdown = `Just a link: www.nasa.gov.`;

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
];
// 您想要添加的新属性
type ExtendedCardProps = {
  title?: string;
  desc?: string;
  content: string;
};

type CardProps = React.ComponentProps<typeof Card> & ExtendedCardProps;

export function MyCard({
  className,
  title,
  desc,
  content,
  ...props
}: CardProps) {
  return (
    <Card className={cn("min-w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent className="prose">
        <Markdown>{content}</Markdown>
      </CardContent>
    </Card>
  );
}
