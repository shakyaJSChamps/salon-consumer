"use client"
import styles from './appointment.module.css'
import SearchIcon from '@mui/icons-material/Search';
import { AppointMentData, PastAppointMentData } from './data';
import Img from '@/assets/images/1677519626723-82ff21.jpeg.svg';
import Image from 'next/image';
import { HiOutlineLocationMarker } from "react-icons/hi";
import { RxCalendar } from "react-icons/rx";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import RescheduleAppointment from '../resheduleAppointMent/rescheduleAppointMent';
import Ratings from '../rating&review/rating';
import { ImMenu } from "react-icons/im";
import { ImCross } from "react-icons/im";

const Appointments = () => {


    const [appointmentShow, setShowAppointMent] = useState(true)
    const [rescheduleShow, setRescheduleShow] = useState(false)
    const [ratingShow, setRatingShow] = useState(false)

    const handelShowRescedule = () => {
        setRescheduleShow(true)
        setShowAppointMent(false)
        setRatingShow(false)
    }
    const handelShowAppointMent = () => {
        setShowAppointMent(true)
        setRescheduleShow(false)
        setRatingShow(false)
    }

    const handelRatingShow = () => {
        setShowAppointMent(false)
        setRescheduleShow(false)
        setRatingShow(true)
    }


    const [menuVisible, setMenuVisible] = useState(false);
    const [scheduleShowVisible, setShowScheduleVisible] = useState(false)


    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setShowScheduleVisible(false);
            } else {
                setShowScheduleVisible(true);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleToggleMenu = () => {
        setMenuVisible(!menuVisible);
    };


    return (
        <>
            {appointmentShow && (
                <div className={styles.container}>
                    <h3 className={styles.titleAppointment}>My Appointments</h3>
                    {menuVisible ? (
                        <ImCross className={styles.humburgerCross} onClick={handleToggleMenu} />
                    ) : (
                        <ImMenu className={styles.humburger} onClick={handleToggleMenu} />
                    )}
                    {(scheduleShowVisible || menuVisible) && (
                        <div className={styles.userInputs} >
                            <div className={styles.userInput}>
                                <input type="text" placeholder='Search' className={styles.searchIcon} /><SearchIcon />
                            </div>
                            <div className={styles.userInput}>
                                <p>Timeline</p>
                                <select className={styles.selects}>
                                    <option value="All">All</option>
                                    <option value="2">Option 2</option>
                                    <option value="3">Option 3</option>
                                    <option value="4">Option 4</option>
                                </select>
                            </div>
                            <div className={styles.userInput}>
                                <p>Status</p>
                                <select className={styles.selects}>
                                    <option value="Status">Completed</option>
                                    <option value="2">Option 2</option>
                                    <option value="3">Option 3</option>
                                    <option value="4">Option 4</option>
                                </select>
                            </div>
                            <div className={styles.userInput}>
                                <p>Type</p>
                                <select className={styles.selects}>
                                    <option value="Type">Haircut</option>
                                    <option value="2">Option 2</option>
                                    <option value="3">Option 3</option>
                                    <option value="4">Option 4</option>
                                </select>
                            </div>
                            <div className={styles.userInput}>
                                <p>Date Range</p>
                                <input type="date" placeholder='Select Date' />
                            </div>
                        </div>
                    )}

                    <h4 className={styles.title}>Upcoming</h4>
                    <div className={styles.upcomingScheduleContainer}>

                        {AppointMentData.map((data, index) => (<div className={styles.upcomingSchedule} key={index}>
                            <div className={styles.images}>

                                <Image src={Img} alt="image" height={100} width={100} />
                            </div>
                            <div className={styles.upcomingDetails}>
                                <h5>{data.title}</h5>
                                <p><p><RxCalendar /><span>{data.date}</span></p><p><HiOutlineLocationMarker /><span>{data.location}</span></p></p>
                                <p>Services- {data.services}</p>
                                <p>Status-<span className={styles.circles}></span>{data.status}</p>
                            </div>
                            <div className={styles.buttons}>
                                <button onClick={handelShowRescedule}>Re-Schedule</button>
                                <button>Cancel</button>
                            </div>
                        </div>))}
                    </div>


                    <h4 className={styles.title}>Past</h4>
                    <div className={styles.pastScheduleContainer}>

                        {PastAppointMentData.map((data, index) => (
                            <div className={styles.pastSchedule} key={index}>
                                <div className={styles.images}>

                                    <Image src={Img} alt="image" height={100} width={100} />
                                </div>
                                <div className={`${styles.upcomingDetails} upcomingDetailsPast`}>
                                    <h5>{data.title}</h5>
                                    <p><p><RxCalendar /><span>{data.date}</span></p>
                                        <p><HiOutlineLocationMarker /><span>{data.location}</span></p></p>
                                    <p>Services- {data.services}</p>
                                    <p>
                                        <span className={`${styles.circles} ${data.status === 'completed' ? styles.completed : styles.cancelled}`}></span>
                                        {data.status === 'completed' ? 'Completed' : 'Cancelled'}
                                    </p>
                                </div>
                                <div className={styles.buttonsPast}>
                                    <button>View Details</button>
                                    <button onClick={handelRatingShow} className={styles.rating}>Rate & Review</button>
                                </div>
                            </div>))}
                    </div>

                </div>
            )}

            {rescheduleShow && (
                <>
                    <RescheduleAppointment handelShowAppointMent={handelShowAppointMent} />
                </>
            )}
            {
                ratingShow && (
                    <>
                        <Ratings handelShowAppointMent={handelShowAppointMent} />
                    </>
                )
            }

        </>
    )
}

export default Appointments