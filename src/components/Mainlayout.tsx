import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-black/80 text-white">

      <Navbar />
      <div className="flex-1 overflow-y-auto px-4">
        <Outlet />
        <Footer />
      </div>

    </div>
  );
};

export default MainLayout;
