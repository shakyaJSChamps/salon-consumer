import React from "react";
import Offers from "@/components/offers/offers";
import ServiceMenu from "@/components/serviceMenu/serviceMenu";
import TopSalons from "@/components/topSalons/topSalons";
import Support from "@/components/support/support";
import NearSalons from "@/components/nearSalons/nearSalons";
import { homePage } from "@/api/account.api";
//import Notify from "@/utils/notify";
import TopServicesServer from "@/components/topServices/topServicesServer";
import BannerServer from "@/components/banner/bannerServer";
import { cookies } from "next/headers";

async function fetchingData(latitude, longitude) {
  try {
    const requestUrl =
      latitude !== "" && longitude !== ""
        ? `latitude=${latitude}&longitude=${longitude}`
        : "";

     //console.log("Request URL:", requestUrl);
    const resData = await homePage(requestUrl);
    return resData.data.data;
  } catch (error) {
    //Notify.error(error.message);
    return null;
  }
}

async function HomePage() {
  const cookieStore = cookies();
  const latitudeCookie = cookieStore.get("latitude");
  const longitudeCookie = cookieStore.get("longitude");

  const latitude = latitudeCookie?.value || "";
  const longitude = longitudeCookie?.value || "";

  const data = await fetchingData(latitude, longitude);
   console.log("fetch data", data);
  return (
    <div>
      <Offers />
      <BannerServer />
      <ServiceMenu />
      <NearSalons data={data} />
      <TopServicesServer />
      <TopSalons data={data} />
      <Support />
    </div>
  );
}

export default HomePage;
