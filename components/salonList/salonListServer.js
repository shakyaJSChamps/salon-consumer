import { getSalonLists } from "@/api/account.api";
import SalonList from "./salonList";

export async function fetchSalon( latitude, longitude) {
  try {
    const requestUrl =
      latitude !== "" && longitude !== ""
        ? `latitude=${latitude}&longitude=${longitude}`
        : "";
    console.log("requestUrl", requestUrl);
    const responseData = await getSalonLists(requestUrl);
    return responseData?.data?.data?.items || [];
  } catch (error) {
    console.error("Failed to fetch salon lists:", error.message);
    return [];
  }
}
const SalonListServer = async ({
  latitude,
  longitude,
}) => {
  latitude = latitude || "";
  longitude = longitude || "";

  const lists = await fetchSalon(latitude, longitude);

  return (
    <div>
      <SalonList initialLists={lists}  />
    </div>
  );
};

export default SalonListServer;
