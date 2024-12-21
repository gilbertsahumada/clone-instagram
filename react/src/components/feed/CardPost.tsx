import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BookmarkIcon } from "lucide-react";
import ImagePost from "@/components/feed/ImagePost";
import Like from "@/components/feed/Like";

interface PostProps {
  id: string;
  postId: number;
  uri: string;
  description: string;
  owner: string;
}

export default function CardPost({ post }: { post: PostProps }) {
  return (
    <Card
      className="border-0 rounded-lg overflow-hidden max-w-[400px] mx-auto my-6"
      key={post.id}
    >
      <ImagePost uri={post.uri} />
      <CardHeader className="px-4 py-2">
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8 border">
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
          <div className="text-sm font-medium">{post.owner}</div>
        </div>
      </CardHeader>
      <CardContent className="px-4 py-2">
        <p className="text-sm text-muted-foreground">{post.description}</p>
      </CardContent>
      <CardFooter className="px-4 py-2 flex flex-col items-stretch">
        <div className="flex items-center justify-between mb-2">
          <Like postId={post.postId}/>
          <Button variant="ghost" size="icon">
            <BookmarkIcon className="size-6" />
            <span className="sr-only">Save</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
