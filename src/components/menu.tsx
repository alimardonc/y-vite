import { MenuIcon, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router";

const Menu = ({ navs }: { navs: string[] }) => {
  const [open, setOpen] = useState(false);

  const toggleBodyScroll = (disable: boolean) => {
    document.body.style.overflow = disable ? "hidden" : "auto";
  };

  const handleToggle = () => {
    setOpen((prev) => {
      const newState = !prev;
      toggleBodyScroll(newState);
      return newState;
    });
  };

  const handleClose = () => {
    toggleBodyScroll(false);
    setOpen(false);
  };

  return (
    <>
      <Button
        className="hidden max-md:flex z-101"
        size="icon"
        variant="secondary"
        onClick={handleToggle}
      >
        {open ? <X /> : <MenuIcon />}
      </Button>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-all duration-200",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        onClick={handleClose}
      >
        <div
          className={cn(
            "flex flex-col mt-20 pl-5 transition-transform duration-200",
            open ? "animate-in zoom-in-95" : "animate-out zoom-out-90",
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {navs.map((nav) => (
            <NavLink
              key={nav}
              to={nav.toLowerCase()}
              className={({ isActive }) =>
                cn(
                  "py-2 font-bold text-2xl hover:underline",
                  isActive ? "text-primary underline" : "text-muted-foreground",
                )
              }
              onClick={handleClose}
            >
              {nav}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default Menu;
