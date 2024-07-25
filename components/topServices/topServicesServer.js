// 'use client'
import { Paper } from "@mui/material";
import styles from "./topServices.module.css";
import Image from "next/image";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import { serviceDetails, signatureServices } from "@/api/account.api";
import Session from "@/service/session";
//import Notify from "@/utils/notify";
import { Skeleton } from "@mui/material";
import TopServicesClient from "./topServices";

// Fetch services on the server side
export async function fetchServices() {
  try {
    const serviceData = await signatureServices();
    return serviceData.data.data;
  } catch (error) {
   // Notify.error(error.message);
    return [];
  }
}

export default async function TopServicesServer() {
  const services = await fetchServices();

  return <TopServicesClient services={services} />;
}
