import { getSalonLists } from "@/api/account.api";
import SalonList from "./salonList";

export async function fetchSalon(page, pageSize, latitude, longitude) {
  try {
    const requestUrl =
      latitude !== "" && longitude !== ""
        ? `latitude=${latitude}&longitude=${longitude}`
        : "";
    console.log("requestUrl", requestUrl);
    const responseData = await getSalonLists(page, pageSize, requestUrl);
    return responseData?.data?.data?.items || [];
  } catch (error) {
    console.error("Failed to fetch salon lists:", error.message);
    return [];
  }
}
const SalonListServer = async ({
  page = 1,
  pageSize = 10,
  latitude,
  longitude,
}) => {
  latitude = latitude || "";
  longitude = longitude || "";

  const lists = await fetchSalon(page, pageSize, latitude, longitude);
 // console.log("List:", lists);

  return (
    <div>
      <SalonList initialLists={lists} page={page} pageSize={pageSize} />
    </div>
  );
};

export default SalonListServer;
