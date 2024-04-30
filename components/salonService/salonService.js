"use client"
import { Grid, Paper } from '@mui/material'
import styles from './salonService.module.css'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import haircut from '@/assets/images/haircolorMen.svg'
import StarsIcon from '@mui/icons-material/Stars';
import Divider from '@mui/material/Divider';
import {useRouter} from 'next/navigation';
import { getSalonService } from '@/api/account.api';


function SalonService({id}) {
  console.log("id::::>",id);
  const [activeButton, setActiveButton] = useState('male');
  const [activeservice, setActiveService] = useState('haircut')
  const [serviceData, setServiceData] = useState([]);
  console.log("serviceData:::>",serviceData);
  const handleServiceClick = (serviceName) => {
    setActiveService(serviceName);
  };
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };
  const router=useRouter();
  const handleSalonClick= ()=>{
    router.push('salonid/salon')  

  };
  useEffect(()=>{
    async  function fetchService(){
      try {
        const res=await getSalonService(id);
        const data= res?.data?.data;
        setServiceData(data);
        // console.log("res------->",res);
      } catch (error) {
        console.log("error:::>",error);
      }
    }
    fetchService()
},[id])   
  return (
    <div className={styles.container}>
      <div className={styles.service}>
        <Paper className={styles.paper}>
          <h3>Select Service <hr /></h3>
          <div className={styles.serviceFor}>
            <button onClick={() => handleButtonClick('male')} className={activeButton === 'male' ? styles.active : ''}>Male</button>
            <button onClick={() => handleButtonClick('female')} className={activeButton === 'female' ? styles.active : ''}>Female</button>
          </div>
          {activeButton === 'male' && (<div className={styles.serviceType}>
            <Grid container spacing={2}>
            {serviceData.map((item, index) => (
              <Grid item xs={5} md={4} key={index} className={styles.grid}>
                <button onClick={() => handleServiceClick('haircut')}
                  className={activeservice === 'haircut' ? styles.serviceactive : ''} >
                  <Image src={haircut} alt='haircut' />
                  <p>{item.serviceName}</p>
                </button>
              </Grid>
            ))}
                


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
          <h4>Book At</h4>
          <button onClick={handleSalonClick}>Salon</button>
          <button onClick={handleSalonClick}>Home</button>
        </div>
      </div>

    </div>
  )
}

export default SalonService
