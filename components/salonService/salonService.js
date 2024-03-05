"use client"
import { Paper } from '@mui/material'
import styles from './salonService.module.css'
import { useState } from 'react';

function SalonService() {
  const [activeButton, setActiveButton] = useState('man');
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };
  return (
    <div className={styles.container}>
      <div className={styles.sevice}>
        <Paper className={styles.paper}>
          <h3>Select a Service</h3>
          <div className={styles.serviceFor}>
            <button onClick={() => handleButtonClick('man')} className={activeButton === 'man' ? styles.active : ''}>Male</button>
            <button onClick={() => handleButtonClick('female')} className={activeButton === 'female' ? styles.active : ''}>Female</button>
          </div>
          <div className={styles.serviceType}>

          </div>
        </Paper>
      </div>
      <div className={styles.seviceTypeDetail}>
        <h3>BestSeller Haircut</h3>
      </div>
    </div>
  )
}

export default SalonService
