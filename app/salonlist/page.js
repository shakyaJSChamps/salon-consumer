"use client"
import { SalonListData, ShopsCategory, Rating, Distance, Category } from './data';
import { GoLocation } from "react-icons/go";
import { FaRegCalendarDays } from "react-icons/fa6";
import Img from '@/assets/images/salonImage.svg'
import GenericComponent from '@/components/dynamic/generic/genericComponent';
import { useState } from 'react';

const SalonLists = () => {

    return (
        <>
            <GenericComponent
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

            />
        </>
    )
}

export default SalonLists