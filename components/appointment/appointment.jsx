
import styles from './appointment.module.css'
import SearchIcon from '@mui/icons-material/Search';
import { AppointMentData, PastAppointMentData } from './data';
import Img from '@/assets/images/1677519626723-82ff21.jpeg.svg';
import Image from 'next/image';
import { HiOutlineLocationMarker } from "react-icons/hi";
import { RxCalendar } from "react-icons/rx";
import Link from 'next/link';

const Appointments = () => {
    return (
        <div className={styles.container}>
            <h3 className={styles.titleAppointment}>My Appointments</h3>
            <div className={styles.userInputs}>
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
                        <button>Re-Schedule</button>
                        <button>Cancel</button>
                    </div>
                </div>))}
            </div>


            <h4 className={styles.title}>Past</h4>
            <div className={styles.pastScheduleContainer}>

                {PastAppointMentData.map((data, index) => (<div className={styles.pastSchedule} key={index}>
                    <div className={styles.images}>

                        <Image src={Img} alt="image" height={100} width={100} />
                    </div>
                    <div className={styles.upcomingDetails}>
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
                        <Link href="">Rate & Review</Link>
                    </div>
                </div>))}
            </div>

        </div>
    )
}

export default Appointments