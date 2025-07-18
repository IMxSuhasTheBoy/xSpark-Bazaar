import { caller } from "@/trpc/server";
import { redirect } from "next/navigation";

import { SignInView } from "@/modules/auth/ui/views/sign-in-view";

const Page = async () => {
  const session = await caller.auth.session();

  if (session.user) {
    redirect("/"); // user was already logged in
  }

  return <SignInView />;
};

export default Page;
