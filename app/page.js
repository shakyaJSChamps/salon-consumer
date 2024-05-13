import styles from "./page.module.css";
import HomePage from "@/pages/HomePage/HomePage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
    <>
      <ToastContainer />
      <HomePage />
    </>
  );
}
