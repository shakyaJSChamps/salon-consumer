"use client"
import Banner from '@/components/banner/banner'
import BookAppointment from '@/components/bookAppointment/bookAppointment'
import Offers from '@/components/offers/offers'
import ServiceMenu from '@/components/serviceMenu/serviceMenu'
import TopSalons from '@/components/topSalons/topSalons'
import TopServices from '@/components/topServices/topServices'
import DownloadApp from '@/components/downloadApp/downloadApp'
import Support from '@/components/support/support'
import NearDoorBuddy from '@/components/nearDoorBuddy/nearDoorBuddy'
import NearSalons from '@/components/nearSalons/nearSalons'
import { homePage } from '@/api/account.api'
import { useEffect, useState } from 'react'

function HomePage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await homePage(); 
        const responseData= res.data;
        setData(responseData);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <Offers/>
      <Banner/>
      <ServiceMenu/>
      <NearSalons data={data}/>
      {/* <NearDoorBuddy/> */}
      {/* <BookAppointment/> */}
      <TopServices />
      <TopSalons data={data}/>
      {/* <DownloadApp/> */}
      <Support/>
    </div>
  )
}

export default HomePage
