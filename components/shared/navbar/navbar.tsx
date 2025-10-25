import { auth } from "@/auth";
import MenuButton from "./menu-button";
import NavTitle from "./nav-title";
import UserButton from "./user-button";

export default async function Navbar() {
  const session = await auth();
  console.log("session", session);

  return (
    <nav className="py-1 px-6 h-16 flex items-center justify-between bg-background w-full shadow-sm">
      <MenuButton />
      <NavTitle />
      <UserButton />
    </nav>
  );
}
