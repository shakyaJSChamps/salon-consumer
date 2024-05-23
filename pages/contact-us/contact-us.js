"use client";
import Navbar from "@/components/navbar/navbar";
import StaticPage from "../../components/common/StaticPage";
import Footer from "@/components/footer/footer";
import styles from '../contact-us/contact-us.module.css';

export default function ContactUs() {
  return (
    <>
      <Navbar />
      <StaticPage endpoint="contactUs" className={styles.contactInfo} />
      <Footer />
    </>
  );
}
