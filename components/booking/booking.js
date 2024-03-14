"use client"
import styles from './booking.module.css'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Image from 'next/image';
import haircut from '@/assets/images/haircolorMen.svg'
// import { useState } from 'react';
import { useRouter } from 'next/navigation';


function Booking() {
     // const [service,setService]=useState("")
  const router=useRouter();
  // function handleSetService(){
  //   if(service==="salon"){
  //     setService("salon");
  //   }
  //   setService("home-service");
  // }
  function handleBooking(){
      router.push('salon/payment')
  }
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.serviceType}>
          <h3>Grooming Essentials</h3>
          <div className={styles.price}>
            <div className={styles.count}>
              <RemoveIcon className={styles.countIcon} />
              <span>1</span>
              <AddIcon className={styles.countIcon} />
            </div>
            <div className={styles.price}>₹499</div>
          </div>
        </div>
        <div className={styles.serviceList}>
          <ul>
            <li>Haircut for men x1 </li>
            <li>10 min Relaxing Head massage x1</li>
            <li> Beard trimming & styling x1</li>
          </ul>
          <button>Edit items</button>
        </div>
        <div className={styles.frequentAdd}>
          <h3>Frequently Added Together</h3>
          <div className={styles.itemContainer}>
            <div className={styles.item}>
              <p>Hair Color <br /> (only application)</p>
              <span>199</span>
            </div>
            <div className={styles.image}>
              <Image src={haircut} alt='haircut-image' />
              <button className={styles.addBtn}>Add</button>
            </div>
          </div>
        </div>
        <div className={styles.specialistContainer}>
          <h3>Select Specialist</h3>
          <div className={styles.specialists}>
            <div className={styles.specialist}>
              <Image src={haircut} alt='haircut-image' />
              <div className={styles.choice}>
                <h4>AnyOne</h4>
                <p>Default</p>
              </div>

            </div>
            <div className={styles.specialist}>
              <Image src={haircut} alt='haircut-image' />
              <div className={styles.choice}>
                <h4>AnyOne</h4>
                <p>Default</p>
              </div>

            </div>
            <div className={styles.specialist}>
              <Image src={haircut} alt='haircut-image' />
              <div className={styles.choice}>
                <h4>AnyOne</h4>
                <p>Default</p>
              </div>

            </div>
            <div className={styles.specialist}>
              <Image src={haircut} alt='haircut-image' />
              <div className={styles.choice}>
                <h4>AnyOne</h4>
                <p>Default</p>
              </div>

            </div>
            <div className={styles.specialist}>
              <Image src={haircut} alt='haircut-image' />
              <div className={styles.choice}>
                <h4>AnyOne</h4>
                <p>Default</p>
              </div>

            </div>
            <div className={styles.specialist}>
              <Image src={haircut} alt='haircut-image' />
              <div className={styles.choice}>
                <h4>AnyOne</h4>
                <p>Default</p>
              </div>

            </div>

          </div>
        </div>
        <div className={styles.bookingDate}>
          <h3>Booking Date</h3>
          <div className={styles.dateContainer}>
            <input type='date' />
          </div>
        </div>
        <div className={styles.timeslotContainer}>
          <h3>Select Time Slots</h3>
          <div className={styles.timeslot}>
            <div className={styles.paper}>
              <p>10:00 AM-10:00 AM</p>
            </div>
            <div className={styles.paper}>
              <p>10:00 AM-10:00 AM</p>
            </div>
            <div className={styles.paper}>
              <p>10:00 AM-10:00 AM</p>
            </div>
            <div className={styles.paper}>
              <p>10:00 AM-10:00 AM</p>
            </div>
            <div className={styles.paper}>
              <p>10:00 AM-10:00 AM</p>
            </div>
          </div>
        </div>
        <div className={styles.address}>
          <h3>Add Address</h3>
          <div className={styles.inputContainer}>
            <input type='text' placeholder='Address'/>
            <input type='text' placeholder='Landmark'/>
            <input type='text' placeholder='Mobile No.'/>
          </div>
        </div>
        <div className={styles.book}>
          <button onClick={handleBooking}>Book Now</button>
        </div>
      </div>
    </div>
  )
}

export default Booking
