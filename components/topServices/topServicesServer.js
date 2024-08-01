import { signatureServices } from "@/api/account.api";
import TopServicesClient from "./topServices";
import { cookies } from "next/headers";

// Fetch services on the server side
export async function fetchServices(latitude,longitude) {
  try {
    const requestUrl =
    latitude !== "" && longitude !== ""
      ? `latitude=${latitude}&longitude=${longitude}`
      : "";
    const serviceData = await signatureServices(requestUrl);
    return serviceData.data.data;
  } catch (error) {
    return [];
  }
}

export default async function TopServicesServer() {
  const cookieStore = cookies();
  const latitudeCookie = cookieStore.get("latitude");
  const longitudeCookie = cookieStore.get("longitude");

  const latitude = latitudeCookie?.value || "";
  const longitude = longitudeCookie?.value || "";
  const services = await fetchServices(latitude,longitude);
  //console.log('services',services)
  return <TopServicesClient services={services} />;
}
