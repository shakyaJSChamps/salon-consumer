import { getDetailPageData } from "@/api/account.api";
import SalonDetails from "./salonDetails";
//import Notify from "@/utils/notify";
async function getSalonData(salonid) {
  try {
    const detailPageData = await getDetailPageData(salonid);
    return detailPageData?.data?.data;
  } catch (error) {
    // Notify.error(error.message);
    return [];
  }
}
const SalonDetailsServer = async ({ salonid }) => {
  const data = await getSalonData(salonid);
  return (
    <div>
      <SalonDetails data={data} salonid={salonid} />
    </div>
  );
};

export default SalonDetailsServer;
