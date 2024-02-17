import styles from './offers.module.css'

function Offers() {
  return (
    <div className={styles.container}>
        <div className={styles.offer}>
            <h4>Spend £50 and Save £10</h4>
            <p>with the code NEW24.<span>T&Cs Apply</span></p>
        </div>
        <div className={styles.offer}>
        <h4>Click and Collect within 3 hours</h4>
            <p>Available in over 240 stores <span>Find out more</span></p>
        </div>
        <div className={styles.offer}>
        <h4>Free Next Day Delivery</h4>
            <p>when you spend £30.<span>Find out more</span></p>
        </div>
      
    </div>
  )
}

export default Offers
