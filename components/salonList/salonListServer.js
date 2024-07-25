import { getSalonLists } from "@/api/account.api";
import SalonList from "./salonList";

async function fetchSalonList(page, pageSize) {
  try {
    const responseData = await getSalonLists(page, pageSize);
    return responseData?.data?.data?.items || [];
  } catch (error) {
    console.error("Failed to fetch salon lists:", error.message);
    return [];
  }
}
const SalonListServer = async ({ page = 1, pageSize = 10 }) => {
  const lists = await fetchSalonList(page,pageSize);
  return (
    <div>
      <SalonList initialLists={lists} page={page} pageSize={pageSize}/>
    </div>
  );
};

export default SalonListServer;
