import { getServerAuthSession } from "~/server/auth";

export default async function Page() {
  const session = await getServerAuthSession();

  if (!session?.user) return null;

  return <div>profile</div>;
}
