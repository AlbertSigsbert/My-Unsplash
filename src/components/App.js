import { BrowserRouter, Routes, Route } from "react-router-dom";

//pages
import Home from "../pages/home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Navbar from "./Layout/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
