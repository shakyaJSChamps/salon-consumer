import { getBanners } from "@/api/account.api";
import Banner from "./banner";
//import Notify from "@/utils/notify";
async function fetchingBanners() {
  try {
    const resData = await getBanners();
    return resData.data.data.items || [];
  } catch (error) {
    //Notify.error(error.message);
    return [];
  }
}
const BannerServer = async () => {
  const banners = await fetchingBanners();
  return (
    <div>
      <Banner banners={banners} />
    </div>
  );
};

export default BannerServer;
