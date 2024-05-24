import { getUserNotifications } from '@/api/account.api';
import styles from './notification.module.css';

export async function getServerSideProps(context) {
  console.log('Inside getServerSideProps...');
  try {
    console.log('Fetching notifications...');
    const res = await getUserNotifications();
    console.log('Notifications fetched:', res);
    const notifications = res?.data?.data;
    return {
      props: { notifications },
    };
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return {
      props: { notifications: [] }, // Return an empty array
    };
  }
}

function Notification({ notifications }) {
  console.log("notifications::>", notifications);

  if (!notifications || notifications.length === 0) {
    return <div className={styles.noNotifications}>No notifications available.</div>;
  }

  return (
    <div className={styles.mainDiv}>
      {notifications.map((notification, index) => (
        <div key={index} className={styles.notifications}>
          <div className={styles.notificationsHeader}>
            <h3>{notification.title}</h3>
          </div>
          <div className={styles.message}>
            <p>{notification.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Notification;
