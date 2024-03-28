import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";

export default async function Navbar() {
  const session = await getServerAuthSession();

  return (
    <nav className="flex items-center justify-center border-b py-4">
      <Link href={"/"}>
        <h1 className="scroll-m-20 font-semibold tracking-tight">Postbook</h1>
      </Link>
      <div className="absolute right-[15%] flex">
        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={session.user.image} />
                <AvatarFallback></AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href={"/profile"}>
                <DropdownMenuItem>Perfil</DropdownMenuItem>
              </Link>
              <Link href={"/settings"}>
                <DropdownMenuItem>Configurações</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <Link href={"/api/auth/signout"}>
                <DropdownMenuItem>Sair</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href={"/api/auth/signin"}>
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}