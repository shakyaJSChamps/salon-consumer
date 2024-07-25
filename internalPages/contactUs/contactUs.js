import StaticPage from "../../components/common/StaticPage";
import styles from "./contactUs.module.css";

export default function ContactUs() {
  return (
    <>
      <StaticPage endpoint="contactUs" className={styles.contactInfo} />
    </>
  );
}
