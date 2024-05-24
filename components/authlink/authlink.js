"use client"
import Image from 'next/image';
import Link from 'next/link';
import styles from './authlink.module.css';
import authUser from '@/assets/images/loginUser.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import {
    loginUser,
    logoutUser,
    selectIsLoggedIn,
    selectLocation,
    selectUser,
} from '@/app/Redux/Authslice';
import { CiHeart } from 'react-icons/ci';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { TbLogout } from 'react-icons/tb';
import { FaRegCircleUser } from 'react-icons/fa6';
import { GrNotes } from 'react-icons/gr';
import { FaRegUserCircle } from 'react-icons/fa';

function Authlink() {
    const [menu, setMenu] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state=>state.auth.user);
    const authLinkRef = useRef(null);
    // console.log("user::>",user);

    const userName = user?.name;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (authLinkRef.current && !authLinkRef.current.contains(event.target)) {
                setMenu(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleToggleMenu = () => {
        setMenu(!menu);
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        setMenu(false);
    };

    const handleLinkClick = () => {
        setMenu(false);
    };

    return (
        <div className={styles.authLink} ref={authLinkRef}>
            {!user ? (
                <Link href="/login">
                    <Image src={authUser} width={25} height={25} alt="authUser" />
                    <span>Signin/Signup</span>
                </Link>
            ) : (
                <>
                    <Link href="" onClick={handleToggleMenu}>
                        <Image src={authUser} width={25} height={25} alt="authUser" />
                        <span>{userName}</span>
                    </Link>
                </>
            )}
            {menu && user && (
                <div className={styles.profileMenu}>
                    <Link href="/profile" onClick={handleLinkClick}>
                        <FaRegCircleUser />My Profile
                    </Link>
                    <Link href="/appointment" onClick={handleLinkClick}>
                        <GrNotes />My Appointments
                    </Link>
                    <Link href="/wishList" onClick={handleLinkClick}>
                        <CiHeart />Wishlist
                    </Link>
                    <Link href="/notifications" onClick={handleLinkClick}>
                        <IoMdNotificationsOutline />Notification
                    </Link>
                    <Link href="" onClick={handleLogout}>
                        <TbLogout />Logout
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Authlink;
