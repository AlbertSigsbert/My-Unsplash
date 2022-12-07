import Logo from "./Logo";
import Search from "./Search";


function SideNav(props) {
    return (
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0  items-center md:mx-4">
          <Logo/>
          <Search/>  
        </div>
    );
}

export default SideNav;