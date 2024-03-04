import Banner from '@/components/banner/banner'
import BookAppointment from '@/components/bookAppointment/bookAppointment'
import FindDoorBuddy from '@/components/findDoorBuddy/findDoorBuddy'
import FindSalons from '@/components/findSalons/findSalons'
import Offers from '@/components/offers/offers'
import ServiceMenu from '@/components/serviceMenu/serviceMenu'
import TopSalons from '@/components/topSalons/topSalons'
import TopServices from '@/components/topServices/topServices'
import CommonComponent from '@/components/commonComponent/commonComponent'
import DownloadApp from '@/components/downloadApp/downloadApp'
import Support from '@/components/support/support'

function HomePage() {
  return (
    <div>
      <Offers/>
      <Banner/>
      <ServiceMenu/>
      <FindSalons/>
      <FindDoorBuddy/>
      <BookAppointment/>
      <CommonComponent title="Top Services" data={<TopServices/>}/>
      <CommonComponent title="Top Salons" data={<TopSalons/>}/>
      <DownloadApp/>
      <Support/>
    </div>
  )
}

export default HomePage
