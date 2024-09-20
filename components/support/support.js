import Image from 'next/image';
import styles from './support.module.css'
import cards from '@/assets/images/img-cards.svg'

function Support() {
    return (
        <div className={styles.container}>
            <div className={styles.payment}>
                <p>Payment Options</p>
                <div className={styles.paymentOption}>
                    <Image src={cards} alt='cards' className={styles.image}/>
                </div>

            </div>
            {/* <div className={styles.partners}>
                <p>Partner With Us</p>
                <div className={styles.partner}>
                    <WorkIcon/>
                    <span>Register as a professional</span>
                </div>

            </div> */}

        </div>
    )
}

export default Support
