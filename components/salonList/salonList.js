"use client"
import { GoLocation } from "react-icons/go";
import { FaRegCalendarDays } from "react-icons/fa6";
import { SalonListData, ShopsCategory, Rating, Distance, Category, } from './data';
import Img from '@/assets/images/salonImage.svg'
import Lists from "../lists/lists";

const SalonList = () => {

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
                FaRegCalendarDays={FaRegCalendarDays}
                detailsLinkBase="/salonlist"
            />
        </>
    )
}

export default SalonList