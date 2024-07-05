import { Grid, Paper } from "@mui/material";
import styles from "./salonService.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import Divider from "@mui/material/Divider";
import { useRouter } from "next/navigation";
import { getSalonService, getUserProfile } from "@/api/account.api";
import Notify from "@/utils/notify";
import { useDispatch, useSelector } from "react-redux";
import {
  storeSelectedSalonId,
  storeSelectedService,
} from "@/app/Redux/selectedServiceSlice";
import Session from "@/service/session";
import { selectUser } from "@/app/Redux/Authslice";

function SalonService({ id, homeService }) {
  const [activeCategory, setActiveCategory] = useState(""); // Set default active category
  const [activeServiceIndexes, setActiveServiceIndexes] = useState([]); // Indexes of the selected services
  const [serviceData, setServiceData] = useState([]);
  const [selectedCategoryServices, setSelectedCategoryServices] = useState([]);
  const [selectedServicesDetails, setSelectedServicesDetails] = useState([]);
  const [bookingLocation, setBookingLocation] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [gender, setGender] = useState("Male"); // Add state for gender
  const [filteredServices, setFilteredServices] = useState([]); // Add state for filtered services
  const [showMaleButton, setShowMaleButton] = useState(true);
  const [showFemaleButton, setShowFemaleButton] = useState(true);

  const token = Session.get("authToken");
  const profile = useSelector(selectUser);

  const router = useRouter();
  const dispatch = useDispatch();

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
        Notify.error(error.message);
      }
    }
    fetchService();
  }, [id, dispatch]);

  useEffect(() => {
    const filtered = selectedCategoryServices.filter(
      (service) => service.type === gender
    );
    setFilteredServices(filtered);
  }, [selectedCategoryServices, gender]);

  const handleServiceClick = (serviceName, index) => {
    const currentIndex = activeServiceIndexes.indexOf(index);
    const newActiveServiceIndexes = [...activeServiceIndexes];
    if (currentIndex === -1) {
      newActiveServiceIndexes.push(index);
    } else {
      newActiveServiceIndexes.splice(currentIndex, 1);
    }
    setActiveServiceIndexes(newActiveServiceIndexes);
    setActiveCategory(serviceName);
    const selectedCategory = serviceData.find(
      (category) => category.name === serviceName
    );
    setSelectedCategoryServices(selectedCategory.services);
  };

  const fetchUserDetails = async () => {
    try {
      const userDetails = await getUserProfile();
      setUserInfo(userDetails?.data?.data);
    } catch (error) {
      Notify.error(error.message);
    }
  };
  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleSalonClick = () => {
    if (!token) {
      router.push("/login");
      return;
    }
    if (!profile) {
      return;
    }

    const isProfileIncomplete = userInfo?.name === "" && userInfo?.email === "";
    if (isProfileIncomplete) {
      router.push("/profile");
    } else {
      router.push(`${id}/${bookingLocation}`);
    }
  };

  const handleBookingLocationChange = (location) => {
    setBookingLocation(location);
    handleSalonClick();
  };

  useEffect(() => {}, [profile, bookingLocation]);

  const handleAddButtonClick = (serviceDetails) => {
    const selectedIndex = selectedServicesDetails.findIndex(
      (service) => service === serviceDetails
    );
    const newSelectedServicesDetails = [...selectedServicesDetails];
    if (selectedIndex === -1) {
      newSelectedServicesDetails.push(serviceDetails);
    } else {
      newSelectedServicesDetails.splice(selectedIndex, 1);
    }
    setSelectedServicesDetails(newSelectedServicesDetails);
    dispatch(storeSelectedService({
      services: newSelectedServicesDetails,
      type: gender // Include the type (gender) when dispatching the action
    }));

    // Determine if we need to show or hide gender buttons based on the selected services
    const selectedTypes = newSelectedServicesDetails.map((service) => service.type);
    const isMaleServiceSelected = selectedTypes.includes("Male");
    const isFemaleServiceSelected = selectedTypes.includes("Female");

    setShowMaleButton(!isFemaleServiceSelected);
    setShowFemaleButton(!isMaleServiceSelected);
  };

  return (
    <div className={styles.container}>
      <div className={styles.service}>
        <Paper className={styles.paper}>
          <h3>Select Service</h3>
          <div className={styles.filtered_gender}>
            {showMaleButton && (
              <button
                onClick={() => setGender("Male")}
                className={gender === "Male" ? styles.active : ""}
              >
                Male
              </button>
            )}
            {showFemaleButton && (
              <button
                onClick={() => setGender("Female")}
                className={gender === "Female" ? styles.active : ""}
              >
                Female
              </button>
            )}
          </div>
          <hr />
          <div className={styles.serviceFor}>
            {serviceData.map((category, index) => (
              <button
                key={index}
                onClick={() => handleServiceClick(category.name, index)}
                className={
                  activeCategory === category.name ? styles.active : ""
                }
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
          {filteredServices.map((item, index) => (
            <div className={styles.details} key={index}>
              <div className={styles.aboutService}>
                <h3>{item.serviceName}</h3>
                <p>
                  <span>{item.type}</span>
                </p>
                <p className={styles.price}>
                  ₹{item.servicePrice}
                  &nbsp;
                  <span className={styles.duration}>
                    &bull; {item.serviceDuration} mins
                  </span>
                </p>
                <hr />
                {/* <p>Professional {item.serviceName.toLowerCase()} service</p> */}
              </div>
              <div className={styles.image}>
                <button
                  className={`${styles.sellerBtn} ${
                    activeServiceIndexes.includes(index) ? styles.selected : ""
                  }`}
                  onClick={() => handleAddButtonClick(item)}
                >
                  {selectedServicesDetails.includes(item) ? "Unselect" : "Add"}
                </button>
              </div>
            </div>
          ))}
          <Divider className={styles.divider} />
        </div>
        <div className={styles.booking}>
          <h4>Book At</h4>
          <button
            onClick={() => handleBookingLocationChange("Salon")}
            className={bookingLocation === "Salon" ? styles.activeButton : ""}
          >
            Salon
          </button>
          {homeService && (
            <button
              onClick={() => handleBookingLocationChange("Home")}
              className={bookingLocation === "Home" ? styles.activeButton : ""}
            >
              Home
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SalonService;
