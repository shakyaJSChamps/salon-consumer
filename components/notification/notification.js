"use client";
import React, { useEffect, useState } from "react";
import styles from "./notification.module.css";
import { getUserNotifications } from "@/api/account.api";
import { Skeleton } from "@mui/material";
import Notify from "@/utils/notify";
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

  function formatDateTime(timestamp) {
    const date = new Date(timestamp);

    // IST is UTC + 5:30
    const offsetIST = 5 * 60 + 30;
    const localDate = new Date(date.getTime() + offsetIST * 60 * 1000);

    const day = String(localDate.getUTCDate()).padStart(2, "0");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[localDate.getUTCMonth()];
    const year = localDate.getUTCFullYear();

    let hours = localDate.getUTCHours();
    const minutes = String(localDate.getUTCMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;

    const formattedDateTime = `${day} ${month} ${year} ${hours}:${minutes} ${ampm}`;
    return formattedDateTime;
  }

  const skeleton = Array.from({ length: 8 }, (_, index) => (
    <div key={index} className={styles.salonDetail}>
      <div>
        <Skeleton
          variant="text"
          width={560}
          height={33}
          className={styles.contentSkeleton}
        />
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
          <div className={styles.loadingSkeletons}>{skeleton}</div>
        ) : notifications.length === 0 ? (
          <div className={styles.noNotifications}>
            <p>No Notifications</p>
          </div>
        ) : (
          notifications?.map((notification) => (
            <div key={notification.id} className={styles.notificationItem}>
              <div className={styles.title}>
                <h3>{notification.title}</h3>
              </div>
              <div className={styles.message}>
                <p>{notification.message}</p>
              </div>
              <div className={styles.time}>
                <p>{formatDateTime(notification.created_at)}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notification;
