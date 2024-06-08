import { Col, Row } from 'react-bootstrap'
import styles from './salonGallery.module.css'
import Image from 'next/image'

function SalonGallery({ data }) {
  console.log("Salongallery", data)
  return (
    <div className={styles.container}>
        {data?.map((item,index) => (
            <img key={index} src={item} alt={'image'} 
           />
        ))}
    </div>
  )
}

export default SalonGallery
