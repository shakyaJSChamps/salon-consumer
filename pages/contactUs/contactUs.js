"use client";
import Navbar from "@/components/navbar/navbar";
import StaticPage from "../../components/common/StaticPage";
import Footer from "@/components/footer/footer";
import styles from './contactUs.module.css';

export default function ContactUs() {
  return (
    <>
      <StaticPage endpoint="contactUs" className={styles.contactInfo} />
    </>
  );
}
