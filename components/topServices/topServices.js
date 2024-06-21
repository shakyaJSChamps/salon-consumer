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
import { setSalonService } from "@/app/Redux/Authslice";
import { useDispatch } from "react-redux";

function TopServices() {
  const [services, setServices] = useState([]);
  const [serviceDetail, setServiceDetail] = useState([]);
  console.log("vv", serviceDetail);
  const dispatch = useDispatch();

  const router = useRouter();

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

  const handleClick = async (id) => {
    try {
      const res = await serviceDetails(id);
      const detailedService = res?.data?.data || null;
      dispatch(setSalonService(detailedService));
      Session.remove("filteredSalon");
      Session.remove("salonList");
      router.push("/salonlist");
    } catch (error) {
      console.log("error===>", error);
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
        {services.map((service) => (
          <Paper
            key={service.id}
            elevation={3}
            className={styles.paper}
            onClick={() => handleClick(service.id)}
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
        ))}
      </div>
    </div>
  );
}

export default TopServices;
