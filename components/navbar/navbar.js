"use client"

import Image from 'next/image';
import styles from './navbar.module.css';
import logo from '@/assets/images/stylrax_brand.png';
import Link from 'next/link';
import salons from "@/assets/images/saloon.svg";
import services from "@/assets/images/services.svg";
import business from "@/assets/images/business.svg";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import LocationSearch from '../locationSearch/locationSearch';
import SearchIcon from '@mui/icons-material/Search';
import SearchInput from '../searchInput/searchInput';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useEffect, useRef } from 'react';
import Authlink from '../authlink/authlink';

const navLinks = [
    {
        name: "Top salons",
        url: "/salons",
        imageUrl: salons,
        target:"_blank"
    },
    {
        name: "Top services",
        url: "/services",
        imageUrl: services,
        target:"_blank"
    },
    {
        name: "Stylrax for Business",
        url: "https://business.stylrax.in/home",
        imageUrl: business,
        target: "_blank" 
    },
];

function Navbar() {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(false);
    const navbarRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navbarRef.current && !navbarRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleClickClose = () => {
        setOpen(!open);
    };

    return (
        <div className={styles.container} ref={navbarRef}>
            <div className={styles.links}>
                <div className={styles.logo}>
                    <Link href="/"> <Image src={logo} alt='stylrax' /></Link>
                </div>
                <div className={styles.featuredlink}>
                    {navLinks.map((item, index) => (
                        <Link href={item.url} key={index} target={item.target}>
                            <Image src={item.imageUrl} width={25} height={25} alt='salons' />
                            <span>{item.name}</span>
                        </Link>
                    ))}
                    <Authlink />
                </div>
                <div className={styles.hamburger} onClick={() => { setOpen(!open) }}>
                    <MenuIcon className={styles.MenuIcon} />
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
                    {/* <SearchIcon className={styles.icon} /> */}
                    <div className={styles.searchInput}>
                        <SearchInput />
                    </div>
                </div>
                <div className={styles.mobilelocation}>
                    <MyLocationIcon onClick={() => setActive(!active)} className={styles.icon} />
                    {active && (
                        <div className={styles.locationSearch}>
                            <LocationSearch />
                        </div>
                    )}
                </div>
                <div className={styles.mobilesearchDiv}>
                    {!active && (
                        <div className={styles.searchInput}>
                            <SearchInput />
                        </div>
                    )}
                    <SearchIcon onClick={() => setActive(!active)} className={styles.icon} />
                </div>
            </div>
            {open && (
                <div className={styles.mobileMenu}>
                    {navLinks.map((item, index) => (
                        <Link href={item.url} key={index} onClick={handleClickClose}>
                            <Image src={item.imageUrl} width={22} height={22} alt='salons' />
                            <span>{item.name}</span>
                        </Link>
                    ))}
                    <Authlink />
                </div>
            )}
        </div>
    )
}

export default Navbar;
