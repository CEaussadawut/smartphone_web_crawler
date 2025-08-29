import { Label } from "@radix-ui/react-label";
import { Switch } from "@radix-ui/react-switch";
import { Link } from "@tanstack/react-router";
import { Smartphone } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="flex items-center p-8 sticky top-0 z-50 uppercase">
      <Link to="/" className="flex gap-1 items-center text-xl">
        <h1>CEDTPhone</h1>
        <Smartphone />
      </Link>

      <div className="ml-32 flex gap-4">
        <Link to="/" className="underline">
          Home
        </Link>
        <Link to="/about" className="underline">
          About
        </Link>
        <Link to="/export" className="underline">
          Export CSV
        </Link>
      </div>

      <div className="ml-auto">
        <div className="z-50">
          <Switch id="dark-mode" />
          <Label htmlFor="dark-mode">Dark</Label>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
