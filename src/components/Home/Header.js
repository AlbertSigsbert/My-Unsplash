import Button from "./Button";
import Search from "./Search";

function Header(props) {
    return (
       <section className="mt-8 mb-16 flex flex-col justify-center items-center space-y-4 md:space-y-0 md:flex-row md:justify-between">
          <Search/>
          <Button/>
       </section>
    );
}

export default Header;