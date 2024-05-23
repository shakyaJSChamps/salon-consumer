import styles from './notifications.module.css'

function Notifications() {
    return (
        <div className={styles.mainDiv}>

            <div className={styles.notifications}>
                <div className={styles.notificationsHeader}>
                    <h3>Title</h3>
                </div>
                <div className={styles.message}>
                    <p>Message</p>
                </div>
            </div>
        </div>
    )
}

export default Notifications
