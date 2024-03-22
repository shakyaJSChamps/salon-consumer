"use client"
import { GiComb } from "react-icons/gi";
import { RiScissors2Line } from "react-icons/ri";
import { DoorBuddyData, Rating, Distance, Category, } from './data';
import Img from '@/assets/images/Rectangle 25156 (2).svg';
import Lists from "@/components/lists/lists";
import doorbuddy from '@/assets/images/doorbuddy.svg'
import { useEffect, useState } from "react";
import { getDoorBuddyList } from "@/api/account.api";

const DoorBuddyList = () => {
    const [lists, setLists] = useState([])
    console.log("list=======>", lists);
    useEffect(() => {
        async function fetchList() {
            try {
                const listData = await getDoorBuddyList();
                // console.log(list);
                const data = await listData?.data?.data?.items;
                setLists(await data);
            } catch (error) {
                console.log(error)
            }

        };
        fetchList();
    }, []);

    return (
        <>
            <Lists
                title="Door Buddy"
                buttonLabel="Set Appointment"
                imageSrc={Img}
                lists={lists}
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
