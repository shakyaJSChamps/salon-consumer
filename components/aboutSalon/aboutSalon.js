"use client"
import styles from './aboutSalon.module.css'
import Image from 'next/image';
import specialist from '@/assets/images/specialist.svg'
import StarsIcon from '@mui/icons-material/Stars';
import { getSalonReviews, getSalonStaff } from '@/api/account.api';
import { useEffect, useState } from 'react';


function AboutSalon({ id }) {
    const [staff, setStaff] = useState([]);
    const [reviews, setReviws] = useState([]);
    // console.log("staff:::> ", staff)
    // console.log("Reviws::::>",reviews)

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const staffData = await getSalonStaff(id);
                const data = staffData?.data?.data;
                setStaff(data);
            } catch (error) {
                console.error('Error fetching salon staff:', error);
            }
        };

        fetchStaff();
    }, [id]);
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const reviewsData = await getSalonReviews(id);
                const data = reviewsData?.data?.data;
                setReviws(data);
            } catch (error) {
                console.error('Error fetching salon staff:', error);
            }
        };

        fetchReviews();
    }, [id]);
    return (
        <div className={styles.container}>
            <div className={styles.aboutContent}>
                <div className={styles.title}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt <br />
                        ut labore Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor<br />
                        incididunt ut labore Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do<br />
                        eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet, consectetur</p>
                </div>
                <div className={styles.specialistContainer}>
                    <div className={styles.heading}>
                        Our Specialist
                    </div>
                    <div className={styles.specialist}>
                        <div className={styles.specialist}>
                            {Array.isArray(staff) && staff.length > 0 ? (
                                staff.map((specialist, index) => (
                                    <div className={styles.specialistDetails} key={index}>
                                        <div className={styles.image}>
                                            <Image src={specialist.profileImageUrl
                                            } alt={specialist.firstName} width={100} height={100} />
                                        </div>
                                        <div className={styles.content}>
                                            <h3>{specialist.
                                                firstName}</h3>
                                            <p>{specialist.role}</p>
                                            <div className={styles.specialistRating}>
                                                <p>{specialist.
                                                    specialization
                                                }</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No staff data available</p>
                            )}
                        </div>
                    </div>
                    <div className={styles.reviewRating}>
                        <div className={styles.heading}>
                            Ratings & Reviews
                        </div>
                        <div className={styles.div}>
                            <div className={styles.reviewsContainer}>
                                <div className={styles.userDetails}>
                                    <div className={styles.aboutUser}>
                                        <div className={styles.userImage}>
                                            <Image src={specialist} alt='User-Image' />
                                        </div>
                                        <div className={styles.userName}>
                                            <h3>John Doe</h3>
                                            <p>02/04/2024</p>

                                        </div>
                                    </div>
                                    <div className={styles.userRating}>
                                        <StarsIcon className={styles.Ricons} />
                                        <p>4/5</p>

                                    </div>
                                </div>
                                <div className={styles.userReview}>
                                    <p>
                                        Ut enim ad minim veniam, quis nostrud exercitation<br />
                                        ullamco laboris nisi ut aliquip ex ea commodo Ut enim ad<br />
                                        minim veniam, quis nostrud exercitation ullamco laboris<br />
                                        nisi ut aliquip ex ea commodo con con enim ad minim<br />
                                        veniam, quis nostrud exercitation ullamco laboris nisi ut<br />
                                        aliquip ex ea commodo con
                                    </p>
                                </div>
                            </div>
                            <div className={styles.reviewsContainer}>
                                <div className={styles.userDetails}>
                                    <div className={styles.aboutUser}>
                                        <div className={styles.userImage}>
                                            <Image src={specialist} alt='User-Image' />
                                        </div>
                                        <div className={styles.userName}>
                                            <h3>John Doe</h3>
                                            <p>02/04/2024</p>

                                        </div>
                                    </div>
                                    <div className={styles.userRating}>
                                        <StarsIcon className={styles.Ricons} />
                                        <p>4/5</p>

                                    </div>
                                </div>
                                <div className={styles.userReview}>
                                    <p>
                                        Ut enim ad minim veniam, quis nostrud exercitation<br />
                                        ullamco laboris nisi ut aliquip ex ea commodo Ut enim ad<br />
                                        minim veniam, quis nostrud exercitation ullamco laboris<br />
                                        nisi ut aliquip ex ea commodo con con enim ad minim<br />
                                        veniam, quis nostrud exercitation ullamco laboris nisi ut<br />
                                        aliquip ex ea commodo con
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.div}>
                            <div className={styles.reviewsContainer}>
                                <div className={styles.userDetails}>
                                    <div className={styles.aboutUser}>
                                        <div className={styles.userImage}>
                                            <Image src={specialist} alt='User-Image' />
                                        </div>
                                        <div className={styles.userName}>
                                            <h3>John Doe</h3>
                                            <p>02/04/2024</p>

                                        </div>
                                    </div>
                                    <div className={styles.userRating}>
                                        <StarsIcon className={styles.Ricons} />
                                        <p>4/5</p>

                                    </div>
                                </div>
                                <div className={styles.userReview}>
                                    <p>
                                        Ut enim ad minim veniam, quis nostrud exercitation<br />
                                        ullamco laboris nisi ut aliquip ex ea commodo Ut enim ad<br />
                                        minim veniam, quis nostrud exercitation ullamco laboris<br />
                                        nisi ut aliquip ex ea commodo con con enim ad minim<br />
                                        veniam, quis nostrud exercitation ullamco laboris nisi ut<br />
                                        aliquip ex ea commodo con
                                    </p>
                                </div>
                            </div>
                            <div className={styles.reviewsContainer}>
                                <div className={styles.userDetails}>
                                    <div className={styles.aboutUser}>
                                        <div className={styles.userImage}>
                                            <Image src={specialist} alt='User-Image' />
                                        </div>
                                        <div className={styles.userName}>
                                            <h3>John Doe</h3>
                                            <p>02/04/2024</p>

                                        </div>
                                    </div>
                                    <div className={styles.userRating}>
                                        <StarsIcon className={styles.Ricons} />
                                        <p>4/5</p>

                                    </div>
                                </div>
                                <div className={styles.userReview}>
                                    <p>
                                        Ut enim ad minim veniam, quis nostrud exercitation<br />
                                        ullamco laboris nisi ut aliquip ex ea commodo Ut enim ad<br />
                                        minim veniam, quis nostrud exercitation ullamco laboris<br />
                                        nisi ut aliquip ex ea commodo con con enim ad minim<br />
                                        veniam, quis nostrud exercitation ullamco laboris nisi ut<br />
                                        aliquip ex ea commodo con
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AboutSalon
