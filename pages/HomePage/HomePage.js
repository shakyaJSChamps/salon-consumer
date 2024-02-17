import Banner from '@/components/banner/banner'
import Offers from '@/components/offers/offers'
import ServiceMenu from '@/components/serviceMenu/serviceMenu'

function HomePage() {
  return (
    <div>
      <Offers/>
      <Banner/>
      <ServiceMenu/>
    </div>
  )
}

export default HomePage
