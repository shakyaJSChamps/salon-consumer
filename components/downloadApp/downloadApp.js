import Image from 'next/image'
import styles from './downloadApp.module.css'
import mobileImg from '@/assets/images/m.png'
import playstore from '@/assets/images/img-gplay.svg'
import appstore from '@/assets/images/img-appstore.svg'

function DownloadApp() {
  return (
    <div className={styles.container}>
      <div className={styles.mobileImage}>
        <Image src={mobileImg} alt='mobile-Image' />
      </div>
      <div className={styles.downloadContainer}>
        <h3>Make Your Salon Bookings Online</h3>
        <p>Simple, easy and fast. Download the app now!</p>
        <div className={styles.downloadLink}>
          <Image src={playstore} alt='playstore' className={styles.gplay} />
          <Image src={appstore} alt='playstore'
            className={styles.appstore} />
        </div>
      </div>

    </div>
  )
}

export default DownloadApp
