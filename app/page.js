import styles from "./page.module.css";
import HomePage from "@/pages/HomePage/HomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <HomePage />
      {/* <Footer /> */}
      <ToastContainer />
    </>
  );
}
