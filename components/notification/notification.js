'use client';
import React, { useEffect, useState } from 'react';
import styles from './notification.module.css';
import { IoMdNotifications } from "react-icons/io";
import { getUserNotifications } from '@/api/account.api';
import { Skeleton } from '@mui/material';
import Notify from '@/utils/notify';
function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getUserNotifications();
        setNotifications(response?.data?.data || []);
        setLoading(false);
      } catch (error) {
        Notify.error(error.message);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  
  const skeleton = Array.from({ length: 8 }, (_, index) => (
    <div key={index} className={styles.salonDetail}>
       <div className={styles.contentSkeleton}>
            <Skeleton variant="text" width={500} height={33} />
          </div>
          </div>
  ));
  return (
    <div className={styles.mainDiv}>
    <div className={styles.notifications}>
      <div className={styles.notificationsHeader}>
        <h3>Notifications</h3>
      </div>
      {loading ? (
        <div className={styles.loadingSkeletons}>
          {skeleton}
        </div>
      ) : notifications.length === 0 ? (
        <div className={styles.noNotifications}>
          <p>No Notifications</p>

        </div>
      ) : (
        notifications?.map((notification) => (
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
