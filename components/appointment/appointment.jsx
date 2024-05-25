"use client"
import styles from './appointment.module.css'
import SearchIcon from '@mui/icons-material/Search';
import Img from '@/assets/images/1677519626723-82ff21.jpeg.svg';
import Image from 'next/image';
import { HiOutlineLocationMarker } from "react-icons/hi";
import { RxCalendar } from "react-icons/rx";
import { useEffect, useState } from 'react';
import RescheduleAppointment from '../resheduleAppointMent/rescheduleAppointMent';
import Ratings from '../rating&review/rating';
import { ImMenu } from "react-icons/im";
import { ImCross } from "react-icons/im";
import { deleteAppointment, getAppointment } from '@/api/account.api';
import Swal from 'sweetalert2';
import Link from 'next/link';

const Appointments = () => {

    const [appointmentShow, setShowAppointMent] = useState(true)
    const [rescheduleShow, setRescheduleShow] = useState(false)
    const [ratingShow, setRatingShow] = useState(false)
    const [appointments, setAppointments] = useState({
        pending: null,
        past: null
    });
    const [selectedAppointment, setSelectedAppointment] = useState(null); // State to hold the appointment data to be canceled

    const handelShowRescedule = (appointment) => {
        
        setSelectedAppointment(appointment)
        setRescheduleShow(true)
        setShowAppointMent(false)
        setRatingShow(false)
    }
    const handelShowAppointMent = () => {
        setShowAppointMent(true)
        setRescheduleShow(false)
        setRatingShow(false)
    }

    const handelRatingShow = (appointment) => {
        console.log("resh;;;>",appointment)
        setSelectedAppointment(appointment)
        setShowAppointMent(false)
        setRescheduleShow(false)
        setRatingShow(true)
    }

    const [menuVisible, setMenuVisible] = useState(true);
    const [scheduleShowVisible, setShowScheduleVisible] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setShowScheduleVisible(false);
                setMenuVisible(false);
            } else {
                setShowScheduleVisible(true);
                setMenuVisible(true);
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

    const fetchAppointments = async () => {
        try {
            const pending = await getAppointment("pending");
            const completed = await getAppointment("completed");
            const cancelled = await getAppointment("cancelled");

            setAppointments({
                pending: pending?.data?.data,
                past: [...completed?.data?.data, ...cancelled?.data?.data]
            });
        } catch (error) {
            console.log("Error when getting appointments", error);
        }
    }

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleDelete = (appointment) => {
        console.log("Appointment to cancel:", appointment);
        Swal.fire({
            title: "Are you sure?",
            text: "Are you want to cancel this appointment?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "black",
            confirmButtonBorder:"none",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                cancelAppointment(appointment);
            }
        });
    }

    const cancelAppointment=async(appointment)=>{
     try {
        const data={
            type:"cancel",
            cancelReason:"change my plan"
        }
        const res=await deleteAppointment(data,appointment.id)
        console.log("ResAppointmentCancel::>",res)
        fetchAppointments();
     } catch (error) {
        console.log("error to cancel Appointment",error)
     }
    }

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
                        {appointments.pending?.map((data, index) => (
                            <div className={styles.upcomingSchedule} key={index}>
                                <div className={styles.images}>
                                    <Image src={data.salon.mainGateImageUrl} alt="image" height={100} width={100} />
                                </div>
                                <div className={styles.upcomingDetails}>
                                    <h5>{data.salon.name}</h5>
                                    <p><p><RxCalendar /><span>{data.date}</span></p><p><HiOutlineLocationMarker /><span>{data.salon.address}</span></p></p>
                                    <p>Services- {data.services.map((item) => item.serviceName).join(", ")}</p>
                                    <p>Status-<span className={styles.circles}></span>{data.status}</p>
                                </div>
                                <div className={styles.buttons}>
                                    <button onClick={()=> handelShowRescedule(data)}>Re-Schedule</button>
                                    {data.status==="PENDING" && <button onClick={() => handleDelete(data)}>Cancel</button>}
                                </div>
                            </div>
                        ))}
                    </div>

                    <h4 className={styles.title}>Past</h4>
                    <div className={styles.pastScheduleContainer}>
                        {appointments.past?.map((data, index) => (
                            <div className={styles.pastSchedule} key={index}>
                                <div className={styles.images}>
                                    <Image src={data.salon.mainGateImageUrl} alt="image" height={100} width={100} />
                                </div>
                                <div className={`${styles.upcomingDetails} upcomingDetailsPast`}>
                                    <h5>{data.salon.name}</h5>
                                    <p><p><RxCalendar /><span>{data.date}</span></p>
                                        <p><HiOutlineLocationMarker /><span>{data.salon.address}</span></p></p>
                                    <p>Services- {data.services.map((item) => item.serviceName).join(", ")}</p>
                                    <p>
                                        <span className={`${styles.circles} ${data.status==="COMPLETED"?styles.completed:styles.cancelled}`}></span>
                                        {data.status}
                                    </p>
                                </div>
                                <div className={styles.buttonsPast}>
                                    <Link href={`appointment/${data.id}`}><button>View Details</button></Link>
                                    {data.status==="COMPLETED" && <button onClick={()=> handelRatingShow(data)} className={styles.rating}>Rate & Review</button>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {rescheduleShow && (
                <>
                    <RescheduleAppointment appointment={fetchAppointments} selectedAppointment={selectedAppointment} handelShowAppointMent={handelShowAppointMent} />
                </>
            )}
            {
                ratingShow && (
                    <>
                        <Ratings selectedAppointment={selectedAppointment} handelShowAppointMent={handelShowAppointMent} />
                    </>
                )
            }
        </>
    )
}

export default Appointments
