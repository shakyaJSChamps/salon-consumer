import { Col, Row } from 'react-bootstrap'
import styles from './salonGallery.module.css'
import Images from '@/app/image'

function SalonGallery({ data }) {
  return (
    <div className={styles.container}>
            {data && data.length > 0 ? (

        data?.map((item,index) => (
            <Images key={index}  alt={'image'} 
          className={styles.imgDiv}  imageUrl={item} 
          width={200}
          height={200}/>
        ))
      ) : (
        <p>No images available</p>
      )}
    </div>
  )
}

export default SalonGallery
