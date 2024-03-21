"use client"
import { GiComb } from "react-icons/gi";
import { RiScissors2Line } from "react-icons/ri";
import { DoorBuddyData, Rating, Distance, Category, } from './data';
import Img from '@/assets/images/Rectangle 25156 (2).svg';
import Lists from "@/components/lists/lists";
import doorbuddy from '@/assets/images/doorbuddy.svg'
import { getDoorBuddyLists } from "@/api/account.api";
import { useEffect, useState } from "react";

const DoorBuddyList = () => {
    const [list, setList] = useState([])
    console.log("list=======>", list);
    useEffect(() => {
        async function fetchList() {
            const listData = await getDoorBuddyLists();
            // console.log(list);
            const data = await listData?.data?.data?.items;
            setList(data);

        };
        fetchList();
    }, []);
    return (
        <>
            <Lists
                title="Door Buddy"
                buttonLabel="Set Appointment"
                imageSrc={Img}
                dataList={DoorBuddyData}
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
