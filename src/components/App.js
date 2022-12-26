import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";

//pages
import Home from "../pages/home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

//layouts
import RootLayout from "../layouts/RootLayout";
import NotFound from "../pages/NotFound";

import { useAuthContext } from "../hooks/useAuthContext";


function App() {
  const { authIsReady, user } = useAuthContext();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={ user ? <Home/>: <Navigate to="login"/> } />
        <Route path="signup" element={!user ? <Signup /> : <Navigate to="/"/>} />
        <Route path="login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  

  return <>{authIsReady && <RouterProvider router={router} />}</>;
}

export default App;
