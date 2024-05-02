"use client"
import Link from 'next/link'
import styles from './footer.module.css'
import Image from 'next/image';
import Stylrax from '@/assets/images/stylrax_brand.png'
import AppStore from '@/assets/images/Group.svg'
import GooglePlays from '@/assets/images/Google Play.svg'
import { MdFacebook } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CiLinkedin } from "react-icons/ci";
import { FaYoutube } from "react-icons/fa6";
function Footer() {


  const handleOnSubmit = (e) => {
    e.preventDefault()
    console.log("footer", e.target.value)
  }

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        <div className={styles.footerItem}>
          <Image src={Stylrax} alt='Stylrax_brand' />
          {/* <i className={styles.designs}>Lorem Impsum Sit Dot emet</i> */}
        </div>
        <div className={styles.footerItem}>
          <Link href="">Hair Salon</Link>
          <Link href="">Spa & Wellness</Link>
          <Link href="">Skin Care Services</Link>
          <Link href="">Personal Grooming Services</Link>
          <Link href="">Bridal Services</Link>
          <Link href="">Nail Salon</Link>
        </div>
        <div className={styles.footerItem}>
          <Link href="">Stylrax Skin Care Clinic</Link>
          <Link href="">Stylrax Hair Treatment Clinic</Link>
          <Link href="">Stylrax Anti-Aging Treatment Clinic</Link>
          <Link href="">Stylrax Cosmetic Treatment Clinic</Link>
          <Link href="">Stylrax Clinic</Link>
        </div>
        <div className={styles.footerItem}>
          <Link href="">Pricing</Link>
          <Link href="">Refer a Friend</Link>
          <Link href="">Packages</Link>
          <Link href="">Offers</Link>
          <Link href="">Gift Card</Link>
          <Link href="">Blogs</Link>
        </div>
        <div className={styles.footerItem}>
          <Link href="aboutUs">About Us</Link>
          <Link href="privacyPolicy">Privacy Policy</Link>
          <Link href="termsOfUse">Terms of use</Link>
        </div>

      </div>
      <div className={styles.socialMedia}>
        <div className={styles.socialMediaItems}>
          <p className={styles.social}>Get Social</p>
          <div className={styles.socialIcons}>
            <MdFacebook />
            <FaInstagram />
            <FaXTwitter />
            <CiLinkedin />
            <FaYoutube />
          </div>
        </div>
        <div className={styles.socialMediaItems}>
          <p>Subscribe to Our Newsletter</p>
          <form onSubmit={handleOnSubmit}>
            <input type="text" placeholder='Enter Mobile Number' />
            <button className={styles.formBtn}>Submit</button>
          </form>
        </div>
        <div className={styles.socialMediaItems}>
          <p>Download Our App </p>
          <div className={styles.downloadsLogo}>
            <Image src={AppStore} alt="Apple store" />
            <Image src={GooglePlays} alt="Google play store" />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Footer;