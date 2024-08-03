import SalonListServer from "@/components/salonList/salonListServer"
import { cookies } from "next/headers";


const SalonLists = () => {
    const cookieStore = cookies();
    const latitudeCookie = cookieStore.get("latitude");
    const longitudeCookie = cookieStore.get("longitude");
    const latitude = latitudeCookie?.value || "";
    const longitude = longitudeCookie?.value || "";
    
    return (
        <>
            <SalonListServer latitude={latitude} longitude={longitude}/>
        </>
    )
}

export default SalonLists