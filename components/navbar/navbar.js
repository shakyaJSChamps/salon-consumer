import Image from 'next/image';
import styles from './navbar.module.css'
import logo from '@/assets/images/logo.svg'
import Link from 'next/link';
import salons from "@/assets/images/saloon.svg"
import services from "@/assets/images/services.svg"
import authUser from "@/assets/images/loginUser.svg"
import business from "@/assets/images/business.svg"
import MyLocationIcon from '@mui/icons-material/MyLocation';
import LocationSearch from '../locationSearch/locationSearch';
import SearchIcon from '@mui/icons-material/Search';
import SearchInput from '../searchInput/searchInput';

function Navbar() {
    return (
        <div className={styles.container}>
            <div className={styles.links}>
                <div className={styles.logo}>
                    <Image src={logo} alt='stylrax' />
                </div>
                <div className={styles.featuredlink}>
                    <Link href="/#">
                        <Image src={salons} width={25}
                            height={25} alt='salons' />
                        <span>Top salons</span>
                    </Link>
                    <Link href="/#">
                        <Image src={services} width={25}
                            height={25} alt='sevices' />
                        <span>Top services</span>
                    </Link>
                    <Link href="/#">
                        <Image src={business} width={25}
                            height={25} alt='sevices' />
                        <span>Stylrax for Business</span>
                    </Link>
                    <Link href="/#">
                        <Image src={authUser} width={25}
                            height={25} alt='authUser' />
                        <span> Sign in/Sign up</span>
                    </Link>

                </div>
            </div>
            <div className={styles.locSearchDiv}>
                <div className={styles.location}>
                    <MyLocationIcon />
                    <LocationSearch />
                </div>
                <div className={styles.searchDiv}>
                    <SearchIcon />
                    <SearchInput />
                </div>

            </div>


        </div>
    )
}

export default Navbar
