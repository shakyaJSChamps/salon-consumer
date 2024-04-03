import { Paper } from '@mui/material'
import styles from './topServices.module.css'
import Image from 'next/image'
import haircut from '@/assets/images/haircutService.svg'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';

function TopServices() {
  return (
    <div className={styles.container}>
      <div className={styles.headingContainer}>
        <div className={styles.heading}>
          Top Services
        </div>
        <div className={styles.linkDiv}>
          <Link href={'#'} className={styles.link} >View All services
            <ArrowForwardIcon className={styles.arrow} />
          </Link>
        </div>

      </div>
      <div className={styles.content}>
        <Paper elevation={3} className={styles.paper}>
          <div className={styles.type}>
            Hair cut
          </div>
          <div className={styles.image}>
            <Image src={haircut} alt='haircut' />
          </div>
        </Paper>
        <Paper elevation={3} className={styles.paper}>
          <div className={styles.type}>
            Hair cut
          </div>
          <div className={styles.image}>
            <Image src={haircut} alt='haircut' />
          </div>
        </Paper>
        <Paper elevation={3} className={styles.paper}>
          <div className={styles.type}>
            Hair cut
          </div>
          <div className={styles.image}>
            <Image src={haircut} alt='haircut' />
          </div>
        </Paper>
        <Paper elevation={3} className={styles.paper}>
          <div className={styles.type}>
            Hair cut
          </div>
          <div className={styles.image}>
            <Image src={haircut} alt='haircut' />
          </div>
        </Paper>
        <Paper elevation={3} className={styles.paper}>
          <div className={styles.type}>
            Hair cut
          </div>
          <div className={styles.image}>
            <Image src={haircut} alt='haircut' />
          </div>
        </Paper>
        <Paper elevation={3} className={styles.paper}>
          <div className={styles.type}>
            Hair cut
          </div>
          <div className={styles.image}>
            <Image src={haircut} alt='haircut' />
          </div>
        </Paper>
        {/* <div className={styles.scrollbtn}>
          <div className={styles.icon}>
          <ArrowBackIcon  />
          </div>
          <div className={styles.icon}>
          <ArrowForwardIcon  />
          </div>
        </div> */}

      </div>


    </div>
  )
}

export default TopServices
