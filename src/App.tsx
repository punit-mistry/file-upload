import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/landing-page/LandingPage";
import Login from "./pages/login/Login";
import { hideNavbarRoutes } from "./lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { RecoilRoot } from "recoil";
const App = () => {
  return (
    <>
      <RecoilRoot>
        <Toaster />
        {/* For Hidding the NavBar */}
        {!hideNavbarRoutes() && <Navbar />}
        <Routes>
          <Route
            path="/"
            element={<LandingPage />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
        </Routes>
      </RecoilRoot>
    </>
  );
};

export default App;
