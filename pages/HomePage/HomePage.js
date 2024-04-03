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

function HomePage() {
  return (
    <div>
      <Offers/>
      <Banner/>
      <ServiceMenu/>
      <NearSalons/>
      <NearDoorBuddy/>
      <BookAppointment/>
      <TopServices/>
      <TopSalons/>
      <DownloadApp/>
      <Support/>
    </div>
  )
}

export default HomePage
