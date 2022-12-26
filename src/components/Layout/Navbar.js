import { NavLink } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import Logo from "../Logo";

function Navbar(props) {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <header className="shadow py-2">
      <nav className="mx-[6%] my-6 flex space-y-4 md:space-y-0 md:flex-row justify-between items-center">
        <NavLink to="/">
          <Logo />
        </NavLink>
        <ul className="flex space-x-6">
          {!user && (
            <>
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
            </>
          )}

          {user && (
            <>
            <li className="font-montserrat text-gray-700 text-base font-semibold">
              Hi, {user.displayName}
            </li>
            <li className="font-montserrat text-gray-700 text-base font-semibold">
              <button onClick={logout}>Logout</button>
            </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
