"use client"
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
import MenuIcon from '@mui/icons-material/Menu';
import { RxCross1 } from "react-icons/rx";
import { useState } from 'react';
import Authlink from '../authlink/authlink';
const navLinks = [
    {
        name: "Top salons",
        url: "/salons",
        imageUrl: salons

    },
    {
        name: "Top services",
        url: "/services",
        imageUrl: services

    },
    {
        name: "Stylrax for Business",
        url: "/business",
        imageUrl: business

    },
]

function Navbar() {
    const [open, setOpen] = useState(false)
    const [active, setActive] = useState(false)
    // const session="unauthenticated";
    function handleClickClose() {
        setOpen(!open);
    }
    const [isOpen, setIsOpen] = useState(false);

   
    return (
        <div className={styles.container}>
            <div className={styles.links}>
                <div className={styles.logo}>
                    <Image src={logo} alt='stylrax' />
                </div>
                <div className={styles.featuredlink}>
                    {navLinks.map((item, index) => (
                        <Link href={item.url}
                            key={index}>
                            <Image src={item.imageUrl} width={25}
                                height={25} alt='salons' />
                            <span>{item.name}</span>
                        </Link>
                    ))}
                   <Authlink/>
                </div>
                <div className={styles.hamburger}
                    onClick={() => { setOpen(!open) }}>
                    <MenuIcon className={styles.MenuIcon} />
                <div className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <RxCross1 className={styles.MenuIcon} /> : <MenuIcon className={styles.MenuIcon} />}
                </div>

            </div>
            <div className={styles.locSearchDiv}>
                <div className={styles.location}>
                    <MyLocationIcon className={styles.icon} />
                    <div className={styles.locationSearch}>
                        <LocationSearch />
                    </div>
                </div>
                <div className={styles.searchDiv}>
                    <SearchIcon className={styles.icon} />
                    <div className={styles.searchInput}>
                        <SearchInput />
                    </div>
                </div>
                <div className={styles.mobilelocation}>
                    <MyLocationIcon onClick={() => setActive(!active)} className={styles.icon} />
                    {active && (<div className={styles.locationSearch}>
                        <LocationSearch />
                    </div>)}
                </div>
                <div className={styles.mobilesearchDiv}>
                    {!active && (<div className={styles.searchInput}>
                        <SearchInput />
                    </div>)}
                    <SearchIcon onClick={() => setActive(!active)} className={styles.icon} />
                </div>
            </div>
            {open && (<div className={styles.mobileMenu}>
                {navLinks.map((item, index) => (
                    <Link href={item.url}
                        key={index}
                        onClick={handleClickClose}>
                        <Image src={item.imageUrl} width={22}
                            height={22} alt='salons' />
                        <span>{item.name}</span>
                    </Link>
                ))}
                <Authlink/>
            </div>)}
</div>

        </div>
    )
}

export default Navbar
