import { NavLink } from "react-router-dom";
import Logo from "../Logo";

function Navbar(props) {
  return (
    <header className="mx-[6%] my-6">
      <nav className="flex flex-col space-y-4 md:space-y-0 md:flex-row justify-between">
        <NavLink to="/">
          <Logo />
        </NavLink>
        <ul className="flex space-x-6">
          <NavLink
            to="signup"
            className={({ isActive }) =>
              isActive
                ? "font-montserrat text-gray-900 underline underline-offset-4 text-base font-semibold"
                : "font-montserrat text-gray-700 text-base font-semibold"
            }
          >
            SignUp
          </NavLink>
          <NavLink
            to="login"
            className={({ isActive }) =>
              isActive
                ? "font-montserrat text-gray-900 underline underline-offset-4 text-base font-semibold"
                : "font-montserrat text-gray-700 text-base font-semibold"
            }
          >
            Login
          </NavLink>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
