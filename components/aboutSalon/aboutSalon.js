import styles from './aboutSalon.module.css'
import Image from 'next/image';
import specialist from '@/assets/images/specialist.svg'
import StarsIcon from '@mui/icons-material/Stars';

function AboutSalon() {
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
                            <div className={styles.specialistDetails}>
                                <div className={styles.image}>
                                    <Image src={specialist} alt='specialist' />
                                </div>
                                <div className={styles.content}>
                                    <h3>Bessie Cooper</h3>
                                    <p>Jr.Stylist</p>
                                    <div className={styles.specialistRating}>
                                        <StarsIcon className={styles.icons} />
                                        <p>4.3k <span>ratings & Review</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.specialistDetails}>
                                <div className={styles.image}>
                                    <Image src={specialist} alt='specialist' />
                                </div>
                                <div className={styles.content}>
                                    <h3>Bessie Cooper</h3>
                                    <p>Jr.Stylist</p>
                                    <div className={styles.specialistRating}>
                                        <StarsIcon className={styles.icons} />
                                        <p>4.3k <span>ratings & Review</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.specialistDetails}>
                                <div className={styles.image}>
                                    <Image src={specialist} alt='specialist' />
                                </div>
                                <div className={styles.content}>
                                    <h3>Bessie Cooper</h3>
                                    <p>Jr.Stylist</p>
                                    <div className={styles.specialistRating}>
                                        <StarsIcon className={styles.icons} />
                                        <p>4.3k <span>ratings & Review</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.specialistDetails}>
                                <div className={styles.image}>
                                    <Image src={specialist} alt='specialist' />
                                </div>
                                <div className={styles.content}>
                                    <h3>Bessie Cooper</h3>
                                    <p>Jr.Stylist</p>
                                    <div className={styles.specialistRating}>
                                        <StarsIcon className={styles.icons} />
                                        <p>4.3k <span>ratings & Review</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.specialistDetails}>
                                <div className={styles.image}>
                                    <Image src={specialist} alt='specialist' />
                                </div>
                                <div className={styles.content}>
                                    <h3>Bessie Cooper</h3>
                                    <p>Jr.Stylist</p>
                                    <div className={styles.specialistRating}>
                                        <StarsIcon className={styles.icons} />
                                        <p>4.3k <span>ratings & Review</span></p>
                                    </div>
                                </div>
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
                    <div className={styles.reviewContainer}>

                    </div>
                </div>
    </div>
  )
}

export default AboutSalon
