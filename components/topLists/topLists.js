import Link from 'next/link'
import styles from './topLists.module.css'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function TopLists(props) {
    const {title,data}=props
  return (
    <div className={styles.container} >
      <div className={styles.headingContainer}>
      <div className={styles.heading}>
        Top {title}
      </div>
      <div className={styles.linkDiv}>
                <Link href={'#'} className={styles.link} >View All {title}
                    <ArrowForwardIcon className={styles.arrow} />
                </Link>
            </div>

      </div>
      
      {data}
    </div>
  )
}

export default TopLists