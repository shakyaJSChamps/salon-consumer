import { getBanners } from "@/api/account.api";
import Banner from "./banner";
import { cookies } from "next/headers";
async function fetchingBanners(latitude,longitude) {
  try {
    const requestUrl =
    latitude !== "" && longitude !== ""
      ? `latitude=${latitude}&longitude=${longitude}`
      : "";
    const resData = await getBanners(requestUrl);
    return resData.data.data.items || [];
  } catch (error) {
    return [];
  }
}
async function BannerServer(){
  const cookieStore = cookies();
  const latitudeCookie = cookieStore.get("latitude");
  const longitudeCookie = cookieStore.get("longitude");

  const latitude = latitudeCookie?.value || "";
  const longitude = longitudeCookie?.value || "";
  const banners = await fetchingBanners(latitude,longitude);
  return (
    <div>
      <Banner banners={banners} />
    </div>
  );
};

export default BannerServer;
