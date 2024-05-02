import styles from "./aboutUs.module.css";

const AboutUs = () => {
  return (
    <>
      <div className={styles.mainSection}>
        <div className="container">
          <div className="row">
            <div className={styles.titleName}>
              <h3>
                <u>About-Us</u>
              </h3>
            </div>
            <div className="col ">
              <h5>Who We Are:</h5>
              <p>Groom yourself to your best self! Anywhere –Anytime!!</p>
              <p>
                Welcome to the STYLRAX, where we are passionate about
                revolutionizing the salon services industry. We observed the gap
                in the salon industry, especially during COVID related to
                appointment bookings, real-time updates, and finding a good
                salon. We understand the challenges faced by customers and salon
                service providers. With our platform, we connect customers with
                the best salon services while empowering salon service providers
                to enhance their businesses and attract a wider customer base.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.sectionCustomer}>
        <div className="container">
          <div className={`${styles.customerTag} row`}>
            <h5 className="">How We Do It:</h5>
            <p className="px-3 fw-bold mt-3">For Customers:</p>
            <div className="row">
              <div className="col">
                <ul className={styles.customerSubMenu}>
                  <li>
                    Discover a wide range of salons and services in our
                    extensive salon directory.
                  </li>
                  <li>
                    Enjoy the convenience of booking and managing appointments
                    with ease.
                  </li>
                  <li>
                    Compare competitive rates for services at different salons,
                    ensuring the best value for your money.
                  </li>
                  <li>
                    Experience consistent quality through standardized services
                    at all listed salons.
                  </li>
                  <li>
                    Stay informed and inspired with self-care tips and articles
                    from industry leaders.
                  </li>
                  <li>
                    Take advantage of special event deals tailored to your
                    specific needs.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.sectionSalon}>
        <div className="container">
          <div className={`${styles.salonTag} row`}>
            <h5>For Salon Service Providers:</h5>
          </div>
          <div className="row">
            <div className="col">
              <ul className={styles.salonSubMenu}>
                <li>
                  Promote your specialized and customized services to potential
                  customers.
                </li>
                <li>
                  Increase visibility and attract local customers in your
                  specific locality.
                </li>
                <li>
                  Streamline your salon services with our structured management
                  system.
                </li>
                <li>
                  Effectively manage appointments and transactions with ease.
                </li>
                <li>
                  Showcase your special offers, discounts, and events to attract
                  more customers.
                </li>
                <li>
                  Foster customer loyalty and repeat business through seamless
                  membership services.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.mainMeet}>
        <div className="container">
          <div className={`${styles.meetTag} row`}>
            <h5 className="px-3 fw-bold">Meet Our Core Members:</h5>
          </div>
          <div className="row">
            <div className="col">
              <ol className={styles.meetSection}>
                <li>
                  <span className={`${styles.meetSpan}`}>Raghav Jain:</span> As
                  the visionary founder, Raghav Jain leads our team with a deep
                  passion for revolutionizing the salon services industry. With
                  their expertise, we continuously develop and grow the Salon
                  App.
                </li>
                <li>
                  <span className={`${styles.meetSpan} fw-bold`}>
                  Raghav Jain:
                  </span>
                  Our lead developer, Srivastava, ensures a seamless user
                  experience on our app. Their technical knowledge and
                  commitment to innovation drive our platform<span>&apos;</span>s success.
                </li>
                <li>
                  <span className={`${styles.meetSpan} fw-bold`}>
                    Raghav Jain:
                  </span>
                  Leading our marketing efforts is Raghav Jain. They create
                  awareness and promote the Salon App through strategic
                  campaigns, reaching a wider audience and driving growth.
                  Transform your salon experience. Download the STYLRAX now!
                </li>
              </ol>
              <p>
                Take your salon business to new heights. Partner with us today!
                Join the STYLRAX and unlock a world of opportunities for your
                salon.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
