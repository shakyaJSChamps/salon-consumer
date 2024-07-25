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

async function fetchingData() {
  try {
    const resData = await homePage();
    return resData.data.data;
  } catch (error) {
    //Notify.error(error.message);
    return null;
  }
}

async function HomePage() {
  const data = await fetchingData();
 // console.log("fetch data", data);
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
