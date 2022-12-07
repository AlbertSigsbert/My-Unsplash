import Button from "./Button";
import SideNav from "./SideNav";


function Header(props) {
    return (
       <nav className="mt-8 flex flex-col space-y-4 md:space-y-0 md:flex-row justify-between">
          <SideNav/>
          <Button/>
       </nav>
    );
}

export default Header;