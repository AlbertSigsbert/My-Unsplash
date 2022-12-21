import { Outlet } from "react-router-dom";
import Navbar from "../components/Layout/Navbar";

function RootLayout(props) {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <footer className="mx-auto text-center my-4">
        <p className="text-[14px] font-montserrat font-medium">
          created by <strong className="font-bold">albert</strong>-
          devChallenges.io
        </p>
      </footer>
    </>
  );
}

export default RootLayout;
