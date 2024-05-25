import ContactUs from '@/pages/contactUs/contactUs'
import styles from '@/pages/contactUs/contactUs.module.css'

function Page() {
  return (
    <div className={styles.contactPage}>
    <ContactUs className={styles.contactInfo}/>
   </div>
  )
}

export default Page
