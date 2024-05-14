import { Col, Row } from 'react-bootstrap'
import styles from './salonGallery.module.css'

function SalonGallery({ data }) {
  console.log("Salongallery", data)
  return (
    <div className={styles.container}>
        {data?.map((item,index) => (
            <img key={index} src={item} alt={'image'} 
            style={{width:"200px",height:"200px"}} />
        ))}
    </div>
  )
}

export default SalonGallery
