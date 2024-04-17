import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/landing-page/LandingPage";
import Login from "./pages/login/Login";
import { hideNavbarRoutes } from "./lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { RecoilRoot } from "recoil";
import PrivateRoutes from "./PrivateRoutes";
import SignUp from "./pages/sign-up/SignUp";
const App = () => {
  return (
    <>
      <RecoilRoot>
        <Toaster />
        {/* For Hidding the NavBar */}
        {!hideNavbarRoutes() && <Navbar />}
        <Routes>
          <Route
            element={<PrivateRoutes />}
          >
          <Route element={<LandingPage/>} path='/file-upload' />
          </Route>
          <Route 
            path="/"
            element={<Login/>}
          />
          <Route 
            path="/sign-up"
            element={<SignUp/>}
          />
        </Routes>
      </RecoilRoot>
    </>
  );
};

export default App;
