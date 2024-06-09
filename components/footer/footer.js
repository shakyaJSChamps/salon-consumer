"use client";
import Link from "next/link";
import styles from "./footer.module.css";
import Image from "next/image";
import Stylrax from "@/assets/images/stylrax_brand.png";
import playstore from '@/assets/images/img-gplay.svg'
import appstore from '@/assets/images/img-appstore.svg'
function Footer() {

  return (
    <div className={styles.mainDiv}>
      <div className={styles.footerLogo}>
      </div>
      <div className={styles.footerItem}>
      <Link href="/"><Image src={Stylrax} alt="Stylrax_brand" className={styles.footerLogo}/></Link>

        <Link href="/aboutUs" className={styles.footerItemList}>About Us</Link>
        <Link href="/contactUs" className={styles.footerItemList}>Contact Us</Link>
        <Link href="/privacyPolicy" className={styles.footerItemList}>Privacy Policy</Link>
        <Link href="/termsOfUse" className={styles.footerItemList}>Terms of use</Link>
        <div className={styles.iconDiv}>

        <Image src={playstore} alt='playstore' className={styles.gplay} />
          <Image src={appstore} alt='playstore'
            className={styles.appstore} />
      </div>
      
      </div>
    </div>
  );
}

export default Footer;
