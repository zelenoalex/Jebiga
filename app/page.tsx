import { getServerSession } from "next-auth";
import NotesContainer from "@/components/notes/NotesContainer";
import Link from "@/components/ui/link";
import H1 from "@/components/ui/h1";


export default async function Home() {
  const session = await getServerSession();


  if (session) {
    return (
      <main className="container grid items-center">
        <NotesContainer session={session} />
      </main>
    );
  }

  return (
    <main className="container grid items-center">
      <div className="text-center space-y-4">
        <H1 title="Wellcome to the Notes App" />
        <section>
          <p>
            To continue using the app
            <Link href="signin">
              {" "}
              <span className="text-primary">signin</span>
            </Link>{" "}
            or{" "}
            <Link href="/register">
              <span className="text-primary">create an account</span>
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
