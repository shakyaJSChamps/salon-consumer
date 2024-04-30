import styles from './offers.module.css'

function Offers() {
  return (
    <div className={styles.container}>
        <div className={styles.offer}>
            <h4>Safety & Hygiene</h4>
            {/* <p>with the code NEW24.<span>T&Cs Apply</span></p> */}
            <p>We adhere to strict hygiene protocols</p>
        </div>
        <div className={styles.offer}>
        <h4>Flexible Scheduling</h4>
            <p>Book appointments at your convenience</p>
        </div>
        <div className={styles.offer}>
        <h4>Expertise & Quality</h4>
            <p>Top-notch services beyond your expectations</p>
        </div>
      
    </div>
  )
}

export default Offers
