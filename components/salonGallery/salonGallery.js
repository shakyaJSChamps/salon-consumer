import { Col, Row } from 'react-bootstrap'
import styles from './salonGallery.module.css'
import Image from 'next/image'
import Images from '@/app/image'

function SalonGallery({ data }) {
  console.log("Salongallery", data)
  return (
    <div className={styles.container}>
        {data?.map((item,index) => (
            <Images key={index}  alt={'image'} 
          className={styles.imgDiv}  imageUrl={item} 
          width={200}
          height={200}/>
        ))}
         {/* <Images
                    imageUrl ={values.profileImageUrl}
                    alt="user profile"
                    width={100}
                    height={100}
                    className={styles.profileImage}
                  /> */}
    </div>
  )
}

export default SalonGallery
