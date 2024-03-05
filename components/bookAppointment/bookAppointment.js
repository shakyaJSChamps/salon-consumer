import styles from './bookAppointment.module.css'

function BookAppointment() {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <p>This Week Only</p>
        <h3>Get <span>30% OFF</span></h3>
        <h4>Custom Color Service</h4>
        <button className={styles.btn}>BOOK AN APPOINTMENT</button>
      </div>

    </div>
  )
}

export default BookAppointment
