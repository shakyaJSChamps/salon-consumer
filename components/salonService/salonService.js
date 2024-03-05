import { Paper } from '@mui/material'
import styles from './salonService.module.css'

function SalonService() {
  return (
    <div className={styles.container}>
     <div className={styles.sevice}>
        <Paper className={styles.paper}>
            <h3>Select a Service</h3>
            <div className={styles.serviceFor}>
                <button>Male</button>
                <button>Female</button>
            </div>
            <div className={styles.serviceType}>
                
            </div>
        </Paper>
     </div>
     <div className={styles.seviceType}></div>
    </div>
  )
}

export default SalonService
