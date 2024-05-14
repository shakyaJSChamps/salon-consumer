"use client"
import { Grid, Paper } from '@mui/material';
import styles from './salonService.module.css';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import StarsIcon from '@mui/icons-material/Stars';
import Divider from '@mui/material/Divider';
import { useRouter } from 'next/navigation'; // Changed from 'next/navigation'
import { getSalonService } from '@/api/account.api';
import Notify from '@/utils/notify'
import { useDispatch } from 'react-redux';
import { storeSelectedSalonId, storeSelectedService } from '@/app/Redux/selectedServiceSlice';

function SalonService({ id }) {
  const [activeCategory, setActiveCategory] = useState(''); // Set default active category
  const [activeServiceIndexes, setActiveServiceIndexes] = useState([]); // Indexes of the selected services
  const [serviceData, setServiceData] = useState([]);
  const [selectedCategoryServices, setSelectedCategoryServices] = useState([]);
  const [selectedServicesDetails, setSelectedServicesDetails] = useState([]);
  console.log("selectedServicesDetails",selectedServicesDetails);
  const router = useRouter();
  const dispatch=useDispatch();

  useEffect(() => {
    async function fetchService() {
      try {
        const res = await getSalonService(id);
        const data = res?.data?.data;
        if (data && data.length > 0) {
          dispatch(storeSelectedSalonId(id));
          setActiveCategory(data[0].name); // Set first service as default active category
          setSelectedCategoryServices(data[0].services);
          setServiceData(data);
        }
      } catch (error) {
        console.log("error:::>", error);
      }
    }
    fetchService();
  }, [id]);

  const handleServiceClick = (serviceName, index) => {
    const currentIndex = activeServiceIndexes.indexOf(index);
    const newActiveServiceIndexes = [...activeServiceIndexes];
    if (currentIndex === -1) {
      // Service is not selected, add it to the selected services
      newActiveServiceIndexes.push(index);
    } else {
      // Service is already selected, remove it from the selected services
      newActiveServiceIndexes.splice(currentIndex, 1);
    }
    setActiveServiceIndexes(newActiveServiceIndexes);
    setActiveCategory(serviceName);
    const selectedCategory = serviceData.find(category => category.name === serviceName);
    setSelectedCategoryServices(selectedCategory.services);
  };

  const handleSalonClick = () => {
    if(selectedServicesDetails.length>0){
      router.push('salonid/salon');
    }
    Notify.error("please Select service")
   
  };

  const handleAddButtonClick = (serviceDetails) => {
    const selectedIndex = selectedServicesDetails.findIndex(service => service === serviceDetails);
    const newSelectedServicesDetails = [...selectedServicesDetails];
    if (selectedIndex === -1) {
      // Service is not selected, add it to the selected services
      newSelectedServicesDetails.push(serviceDetails);
    } else {
      // Service is already selected, remove it from the selected services
      newSelectedServicesDetails.splice(selectedIndex, 1);
    }
    setSelectedServicesDetails(newSelectedServicesDetails);
    dispatch(storeSelectedService(newSelectedServicesDetails));
  };

  return (
    <div className={styles.container}>
      <div className={styles.service}>
        <Paper className={styles.paper}>
          <h3>Select Service</h3>
          <hr />
          <div className={styles.serviceFor}>
            {serviceData.map((category, index) => (
              <button 
                key={index} 
                onClick={() => handleServiceClick(category.name, index)} 
                className={activeCategory === category.name ? styles.active : ''}
              >
                {category.name}
              </button>
            ))}
          </div>
        </Paper>
      </div>
      <div className={styles.bestSeller}>
        <h3>BestSeller Haircut</h3>
        <div className={styles.serviceTypeDetails}>
          {selectedCategoryServices.map((item, index) => (
            <div className={styles.details} key={index}>
              <div className={styles.aboutService}>
                <h3>{item.serviceName}</h3>
                <p>
                  <span>{item.type}</span>
                </p>
                <p className={styles.price}>
                  ₹{item.servicePrice}
                  &nbsp;
                  <span className={styles.duration}>&bull; {item.serviceDuration} mins</span>
                </p>
                <hr />
                <p>Professional {item.serviceName.toLowerCase()} service</p>
              </div>
              <div className={styles.image}>
                <Image src={item.imageUrl} alt={item.serviceName} />
                <button 
                  className={`${styles.sellerBtn} ${activeServiceIndexes.includes(index) ? styles.selected : ''}`} 
                  onClick={() => handleAddButtonClick(item)}
                >
                  {selectedServicesDetails.includes(item) ? "unselect" : "add"}
                </button>
              </div>
            </div>
          ))}
          <Divider className={styles.divider} />
        </div>
        <div className={styles.booking}>
        <h4>Book At</h4>
          <button onClick={handleSalonClick}>Salon</button>
          <button onClick={handleSalonClick}>Home</button> 
          
        </div>
      </div>
    </div>
  );
}

export default SalonService;
