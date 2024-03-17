import { Routes, Route } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import LandingPage from "./pages/landing-page/LandingPage";
import Login from "./pages/login/Login";
import { hideNavbarRoutes } from "./lib/utils";
import { Toaster } from "@/components/ui/toaster"
const App = () => {
  return (
    <>
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
    </>
  );
};

export default App;
