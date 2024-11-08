import NotFoundMsg from "@/components/messages/NotFoundMsg";
import { Button } from "@/components/ui/button";
import H1 from "@/components/ui/h1";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
const page = async () => {
  const session = await getServerSession();

  if (!session) redirect("/signin");

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user.email,
    },
  });

  if (!user) return <NotFoundMsg error="User is not found" />;

  const updateUser = async (formData: { get: (arg0: string) => any }) => {
    "use server";
    let password = formData.get("password");
    let confirm_password = formData.get("confirm_password");
    if (password === confirm_password) {
      password = await bcrypt.hash(password, 10);
    }
    else{
      password = undefined
      console.log('form passwords do not match')
    }

    try {
      await prisma.user.upsert({
        where: {
          email: session.user.email,
        },
        update: {
          name: formData.get("name") ?? undefined,
          email: formData.get("email") ?? undefined,
          hashedPassword: password ?? undefined
        },
        create: {
          name: formData.get("name") ?? session.user.name,
          email: formData.get("email") ?? session.user.email,
        },
      });
      revalidatePath("/profile");
    } catch (error) {
      console.error("error");
    }
  };
  return (
    <main className="container grid items-center">
      <H1 title="Update profile" />
      <div className="flex flex-wrap gap-4">
        <section className="bg-card shadow p-4 space-y-4">
          <Image src={user.image} width={300} height={300} alt={user.name} />
          <p>Email: {user.email}</p>
          <p>Created at: {user.createdAt.toDateString()}</p>
          <p>Last updated at: {user.updatedAt.toDateString()}</p>
        </section>
        <section className="bg-card shadow p-4 grow">
          <form action={updateUser} className="flex flex-col gap-4">
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="text" name="name" placeholder={user.name} />
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
            />
            <Label htmlFor="confirm_password">Confirm Password</Label>
            <Input
              id="confirm_password"
              type="password"
              name="password"
            />
            <Button className="w-fit">Update Profile</Button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default page;
