import prisma from "@/lib/prisma";
import { Session } from "next-auth";
import NotFoundMsg from "../messages/NotFoundMsg";
import H1 from "../ui/h1";
import NoteForm from "./NoteForm";
import Link from "next/link";
import NewNote from "./NewNote";

type NotesContainerProps = {
  session: Session | null;
};

const NotesContainer = async ({ session }: NotesContainerProps) => {
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user.email,
    },
    include: {
      Notes: true,
    },
  });

  if (!user?.id) return <NotFoundMsg error="User is not found!" />;

  return (
    <div>
      <div className="flex justify-between items-center">
        <H1 title="Your Notes" />
        {user?.Notes.length ? <NewNote /> : null}
      </div>
      {user?.Notes.length ? (
        <section>
          {user?.Notes.map((note) => (
            <Link
              className="hover:scale-110 shadow"
              key={note.id}
              href={`/${note.id}`}
            >
              <div className="shadow p-4 bg-card my-2">
                <div className="flex gap-4 justify-start items-center">
                  <div>{note.state}</div>
                  <div>{note.type}</div>
                </div>
                <h2 className="mt-4 lg:text-2xl">{note.title}</h2>
              </div>
            </Link>
          ))}
        </section>
      ) : (
        <section className="space-y-4 bg-card p-4 shadow">
          <h2>No notes found. Create a note.</h2>
          <NoteForm />
        </section>
      )}
    </div>
  );
};

export default NotesContainer;
