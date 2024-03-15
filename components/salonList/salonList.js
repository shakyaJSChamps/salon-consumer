"use client"
import { GoLocation } from "react-icons/go";
import { SalonListData, ShopsCategory, Rating, Distance, Category, } from './data';
import Img from '@/assets/images/salonImage.svg'
import calendraImages from '@/assets/images/Group 1000003690.svg'
import Lists from "../lists/lists";


const SalonList = async () => {
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