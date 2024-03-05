"use client"
import { GiComb } from "react-icons/gi";
import { RiScissors2Line } from "react-icons/ri";
import { DoorBuddyData, ShopsCategory, Rating, Distance, Category, } from './data';
import Img from '@/assets/images/Rectangle 25156 (2).svg';
import GenericComponent from '@/components/dynamic/generic/genericComponent';

const DoorBuddyLists = () => {
    return (
        <>
            <GenericComponent
                title="Door Buddy"
                buttonLabel="Set Appointment"
                imageSrc={Img}
                dataList={DoorBuddyData}
                Rating={Rating}
                Distance={Distance}
                Category={Category}
                RiScissors2Line={RiScissors2Line}
                GiComb={GiComb}
            />
        </>
    )
}

export default DoorBuddyLists;
