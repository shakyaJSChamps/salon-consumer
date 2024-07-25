'use client';

import { Paper } from "@mui/material";
import styles from "./topServices.module.css";
import Image from "next/image";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import Session from "@/service/session";
import Notify from "@/utils/notify";
import { Skeleton } from "@mui/material";
import { useRouter } from "next/navigation";
import { serviceDetails } from "@/api/account.api";

export default function TopServicesClient({ services }) {
  const router = useRouter();

  const fetchDetails = async (id) => {
    try {
      const res = await serviceDetails(id);
      const serviceData = res?.data?.data || [];
      Session.setObject("salonService", serviceData);
      Session.remove("filteredSalon");
      Session.remove("salonList");
      Session.remove('selectedBannerSalons');
      router.push("/salonlist");
    } catch (error) {
      Notify.error(error.message);
    }
  };

  // Skeletons to show when services are loading
  const skeletons = Array.from({ length: 5 }).map((_, index) => (
    <Paper key={index} elevation={3} className={styles.paper}>
      <div className={styles.type}>
        <Skeleton variant="text" width={200} />
      </div>
      <Skeleton variant="rectangular" width="100%" height={200} />
    </Paper>
  ));

  return (
    <div className={styles.container}>
      <div className={styles.headingContainer}>
        <div className={styles.heading}>Signature Services</div>
        <div className={styles.linkDiv}>
          <Link href="/services" className={styles.link}>
            View all services
            <ArrowForwardIcon className={styles.arrow} />
          </Link>
        </div>
      </div>
      <div className={styles.content}>
        {services.length === 0 ? (
          skeletons // Display skeletons when services are being fetched
        ) : (
          services.map((service) => (
            <Paper
              key={service.id}
              elevation={3}
              className={styles.paper}
              onClick={() => fetchDetails(service.id)}
            >
              <div className={styles.type}>{service.name}</div>
              <div className={styles.image}>
                <Image
                  src={service.imageUrl}
                  alt={service.name}
                  width={200}
                  height={200}
                />
              </div>
            </Paper>
          ))
        )}
      </div>
    </div>
  );
}
