"use client"
import { GoLocation } from "react-icons/go";
import { SalonListData, ShopsCategory, Rating, Distance, Category, } from './data';
import Img from '@/assets/images/salonImage.svg'
import calendraImages from '@/assets/images/Group 1000003690.svg'
import Lists from "../lists/lists";
import { useEffect, useState } from "react";
import axios from "axios";


const SalonList = () => {
    const [salonData, setSalonData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://devapi.stylrax.com/consumer/salons');
                setSalonData(response.data); // Assuming response.data is the list of salons
                console.log("response in salon list", response.data)
            } catch (error) {
                console.error('Error fetching salon data:', error);
                // Handle error, show error message, etc.
            }
        };

        fetchData();
    }, []);
    return (
        <>
            <Lists
                title="Salon"
                buttonLabel="View Details"
                imageSrc={Img}
                dataList={salonData}
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