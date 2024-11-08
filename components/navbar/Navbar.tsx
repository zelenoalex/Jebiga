import { getServerSession } from "next-auth";

import Link from "../ui/link";
import { ThemeToggle } from "./ThemeToggle";
import AccountDropdownMenu from "./AccountDropdownMenu";

const Navbar = async () => {
  const session = await getServerSession();

  return (
    <nav className="py-1 shadow bg-secondary">
      <div className="container flex gap-2 justify-between items-center">
        <Link href="/">Notes</Link>
        <ul className="flex gap-2 justify-between items-center">
          {session ? (
            <li>
              <AccountDropdownMenu />
            </li>
          ) : (
            <>
              <li>
                <Link href="/signin">SignIn</Link>
              </li>
              <li>
                <Link href="/register">Register</Link>
              </li>
              <li>
                <ThemeToggle />
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
