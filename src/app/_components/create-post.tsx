"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { api } from "~/trpc/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useRef } from "react";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { Plus } from "lucide-react";
import { readFileAsDataURL } from "~/lib/utils";

const schema = z.object({
  title: z.string(),
  image: z.string(),
});

type form = z.infer<typeof schema>;

export function CreatePost() {
  const form = useForm<form>({ resolver: zodResolver(schema) });
  const fileInputRef = useRef(null);
  const router = useRouter();

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      router.refresh();
      form.reset();
    },
  });

  async function handleForm({ title, image }: form) {
    const file = fileInputRef.current.files[0];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const imgUrl = await readFileAsDataURL(file);
    createPost.mutate({ title, image: imgUrl });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"}>
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-2"
            onSubmit={form.handleSubmit(handleForm)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagem</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={createPost.isPending}>
              {createPost.isPending ? "Salvando..." : "Salvar"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
