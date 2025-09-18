import MenuButton from "./menu-button";
import NavTitle from "./nav-title";
import UserButton from "./user-button";

export default function Navbar() {
  return (
    <nav className="py-1 px-6 flex items-center justify-between bg-background w-full shadow-sm">
      <MenuButton />
      <NavTitle />
      <UserButton />
    </nav>
  );
}
