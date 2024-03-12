import styles from './topLists.module.css'

function TopLists(props) {
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

export default TopLists