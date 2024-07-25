import ContactUs from '@/internalPages/contactUs/contactUs'
import styles from '@/internalPages/contactUs/contactUs.module.css'

function Page() {
  return (
    <div className={styles.contactPage}>
    <ContactUs className={styles.contactInfo}/>
   </div>
  )
}

export default Page;
