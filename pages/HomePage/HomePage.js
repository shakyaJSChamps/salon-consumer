import Banner from '@/components/banner/banner'
import BookAppointment from '@/components/bookAppointment/bookAppointment'
import FindDoorBuddy from '@/components/findDoorBuddy/findDoorBuddy'
import FindSalons from '@/components/findSalons/findSalons'
import Offers from '@/components/offers/offers'
import ServiceMenu from '@/components/serviceMenu/serviceMenu'
import TopSalons from '@/components/topSalons/topSalons'
import TopServices from '@/components/topServices/topServices'

function HomePage() {
  return (
    <div>
      <Offers/>
      <Banner/>
      <ServiceMenu/>
      <FindSalons/>
      <FindDoorBuddy/>
      <BookAppointment/>
      <TopSalons/>
      <TopServices/>
    </div>
  )
}

export default HomePage
