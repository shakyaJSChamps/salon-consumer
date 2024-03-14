"use client"
import Image from 'next/image'
import Link from 'next/link'
import authUser from "@/assets/images/loginUser.svg"
import { useDispatch, useSelector } from 'react-redux';
import { use, useEffect, useState } from 'react';
import { loginUser, logoutUser, selectIsLoggedIn, selectLocation, selectUser } from '@/app/Redux/Authslice';
import { CiHeart } from 'react-icons/ci';
import { IoMdNotificationsOutline } from "react-icons/io";
import { TbLogout } from "react-icons/tb";
import { FaRegCircleUser } from "react-icons/fa6";
import { GrNotes } from "react-icons/gr";
import Session from '@/service/session';



function Authlink() {

    const [menu, setMenu] = useState(false)
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    // const location = useSelector(selectLocation)
    // console.log("location auth link", location)  get location from every where

    useEffect(() => {
        const profile = Session.getObject('profile');
        const isLoggedIn = Session.getObject('isLoggedIn');
        if (profile && isLoggedIn) {
            dispatch(loginUser({ data: { profile } }))
        }
    }, []);

    const userName = user && user.name;

    const handleToggleMenu = () => {
        setMenu(!menu);
    };
    const handleLogout = () => {
        dispatch(logoutUser());
        setMenu(false)
    };

    const handleLinkClick = () => {
        setMenu(false);
    };
    return (
        <div className={styles.authLink}>
            {!user ? (<Link href={"/login"}>
                <Image src={authUser} width={25}
                    height={25} alt='authUser' />
                <span>Signin/Signup</span>
            </Link>) : (<>
                <Link href="" onClick={handleToggleMenu}>
                    <Image src={authUser} width={25}
                        height={25} alt='authUser' />
                    <span >{userName}</span>
                </Link>
            </>
            )}
            {menu && user && (
                <div className={styles.profileMenu}>
                    <Link href="" onClick={handleLinkClick}><FaRegCircleUser />My Profile</Link>
                    <Link href="/appointment" onClick={handleLinkClick}><GrNotes />My Appointments</Link>
                    <Link href="" onClick={handleLinkClick}><CiHeart />Wishlist</Link>
                    <Link href="" onClick={handleLinkClick}><IoMdNotificationsOutline />Notification</Link>
                    <Link href="" onClick={handleLogout}><TbLogout />Logout</Link>
                </div>
            )
            }
        </div>
    )
}

export default Authlink
