'use client'
import { Paper, Skeleton } from "@mui/material";
import styles from "./viewAllServices.module.css";
import Image from "next/image";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signatureServices } from "@/api/account.api";
import { useRouter } from "next/navigation";

function ViewAllServices() {
  const [services, setServices] = useState([]);
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
const handleClick = ()=>{
router.push('/salonlist');
}

const skeletons = Array.from({ length: 8 }).map((_, index) => (
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
          {/* <Link href='/services' className={styles.link}>
            View all services
            <ArrowForwardIcon className={styles.arrow} />
          </Link> */}
        </div>
      </div>
      <div className={styles.content} onClick={handleClick}>
      {services.length > 0 ? (

        services.map((service,index) => (
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
        ))
      ) : (
        skeletons
      )}
      </div>
    </div>
  );
}

export default ViewAllServices;
