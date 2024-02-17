import Image from 'next/image'
import styles from './serviceMenu.module.css'
import facials from '@/assets/images/facials.svg'
import nails from '@/assets/images/nails.svg'
import eyelashes from '@/assets/images/eyelashes.svg'
import eyebrow from '@/assets/images/eyebrow.svg'
import makeup from '@/assets/images/make-up.svg'
import waxing from '@/assets/images/waxing.svg'

function ServiceMenu() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.title}>
                    <h2>Our Secret Place of Lorem</h2>
                </div>
                <div className={styles.description}>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore <br /> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore <br />lorem ipsum.
                    </p>
                </div>
                <div className={styles.serviceIcons}>
                    <div className={styles.imgDiv}>
                        <Image src={facials} alt='facials' width={90} height={90} />
                        <Image src={eyelashes} alt='facials' width={90} height={90} />
                        <Image src={eyebrow} alt='facials' width={90} height={90} />
                    </div>
                    <div className={styles.imgDiv}>
                        <Image src={waxing} alt='facials' width={90} height={90} />
                        <Image src={nails} alt='facials' width={90} height={90} />
                        <Image src={makeup} alt='facials' width={90} height={90} />
                    </div>
                </div>
                <button className={styles.btn}>VIEW MORE MENU</button>
            </div>
            <div className={styles.offers}>
                <div className={styles.haircutDiv}>
                    <h1>Lorem ipsum <br />
                        <span>Flat 20% OFF</span>
                    </h1>
                    <p>Haircut for Men</p>
                </div>
                <div className={styles.otherOffers}>
                    <div className={styles.massageDiv}>
                        <h2>Relax Youself With <br /><span>lorem Ipsum</span></h2>
                        <p>Massage for Men</p>

                    </div>
                    <div className={styles.facialsDiv}>
                        <h2>Relax Youself With <br /><span>lorem Ipsum</span></h2>
                        <p>Facials for Men</p>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ServiceMenu
