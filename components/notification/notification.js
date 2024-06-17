'use client';
import React, { useEffect, useState } from 'react';
import styles from './notification.module.css';
import { IoMdNotifications } from "react-icons/io";
import { getUserNotifications } from '@/api/account.api';

function Notification() {
  const [notifications, setNotifications] = useState({});

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getUserNotifications();
        setNotifications(response?.data?.data);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className={styles.mainDiv}>
      <div className={styles.notifications}>
        <div className={styles.notificationsHeader}>
          <h3>Notifications</h3>
        </div>
        {notifications.length === 0 ? (
          <div className={styles.noNotifications}>
            <p>No Notifications</p>
          </div>
        ) : (
          notifications?.data?.map((notification) => (
            <div key={notification.id} className={styles.notificationItem}>
              <div className={styles.message}>
                <p>
                  <span className={styles.iconWrapper}>
                    <IoMdNotifications className={styles.icon} />
                  </span>
                  {notification.message}
                  <span className={styles.time}>
                    {/* {new Date(notification.time).toLocaleString()} */}
                  </span>
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notification;
