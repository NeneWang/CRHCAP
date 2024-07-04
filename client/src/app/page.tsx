import { getServerSession } from "next-auth/next";
import { authOptions } from "@/configs/next-auth";
import UserInfo from "@/components/UserInfo";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <main className="flex min-h-screen items-center justify-center">
      {user ? (
        <UserInfo user={user} />
      ) : (
        <div className="flex flex-col justify-center gap-2 p-5 w-fit shadow-lg rounded-lg" style={{minHeight: "25em"}}>
          <h1 className="items-center text-2xl font-bold">
            Crowd Learning Human Capita Innovative
          </h1>
          <p className="flex gap-2"></p>
          <div className="flex justify-between">
            <div>
              <Link href="/about">
                <span className="float-right text-blue-500 cursor-pointer hover:underline ml-4">
                  About
                </span>
              </Link>
            </div>
            <Link href="/signin">
              <span className="text-blue-500 cursor-pointer hover:underline">
                Sign In
              </span>
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
