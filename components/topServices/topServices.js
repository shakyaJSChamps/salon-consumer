'use client'
import { Paper } from "@mui/material";
import styles from "./topServices.module.css";
import Image from "next/image";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signatureServices } from "@/api/account.api";

function TopServices() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const getServices = async () => {
      try {
        const res = await signatureServices();
        setServices(res?.data?.data || []);
      } catch (error) {
        console.log("error===>", error);
      }
    };
    getServices();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.headingContainer}>
        <div className={styles.heading}>Signature Services</div>
        <div className={styles.linkDiv}>
          <Link href={"#"} className={styles.link}>
            View all services
            <ArrowForwardIcon className={styles.arrow} />
          </Link>
        </div>
      </div>
      <div className={styles.content}>
        {services.map((service) => (
          <Paper key={service.id} elevation={3} className={styles.paper}>
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
        ))}
      </div>
    </div>
  );
}

export default TopServices;
