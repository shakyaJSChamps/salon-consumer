"use client"
import { GoLocation } from "react-icons/go";
import { SalonListData, ShopsCategory, Rating, Distance, Category, } from './data';
import Img from '@/assets/images/salonImage.svg'
import calendraImages from '@/assets/images/Group 1000003690.svg'
import Lists from "../lists/lists";


const SalonList = async () => {
    // try {
    //     const salonResponse = await fetch('https://devapi.stylrax.com/consumer/salons');
    //     if (salonResponse.ok) {
    //         const salonData = await salonResponse.json();

    //         console.log("salon data", salonData)
    //     } else {
    //         console.error('Failed to fetch salon list:', salonResponse.statusText);
    //     }
    // } catch (error) {
    //     console.error('Failed to fetch salon list:', error);
    // }

    return (
        <>
            <Lists
                title="Salon"
                buttonLabel="View Details"
                imageSrc={Img}
                dataList={SalonListData}
                ShopsCategory={ShopsCategory}
                Rating={Rating}
                Distance={Distance}
                Category={Category}
                GoLocation={GoLocation}
                calendraImages={calendraImages}
                detailsLinkBase="/salonlist"
            />
        </>
    )
}

export default SalonList