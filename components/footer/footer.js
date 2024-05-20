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
        <Image src={Stylrax} alt="Stylrax_brand" />
      </div>
      <div className={styles.footerItem}>
        <Link href="aboutUs">About Us</Link>
        <Link href="privacyPolicy">Privacy Policy</Link>
        <Link href="termsOfUse">Terms of use</Link>
      </div>
    </div>
  );
}

export default Footer;
