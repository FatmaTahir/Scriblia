import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ViewTop from "../components/ViewTop";

const CustomerLayout = () => {
  return (
    <>
      <ViewTop />
      <Navbar />

      <Outlet />

      <Footer />
    </>
  );
};

export default CustomerLayout;