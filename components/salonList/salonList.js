"use client"
import { GoLocation } from "react-icons/go";
import { SalonListData, ShopsCategory, Rating, Distance, Category, } from './data';
import Img from '@/assets/images/salonImage.svg'
import calendraImages from '@/assets/images/Group 1000003690.svg'
import Lists from "../lists/lists";
import { useEffect, useState } from "react";

import { getSalonLists } from "@/api/account.api";


const SalonList = () => {
    const [salonData, setSalonData] = useState([]);
    useEffect(() => {
        const getSalonLists = async () => {
            try {
                const response = await getSalonLists()
                setSalonData(response.data); // Assuming response.data is the list of salons
                console.log("response in salon list", response.data)
            } catch (error) {
                console.error('Error fetching salon data:', error);
                // Handle error, show error message, etc.
            }
        };
        getSalonLists();
    }, []);
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