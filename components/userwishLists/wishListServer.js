import { getFavouriteSalonList } from "@/api/account.api";
import Notify from "@/utils/notify";
import WishLists from "./wishLists";
export async function fetchingData() {
    try {
      const resData = await getFavouriteSalonList();
    //  console.log("resdata",resData.data.data.items)
      return resData.data.data.items;
    } catch (error) {
      Notify.error(error.message);
      return [];
    }
  }
const WishListServer = async() => {
    const  favouriteSalons = await fetchingData();
   // console.log('wisglist',favouriteSalons)
  return (
    <div>
        <WishLists  favouriteSalons={ favouriteSalons}/>
    </div>
  );
}

export default WishListServer;
