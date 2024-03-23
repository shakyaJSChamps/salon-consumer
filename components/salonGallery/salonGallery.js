import styles from './salonGallery.module.css'

function SalonGallery({data}) {
  console.log("Salongallery", data)
  return (
    <div className={styles.container} >
     {data.map(item => (
        <img key={item.id} src={item} alt={'image'} style={{width: "20%",height:"20%"}}/>
      ))}
    </div>
  )
}

export default SalonGallery
