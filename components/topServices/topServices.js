"use client";
import { Paper } from "@mui/material";
import styles from "./topServices.module.css";
import Image from "next/image";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import { useEffect, useState } from "react";
import { serviceDetails, signatureServices } from "@/api/account.api";
import { useRouter } from "next/navigation";
import Session from "@/service/session";
import Notify from "@/utils/notify";
function TopServices() {
  const [services, setServices] = useState([]);
  const [serviceDetail, setServiceDetail] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getServices = async () => {
      try {
        const res = await signatureServices();
        setServices(res?.data?.data || []);
      } catch (error) {
        Notify.error(error.message);
      }
    };
    getServices();
  }, []);

  const fetchDetails = async (id) => {
    try {
      const res = await serviceDetails(id);
      const serviceData = res?.data?.data || [];
      setServiceDetail(serviceData);
      // dispatch(setSalonService(serviceData));
      Session.setObject("salonService", serviceData);
      Session.remove("filteredSalon");
      Session.remove("salonList");
      Session.remove('selectedBannerSalons');

      router.push("/salonlist");
    } catch (error) {
      Notify.error(error.message);
    }
  };

  const handleServiceClick = (id) => {
    setSelectedServiceId(id === selectedServiceId ? null : id); // Toggle selected service
    if (id !== selectedServiceId) {
      fetchDetails(id);
    }
  };

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
        {services.map((service,index) => (
          <Paper
            key={service.id}
            elevation={3}
            className={styles.paper}
            onClick={() => handleServiceClick(service.id)}
          >
            <div className={styles.type}>{service.name}</div>
            <div className={styles.image}>
              <Image
                src={service.imageUrl}
                alt={service.name}
                width={200}
                height={200}
              />
              {/* {index === services.length - 1 && (
              <ArrowForwardIcon className={styles.lastPaperArrow} />
            )} */}
            </div>
            
          </Paper>
        ))}
      </div>
    </div>
  );
}

export default TopServices;
