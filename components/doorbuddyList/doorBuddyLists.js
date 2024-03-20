"use client"
import { GiComb } from "react-icons/gi";
import { RiScissors2Line } from "react-icons/ri";
import { DoorBuddyData, ShopsCategory, Rating, Distance, Category, } from './data';
import Img from '@/assets/images/Rectangle 25156 (2).svg';
import Lists from "@/components/lists/lists";
import doorbuddy from '@/assets/images/doorbuddy.svg'

const DoorBuddyList = () => {
    return (
        <>
            <Lists
                title="Door Buddy"
                buttonLabel="Set Appointment"
                imageSrc={Img}
                lists={DoorBuddyData}
                Rating={Rating}
                Distance={Distance}
                Category={Category}
                RiScissors2Line={RiScissors2Line}
                GiComb={GiComb}
                detailsLinkBase="/doorbuddyList"
                doorBuddyBtn="doorBuddyBtn"
                doorbuddy={doorbuddy}

            />
        </>
    )
}

export default DoorBuddyList;
