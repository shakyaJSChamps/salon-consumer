import React from 'react';
import ContactUs from '@/pages/contact-us/contact-us';
import styles from '../contact-us/contact-us.module.css';

function page() {
  return (
    <div className={styles.contactPage}>
     <ContactUs className={styles.contactInfo}/>
    </div>
  )
}

export default page;
