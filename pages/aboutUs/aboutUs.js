import styles from './aboutUs.module.css'

function AboutUs() {
    return (
        <>
            <div className={styles.mainSection}>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h5 className="px-5 fw-bold">Who We Are:</h5>
                            <p className="px-5">
                                Groom yourself to your best self! Anywhere –Anytime!!
                            </p>
                            <p className="px-5">
                                Welcome to the STYLRAX, where we are passionate about
                                revolutionizing the salon services industry.We observed the gap in
                                the salon industry, especially during COVID related to appointment
                                bookings,real-time updates, and finding a good salon.We understand
                                the challenges faced by customers and salon service providers.
                                With our platform, we connect customers with the best salon
                                services while empowering salon service providers to enhance their
                                businesses and attract a wider customer base.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.sectionCustomer}>
                <div className="container">
                    <div className="row">
                        <h5 className="px-5">How We Do It:</h5>
                        <p className="px-5 fw-bold mt-3">For Customers:</p>
                        <div className="row">
                            <div className="col">
                                <ul className="px-5">
                                    <li>
                                        Discover a wide range of salons and services in our extensive
                                        salon directory.
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
                                        Experience consistent quality through standardized services at
                                        all listed salons.
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
            <div className={styles.saloonService}>
                <div className="container">
                    <div className="row">
                        <h5 className="px-5 fw-bold">For Salon Service Providers:</h5>
                    </div>
                    <div className="row">
                        <div className="col">
                            <ul className="px-5">
                                <li>
                                    Promote your specialized and customized services to potential
                                    customers.
                                </li>
                                <li>
                                    Increase visibility and attract local customers in your specific
                                    locality.
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
        </>
    )
}

export default AboutUs
