import { api } from "~/trpc/server";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "~/components/ui/skeleton";

export default async function Home() {
  const posts = await api.post.getAll();
  return (
    <main className="flex flex-col items-center ">
      <div className="my-2 space-y-2  sm:w-full lg:w-96">
        <div className=" flex w-full items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback></AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-sm font-medium">Lucas Dalan</h1>
              <p className="text-xs ">28/03/2024</p>
            </div>
          </div>
          <MoreVertical />
        </div>
        <Skeleton className="h-96 w-full" />
        <div></div>
      </div>
    </main>
  );
}
