import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma"
import bcrypt from 'bcrypt'
import H1 from "@/components/ui/h1";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import OAuthSignIn from "@/components/auth-button/SignIn";

const page = async () => {

  const session = await getServerSession();

  if (session?.user.email) redirect("/");

  const handleForm = async (formData: { get: (arg0: string) => any }) => {
    "use server";
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const hashedPassword = await bcrypt.hash(password, 10);
      try {
        await prisma.user.create({
          data: {
            email,
            name,
            hashedPassword,
          },
        });
        redirect("/signin");
      } catch (error) {
        console.error(error);
      }
    }
  

  return (
       <main className="text-center">
      <H1 title='Wellcome to Notes App! Create your account here' />
      <div className="p-5 shadow max-w-lg mx-auto m-1 bg-card">
        <form action={handleForm} className="space-y-8">
            <Input required type="text" name="name" placeholder="Your Name" />
          <Input required type="email" name="email" placeholder="Your email" />
          <Input
            required
            type="password"
            name="password"
            placeholder="Your password"
          />
          <Button className="w-full" type="submit">
            Register
          </Button>
        </form>
        <h2 className="my-4">or continue with</h2>
        <OAuthSignIn />
      </div>
    </main>
    )
};

export default page;
