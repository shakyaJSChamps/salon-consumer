"use client"
import styles from './payment.module.css'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Session from '@/service/session';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

function PaymentPage() {
    const [totalCount, setTotalCount] = useState(1);
    const servicesDetails = Session.getObject('selectedService');
    console.log("sel::::>", servicesDetails);
    const router = useRouter();
    const handleConfirm = () => {
        Swal.fire({
            position: "center",
            icon: "success",
            showConfirmButton: false,
            title: "Payment Successful",
            html: "Your Booking has been successfully done",
            timer: 4000,
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                router.push('/');
                // console.log("I was closed by the timer");
            }
        });
    }

    // Function to handle incrementing count
    function handleIncrement() {
        setTotalCount(prevCount => prevCount * 2); // Double the total count
    }

    // Function to handle decrementing count
    function handleDecrement() {
        if (totalCount > 1) {
            setTotalCount(prevCount => prevCount / 2); // Halve the total count
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.serviceType}>
                    <div className={styles.countSection}>
                        <div>
                            <h3>Grooming Essentials</h3>
                        </div>
                        <div className={styles.count}>
                            <RemoveIcon className={styles.countIcon} style={{ fontSize: "12px" }} onClick={handleDecrement} />
                            <span>{totalCount}</span>
                            <AddIcon className={styles.countIcon} style={{ fontSize: "12px" }} onClick={handleIncrement} />
                        </div>
                        <div className={styles.totalPrice}>
                            <p>₹{servicesDetails?.reduce((total, service) => total + (service.servicePrice * totalCount), 0)}</p>
                        </div>
                    </div>
                </div>

                {servicesDetails?.map((service, index) => (
                    <div key={index} className={styles.serviceType}>
                        <div className={styles.price}>
                            <div className={styles.serviceList}>
                                <ul>
                                    <li>{service.serviceName} for {service.type} x{totalCount}</li>
                                </ul>
                            </div>
                            <div className={styles.price}>₹{service.servicePrice * totalCount}</div>
                        </div>
                    </div>
                ))}
                <div className={styles.offers}>
                    <h3>Coupons and offers</h3>
                    <div className={styles.offerlist}>
                        <ul>
                            <li>Flat 20% off On Payment Through Axis Bank</li>
                            <li>Flat 20% off On Payment Through Axis Bank</li>
                        </ul>
                    </div>
                </div>
                <div className={styles.paymentSummary}>
                    <h3>Payment summary</h3>
                    {servicesDetails?.map((service, index) => (
                        <div key={index} className={styles.total}>
                            <h4>{service.serviceName}</h4>
                            <span>₹{service.servicePrice}</span>
                        </div>

                    ))}
                    <hr className={styles.hr} />
                    <div className={styles.grandTotal}>
                        <h4>Total</h4>
                        <span>₹{servicesDetails?.reduce((total, service) => total + (service.servicePrice * totalCount), 0)}</span>
                    </div>
                </div>
            </div>
            <div className={styles.payment}>
                <button onClick={handleConfirm}>Confirm Payment</button>
            </div>

        </div>
    )
}

export default PaymentPage

