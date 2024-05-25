"use client"
import Link from 'next/link';
import styles from './userInformation.module.css'
import { CiUser } from "react-icons/ci";
import { BsWallet2 } from "react-icons/bs";
import { IoLogOutOutline } from "react-icons/io5";
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, selectLocation, selectUser } from '@/app/Redux/Authslice';

import { useEffect, useRef, useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { ImMenu } from "react-icons/im";
import { ImCross } from "react-icons/im";

import WishLists from '../userwishLists/wishLists';
import { useRouter } from 'next/navigation';
import UserAddress from './userAddress/userAddress';
import UserProfile from './profile/UserProfile';
import { getFavouriteSalonList } from '@/api/account.api';


const UserInformation = () => {

    const dispatch = useDispatch()
    // State to manage edit mode for each input field

    const router = useRouter();


    const handleLogOut = () => {
        dispatch(logoutUser())
        router.push('/')
    }
    const [showProfileInfo, setShowProfileInfo] = useState(true);
    const [showManageAddress, setShowManageAddress] = useState(false);
    const [showWishLists, setShowWishLists] = useState(false)


    const handleProfileInfoClick = () => {
        setShowProfileInfo(true);
        setShowWishLists(false)
        setShowManageAddress(false);
    };

    const handleManageAddressClick = () => {
        setShowProfileInfo(false);
        setShowProfileInfo(false)
        setShowManageAddress(true);

    };

    const handelWishLists = () => {
        setShowProfileInfo(false);
        setShowManageAddress(false);
        setShowWishLists(true)
    }

    const [menuVisible, setMenuVisible] = useState(false);
    const [profileVisible, setProfileVisible] = useState(true)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuVisible && !event.target.closest(`.${styles.profileMenu}`)) {
                setMenuVisible(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuVisible]);

    const handleToggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleMenuItemClick = () => {
        setMenuVisible(false);
    };


    return (

        <div className={styles.container}>
            <div className={styles.profile}>
                {menuVisible ? (
                    <ImCross className={styles.humburgerCross} onClick={handleToggleMenu} />
                ) : (
                    <> <ImMenu className={styles.humburger} onClick={handleToggleMenu} /><h4 className={styles.accountSetting}>  <CiUser />ACCOUNT SETTINGS</h4></>
                )}
                {(profileVisible || menuVisible) && (
                    <div className={`${styles.profileMenu} ${menuVisible ? styles.visible : ''}`}>

                        <div className={styles.menuItemAccount} onClick={handleMenuItemClick}>
                            <h4 className={styles.account}>  <CiUser />ACCOUNT SETTINGS</h4>
                            <button
                                className={` ${showProfileInfo ? styles.activeLink : styles.profileBtn}`}
                                onClick={handleProfileInfoClick} >
                                Profile Information
                            </button>
                            <button
                                className={`${showManageAddress ? styles.activeLink : styles.profileBtn}`}
                                onClick={handleManageAddressClick}
                            >Manage Addresses</button>
                        </div>

                        {/* <hr /> */}
                        {/* <div className={styles.menuItem} onClick={handleMenuItemClick}>
                            <h4><BsWallet2 />PAYMENTS</h4>
                            <p>Wallet</p>
                            <p>Gift Cards</p>
                            <p>Saved UPI</p>
                            <p>Saved Cards</p>

                        </div> */}
                        <hr />
                        <div className={`${styles.menuItem} ${styles.lastBtn}`} onClick={handleMenuItemClick}>
                            <h4><BsWallet2 />MY STUFF</h4>
                            {/* <p>My Coupons</p> */}
                            {/* <p>My Reviews & Rating</p> */}
                            {/* <p>All Notification</p> */}
                            <p className={` ${showWishLists ? styles.activeLink : styles.profileBtn}`}
                                onClick={handelWishLists}>My Wishlist</p>

                        </div>
                        <hr />
                        <div className={styles.menuItem} onClick={handleMenuItemClick}>
                            <h4 onClick={handleLogOut} className={styles.logout}><IoLogOutOutline />LOGOUT</h4>


                        </div>
                    </div>
                )}
                {showProfileInfo && (
                    <div className={styles.profileInfo}>
                        <UserProfile />
                        <div className={styles.faq}>

                            <h6>FAQs</h6>
                            <p>What happens when I update my email address (or mobile number)? </p>
                            <p> Your login email id (or mobile number) changes, likewise. Youll receive all your account related communication on your updated email address (or mobile number).
                            </p>
                            <p> When will my Stylrax account be updated with the new email address (or mobile number)? </p>
                            <p>It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.</p>

                            <p> What happens to my existing Stylrax account when I update my email address (or mobile number)?</p>
                            <p>  Updating your email address (or mobile number) doesnt invalidate your account. Your account remains fully functional. Youll continue seeing your Order history, saved information and personal details.</p>
                            <p> Does my business account get affected when I update my email address? </p>
                            <p>Stylrax has a single sign-on policy. Any changes will reflect in your Business account also.</p>
                        </div>
                    </div>
                )}


                {showManageAddress && (
                    <UserAddress />

                )}
                {showWishLists && (
                    <WishLists />
                )}
            </div >
        </div >
    )
}

export default UserInformation