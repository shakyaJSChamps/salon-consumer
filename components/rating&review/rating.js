
import styles from './rating.module.css'
import { IoStarSharp } from "react-icons/io5";

const Ratings = ({ handelShowAppointMent }) => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.ratingContainer}>
                    <h4>Rating</h4>
                    <div className={styles.stars}>
                        <div className={styles.starIcons}><IoStarSharp /></div>
                        <div className={styles.starIcons}><IoStarSharp /></div>
                        <div className={styles.starIcons}><IoStarSharp /></div>
                        <div className={styles.starIcons}><IoStarSharp /></div>
                        <div className={styles.starIcons}><IoStarSharp /></div>


                    </div>
                    <h6>Choose a star to rate</h6>
                    <h5>Your review</h5>
                    <textarea defaultValue={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore'}>

                    </textarea>
                    <button onClick={handelShowAppointMent}>Submit</button>
                </div>
            </div>

        </>
    )
}

export default Ratings