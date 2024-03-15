"use client"
import { Grid, Paper } from '@mui/material'
import styles from './doorbuddyService.module.css'
import { useState } from 'react';
import Image from 'next/image';
import haircut from '@/assets/images/haircolorMen.svg'
import StarsIcon from '@mui/icons-material/Stars';
import Divider from '@mui/material/Divider';
import {useRouter} from 'next/navigation';


function DoorbuddyService() {
  const [activeButton, setActiveButton] = useState('male');
  const [activeservice, setActiveService] = useState('haircut')
  const handleServiceClick = (serviceName) => {
    setActiveService(serviceName);
  };
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };
  const router=useRouter();
  const handleSalonClick= ()=>{
    router.push('doorbuddyid/booking')
         

  };
  return (
    <div className={styles.container}>
      <div className={styles.service}>
        <Paper className={styles.paper}>
          <h3>Select a Service <hr /></h3>
          <div className={styles.serviceFor}>
            <button onClick={() => handleButtonClick('male')} className={activeButton === 'male' ? styles.active : ''}>Male</button>
            <button onClick={() => handleButtonClick('female')} className={activeButton === 'female' ? styles.active : ''}>Female</button>
          </div>
          {activeButton === 'male' && (<div className={styles.serviceType}>
            <Grid container spacing={2}>
              <Grid item xs={5} md={4} className={styles.grid}>
                <button onClick={() => handleServiceClick('haircut')}
                  className={activeservice === 'haircut' ? styles.serviceactive : ''} >
                  <Image src={haircut} alt='haircut' />
                  <p>Haircut</p>
                </button>
              </Grid>
              <Grid item xs={5} md={4} className={styles.grid}>
                <button onClick={() => handleServiceClick('hair color')}
                  className={activeservice === 'hair color' ? styles.serviceactive : ''} >
                  <Image src={haircut} alt='hair color' />
                  <p>Hair color</p>
                </button>
              </Grid>
              <Grid item xs={5} md={4} className={styles.grid}>
                <button onClick={() => handleServiceClick('Facial')}
                  className={activeservice === 'Facial' ? styles.serviceactive : ''} >
                  <Image src={haircut} alt='haircut' />
                  <p>Facial</p>
                </button>
              </Grid>
              <Grid item xs={5} md={4} className={styles.grid}>
                <button onClick={() => handleServiceClick('Massage')}
                  className={activeservice === 'Massage' ? styles.serviceactive : ''} >
                  <Image src={haircut} alt='haircut' />
                  <p>Massage</p>
                </button>
              </Grid>
              <Grid item xs={5} md={4} className={styles.grid}>
                <button onClick={() => handleServiceClick('Facewash')}
                  className={activeservice === 'Facewash' ? styles.serviceactive : ''} >
                  <Image src={haircut} alt='haircut' />
                  <p>Facewash</p>
                </button>
              </Grid>
              <Grid item xs={5} md={4} className={styles.grid}>
                <button onClick={() => handleServiceClick('Packege')}
                  className={activeservice === 'Packege' ? styles.serviceactive : ''} >
                  <Image src={haircut} alt='haircut' />
                  <p>Packege</p>
                </button>
              </Grid>


            </Grid>

          </div>)}
          {activeButton === 'female' && (<div className={styles.serviceType}>
            For Female

          </div>)}
        </Paper>
      </div>
      <div className={styles.bestSeller}>
        <h3>BestSeller Haircut</h3>
        <div className={styles.serviceTypeDetails}>
        <div className={styles.details}>
            <div className={styles.aboutService}>
              <h3>Haircut for men</h3>
              <p>
                <StarsIcon className={styles.LIcon}/>
                <soan>4.88 (584.5K reviews)</soan>
              </p>
              <p className={styles.price}>
                ₹259
                &nbsp;
                <span className={styles.duration}>&bull;30 mins</span>
              </p>
              <hr />
              <p>Professional haircut that suits your face shape</p>
            </div>
            <div className={styles.image}>
              <Image src={haircut} alt='haircut-for-men' />
              <button className={styles.sellerBtn}>add</button>
            </div>
          </div>
          <Divider className={styles.divider} />
          <div className={styles.details}>
            <div className={styles.aboutService}>
              <h3>Haircut for men</h3>
              <p>
                <StarsIcon className={styles.LIcon}/>
                <soan>4.88 (584.5K reviews)</soan>
              </p>
              <p className={styles.price}>
                ₹259
                &nbsp;
                <span className={styles.duration}>&bull;30 mins</span>
              </p>
              <hr />
              <p>Professional haircut that suits your face shape</p>
            </div>
            <div className={styles.image}>
              <Image src={haircut} alt='haircut-for-men' />
              <button className={styles.sellerBtn}>add</button>
            </div>
          </div>
          <Divider className={styles.divider} />
          <div className={styles.details}>
            <div className={styles.aboutService}>
              <h3>Haircut for men</h3>
              <p>
                <StarsIcon className={styles.LIcon}/>
                <soan>4.88 (584.5K reviews)</soan>
              </p>
              <p className={styles.price}>
                ₹259
                &nbsp;
                <span className={styles.duration}>&bull;30 mins</span>
              </p>
              <hr />
              <p>Professional haircut that suits your face shape</p>
            </div>
            <div className={styles.image}>
              <Image src={haircut} alt='haircut-for-men' />
              <button className={styles.sellerBtn}>add</button>
            </div>
          </div>
          <Divider className={styles.divider} />
          <div className={styles.details}>
            <div className={styles.aboutService}>
              <h3>Haircut for men</h3>
              <p>
                <StarsIcon className={styles.LIcon}/>
                <soan>4.88 (584.5K reviews)</soan>
              </p>
              <p className={styles.price}>
                ₹259
                &nbsp;
                <span className={styles.duration}>&bull;30 mins</span>
              </p>
              <hr />
              <p>Professional haircut that suits your face shape</p>
            </div>
            <div className={styles.image}>
              <Image src={haircut} alt='haircut-for-men' />
              <button className={styles.sellerBtn}>add</button>
            </div>
          </div>
          <Divider className={styles.divider} />

        </div>
        <div className={styles.booking}>
          <button onClick={handleSalonClick}>Book</button>
        </div>
      </div>

    </div>
  )
}

export default DoorbuddyService
