"use client";
import Link from "next/link";
import styles from "./footer.module.css";
import Image from "next/image";
import Stylrax from "@/assets/images/stylrax_brand.png";
import AppStore from "@/assets/images/Group.svg";
import GooglePlays from "@/assets/images/Google Play.svg";
import { MdFacebook } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CiLinkedin } from "react-icons/ci";
import { FaYoutube } from "react-icons/fa6";

function Footer() {
  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("footer", e.target.value);
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.footerLogo}>
        <Link href="/"><Image src={Stylrax} alt="Stylrax_brand" /></Link>
      </div>
      <div className={styles.footerItem}>
        <Link href="/aboutUs" className={styles.footerItemList}>About Us</Link>
        <Link href="/contact-us" className={styles.footerItemList}>Contact Us</Link>
        <Link href="/privacyPolicy" className={styles.footerItemList}>Privacy Policy</Link>
        <Link href="/termsOfUse" className={styles.footerItemList}>Terms of use</Link>
      </div>
    </div>
  );
}

export default Footer;
