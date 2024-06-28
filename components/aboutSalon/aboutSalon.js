"use client";
import styles from "./aboutSalon.module.css";
import Image from "next/image";
import specialist from "@/assets/images/specialist.svg";
import StarsIcon from "@mui/icons-material/Stars";
import { getSalonReviews, getSalonStaff } from "@/api/account.api";
import { useEffect, useState } from "react";
import male from "../../assets/images/malePlaceholder.png";
import female from "../../assets/images/femalePlaceholder.svg";
import Images from "@/app/image";
import Notify from "@/utils/notify";
function AboutSalon({ id }) {
  const [staff, setStaff] = useState([]);
  const [reviews, setReviews] = useState();

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const staffData = await getSalonStaff(id);
        const data = staffData?.data?.data;
        setStaff(data);
      } catch (error) {
        Notify.error(error.message);
      }
    };

    fetchStaff();
  }, [id]);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsData = await getSalonReviews(id);
        const data = reviewsData?.data?.data?.reviews;
        setReviews(data);
      } catch (error) {
        Nofity.error(error.message);
      }
    };

    fetchReviews();
  }, [id]);
  return (
    <div className={styles.container}>
      <div className={styles.aboutContent}>
        <div className={styles.specialistContainer}>
          <div className={styles.heading}>Our Specialist</div>
          <div className={styles.specialistDiv}>
            <div className={styles.specialist}>
              {Array.isArray(staff) && staff.length > 0 ? (
                staff.map((specialist, index) => (
                  <div className={styles.specialistDetails} key={index}>
                    <div className={styles.image}>
                      <Image
                        src={specialist.gender === "Male" ? male : female}
                        alt={specialist.firstName}
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className={styles.content}>
                      <h3>{specialist.firstName}</h3>
                      <p>{specialist.role}</p>
                      <div className={styles.specialistRating}>
                        <p>{specialist.specialization}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className={styles.noStaff}>No staff data available</p>
              )}
            </div>
          </div>
          <div className={styles.reviewRating}>
            <div className={styles.heading}>Ratings & Reviews</div>
            <div className={styles.reviewDiv}>
              {reviews?.map((item, index) => (
                <div className={styles.reviewsContainer} key={index}>
                  <div className={styles.userDetails}>
                    <div className={styles.aboutUser}>
                      <div className={styles.userImage}>
                        <Image
                          src={item.profilePic || specialist}
                          alt="User-Image"
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className={styles.userName}>
                        <h3>{item.name}</h3>
                        {/* <p>02/04/2024</p> */}
                      </div>
                    </div>
                    <div className={styles.userRating}>
                      <StarsIcon className={styles.Ricons} />
                      <p>{item.rating}/5</p>
                    </div>
                  </div>
                  <div className={styles.userReview}>
                    <p>{item.review}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSalon;
