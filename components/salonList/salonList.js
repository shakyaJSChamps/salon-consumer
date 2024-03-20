"use client"
import { GoLocation } from "react-icons/go";
import { SalonListData, ShopsCategory, Rating, Distance, Category, } from './data';
import Img from '@/assets/images/salonImage.svg'
import calendraImages from '@/assets/images/Group 1000003690.svg'
import Lists from "../lists/lists";
import { useEffect, useState } from "react";
import { getSalonLists } from "@/api/account.api";


const SalonList = () => {
    const [lists, setLists] = useState([]);
    useEffect(() => {
        const getSalonList = async () => {
            try {
                const response = await getSalonLists()
                setLists(response?.data?.data?.items); // Assuming response.data is the list of salons

            } catch (error) {
                console.error('Error fetching salon data:', error);
                // Handle error, show error message, etc.
            }
        };
        getSalonList();
    }, []);
    return (
        <>
            <Lists
                title="Salon"
                buttonLabel="View Details"
                imageSrc={Img}
                lists={lists}
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