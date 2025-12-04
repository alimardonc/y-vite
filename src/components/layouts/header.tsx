import { Link } from "react-router";
import { NavLink } from "react-router";
import Profile from "../profile-menu";
import Logo from "../../assets/logo";
import Menu from "../menu";

const navs = ["Dashboard", "Courses", "Training", "Profile"];

const Header = () => {
  return (
    <header className="flex items-center justify-between py-2">
      <Menu navs={navs} />
      <Link to={"/dashboard"}>
        <Logo size={60} />
      </Link>
      <nav className="flex gap-5 max-md:hidden">
        {navs.map((e) => (
          <NavLink
            key={e}
            to={"/" + e.toLowerCase()}
            className={({ isActive }) =>
              [
                isActive && "underline text-primary",
                " text-muted-foreground hover:text-primary",
              ].join("")
            }
          >
            {e}
          </NavLink>
        ))}
      </nav>
      <div>
        <Profile />
      </div>
    </header>
  );
};

export default Header;
