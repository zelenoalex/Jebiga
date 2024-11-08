"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export const createNote = async (formData: { get: (arg0: string) => any }) => {
    const session = await getServerSession();
    const userEmail = session?.user.email;
    if (userEmail) {
      const title = formData.get("title");
      const desc = formData.get("desc");
      const noteType = formData.get('noteType')
      const noteState = formData.get('noteState')
      await prisma.notes.create({
        data: {
          title,
          desc,
          type: noteType,
          state: noteState,
          user: {
            connect: {
              email: userEmail,
            },
          },
        },
      });
      revalidatePath("/");
    } else {
    }
  };

  export const updateNote = async (formData: { get: (arg0: string) => any }) => {
    const session = await getServerSession();
    const userEmail = session?.user.email;
    if (userEmail) {
      const id = formData.get("id");
      const title = formData.get("title");
      const desc = formData.get("desc");
      const noteType = formData.get('noteType');
      const noteState = formData.get('noteState');
      await prisma.notes.update({
        where: {
          id: id
        },
        data: {
          title,
          desc,
          type: noteType,
          state: noteState,
          user: {
            connect: {
              email: userEmail,
            },
          },
        },
      });
      revalidatePath(`/${id}`);
    } else {
    }
  };