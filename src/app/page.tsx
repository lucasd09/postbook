import { api } from "~/trpc/server";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  MoreVertical,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
} from "lucide-react";
import { Skeleton } from "~/components/ui/skeleton";

export default async function Home() {
  const posts = await api.post.getAll();

  return (
    <div className="flex flex-col items-center">
      <div className="mt-16 space-y-4">
        {posts ? (
          posts.map((post) => {
            return (
              <div className="my-2 w-96 space-y-4" key={post.post.id}>
                <div className=" flex w-full items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Avatar className="size-8">
                      <AvatarImage src={post.user?.image} />
                      <AvatarFallback></AvatarFallback>
                    </Avatar>
                    <div>
                      <h1 className="text-xs font-medium">{post.user?.name}</h1>
                    </div>
                  </div>
                  <MoreVertical className="size-4" />
                </div>
                <Skeleton className="h-96 w-full" />
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2">
                    <Heart className="size-4" />
                    <p className="text-sm">{post.post.likes}</p>
                    <MessageCircle className="size-4" />
                    <Send className="size-4" />
                  </div>
                  <Bookmark className="size-4" />
                </div>
                <div className="flex space-x-2">
                  <h1 className="text-xs font-medium">{post.user?.name}</h1>
                  <p className="text-xs ">{post.post.title}</p>
                </div>
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
      <div className="h-16"></div>
    </div>
  );
}
