
import styles from './rating.module.css'

const Ratings = ({ handelShowAppointMent }) => {
    return (
        <>
            <h1>Rating</h1>
            <button onClick={handelShowAppointMent}>Appointment go</button>
        </>
    )
}

export default Ratings