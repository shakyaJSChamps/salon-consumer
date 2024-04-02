"use client"
import Link from 'next/link';
import styles from './userprofile.module.css'
import { CiUser } from "react-icons/ci";
import { BsWallet2 } from "react-icons/bs";
import { IoLogOutOutline } from "react-icons/io5";
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, selectLocation, selectUser } from '@/app/Redux/Authslice';
import Img from '@/assets/images/salonImage.svg'
import { useEffect, useRef, useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { ImMenu } from "react-icons/im";
import { ImCross } from "react-icons/im";

import WishLists from '../userwishLists/wishLists';
import { useRouter } from 'next/navigation';


const UserProfie = () => {
    const userInfo = useSelector(selectUser)
    console.log("user info", userInfo)
    const cityDetails = useSelector(selectLocation)
    console.log("city d", cityDetails)

    const dispatch = useDispatch()
    // State to manage edit mode for each input field
    const [editModes, setEditModes] = useState({
        firstName: false,
        lastName: false,
        email: false,
        gender: false,
        address: false,
        phoneNumber: false,
        city: false
    });
    const router = useRouter();
    // Function to toggle edit mode for a specific input field
    const handleEditClick = (field) => {
        setEditModes(prevState => ({
            ...prevState,
            [field]: !prevState[field]
        }));
    };
    const handleEditNameClick = () => {
        setEditModes(prevState => ({
            ...prevState,
            firstName: !prevState.firstName,
            lastName: !prevState.lastName
        }));
    };


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
                        <div className={styles.menuItem} onClick={handleMenuItemClick}>
                            <h4><BsWallet2 />PAYMENTS</h4>
                            <p>Wallet</p>
                            <p>Gift Cards</p>
                            <p>Saved UPI</p>
                            <p>Saved Cards</p>

                        </div>
                        <hr />
                        <div className={`${styles.menuItem} ${styles.lastBtn}`} onClick={handleMenuItemClick}>
                            <h4><BsWallet2 />MY STUFF</h4>
                            <p>My Coupons</p>
                            <p>My Reviews & Rating</p>
                            <p>All Notification</p>
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
                        <div className={styles.profileDetails}>
                            {/* <Image src={userInfo?.profileImageUrl} width={50} height={50} alt='user profile' /> */}
                            <Image src={Img} alt='user profile' />

                            <form className={styles.form}>
                                <div className={styles.details}>
                                    <div className={styles.name}>
                                        <label className={styles.label}>First Name</label>
                                        <input type="text"
                                            placeholder={userInfo?.name?.split(' ')[0]}
                                            disabled={!editModes.firstName} />
                                    </div>
                                    <div className={styles.name}>
                                        <labe className={styles.label}>Last Name</labe>
                                        <input type="text" placeholder={userInfo?.name?.split(' ').slice(-1)[0]} disabled={!editModes.lastName} />
                                    </div>
                                    <span className={styles.edits} onClick={handleEditNameClick}>  {editModes.firstName || editModes.lastName ? (
                                        <span className={styles.saves}>SAVE</span>

                                    ) : (
                                        "Edit"
                                    )}</span>
                                </div>

                                <div className={styles.otherDetails}>
                                    <labe className={styles.label}>Email</labe>
                                    <input type="text" placeholder={userInfo?.email} className={styles.emailc} disabled={!editModes.email} />
                                    <span
                                        className={`${styles.edits} ${editModes.email ? styles.save : ""}`}
                                        onClick={() => handleEditClick('email')}
                                    >
                                        {editModes.email ? (
                                            <span className={styles.saves}>SAVE</span>

                                        ) : (
                                            "Edit"
                                        )}
                                    </span>
                                </div>
                                <div className={styles.details}>
                                    <div className={styles.info}>
                                        <labe className={styles.label}>Gender</labe>
                                        <select value={userInfo?.gender} className={styles.select} disabled={!editModes.gender} >
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                        <span className={styles.editsGender} onClick={() => handleEditClick('gender')}>
                                            {editModes.gender ? (
                                                <span className={styles.saves}>SAVE</span>

                                            ) : (
                                                "Edit"
                                            )}
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.otherDetails}>
                                    <labe className={styles.label}>Address</labe>
                                    <input type="text" placeholder={userInfo?.address} className={styles.address} disabled={!editModes.address} />
                                    <span className={styles.edits} onClick={() => handleEditClick('address')}> {editModes.address ? (
                                        <span className={styles.saves}>SAVE</span>

                                    ) : (
                                        "Edit"
                                    )}</span>

                                </div>
                                <div className={styles.details}>
                                    <div className={styles.infoNumber}>
                                        <labe className={styles.label}>Contact Number</labe>
                                        <input type="text" placeholder={userInfo?.phoneNumber} disabled={!editModes.phoneNumber} className={styles.number} />
                                        <span className={styles.editsNumber} onClick={() => handleEditClick('phoneNumber')}> {editModes.phoneNumber ? (
                                            <span className={styles.saves}>SAVE</span>

                                        ) : (
                                            "Edit"
                                        )}</span></div>

                                </div>
                                <div className={styles.details}>
                                    <div className={styles.info}>
                                        <labe className={styles.label}>City</labe>
                                        <input type="text" placeholder={cityDetails} disabled={!editModes.city} />
                                        <span className={styles.editsGender} onClick={() => handleEditClick('city')}> {editModes.city ? (
                                            <span className={styles.saves}>SAVE</span>

                                        ) : (
                                            "Edit"
                                        )}</span>
                                    </div>


                                </div>

                            </form>
                        </div>
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
                    <div className={styles.manageAddress}>
                        <div className={styles.manageDetails}>
                            <h5>Manage Addresses</h5>
                            <button><IoMdAdd />ADD A NEW ADDRESS</button>
                            <div className={styles.addressDetails}>
                                <button className={styles.home}>HOME</button>
                                <HiOutlineDotsVertical className={styles.dotted} />
                                <p>City:{cityDetails}</p>
                                <p>State/province/area:{cityDetails}</p>
                                <p>{cityDetails}</p>
                            </div>
                        </div>
                    </div>

                )}
                {showWishLists && (
                    <WishLists />
                )}
            </div >
        </div >
    )
}

export default UserProfie