
"use client"
import { useState } from 'react';
import styles from './reschedule.module.css'
const RescheduleAppointment = ({ handelShowAppointMent }) => {


    const [clickedButtonIndex, setClickedButtonIndex] = useState(0);

    const handleButtonClick = (index) => {
        setClickedButtonIndex(index);
    };


    return (
        <div className={styles.container}>
            <div className={styles.schedule}>

                <div className={styles.reschedule}>
                    <h4>Booking Date</h4>
                    <input type="date" placeholder='14 January 2024' />

                </div>
                <div className={styles.reschedule}>
                    <h4>Select Time Slots</h4>
                    <div className={styles.chooseTime}>
                        {[...Array(5).keys()].map((_, index) => (
                            <button
                                key={index}
                                className={index === clickedButtonIndex ? `${styles.clicked}` : ''}
                                onClick={() => handleButtonClick(index)}
                            >
                                10:00 AM-12:00 AM
                            </button>
                        ))}
                    </div>


                </div>
                <div className={styles.reschedule}>
                    <h4>Add Address</h4>
                    <div className={styles.enterInput}>
                        <input type="text" placeholder='Address' /><br />
                        <input type="text" placeholder='LandMark' /><br />
                        <input type="text" placeholder='PhoneNumber' /><br />
                    </div>

                </div>
                <button onClick={handelShowAppointMent} className={styles.btn}>Re Schedule</button>
            </div>
        </div>
    )
}

export default RescheduleAppointment