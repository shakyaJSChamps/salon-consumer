import TopServices from '../topServices/topServices'
import styles from './commonComponent.module.css'

function CommonComponent(props) {
    const {title,data}=props
  return (
    <div className={styles.container} >
      <div className={styles.heading}>
        {title}
      </div>
      {data}
    </div>
  )
}

export default CommonComponent