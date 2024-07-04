"use client";
import styles from "./payment.module.css";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Session from "@/service/session";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getDetails, payments } from "@/api/account.api";
import Notify from "@/utils/notify";
function Payment() {
  const [totalCount, setTotalCount] = useState(1);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [order, setOrder] = useState(null);
  const servicesDetails = Session.getObject("selectedService");
  const id = Session.get('appointmentId');
  const router = useRouter();

  const totalAmount = servicesDetails?.reduce(
    (total, service) => total + service.servicePrice * totalCount,
    0
  );

  // Function to handle incrementing count
  function handleIncrement() {
    setTotalCount((prevCount) => prevCount * 2);
  }

  // Function to handle decrementing count
  function handleDecrement() {
    if (totalCount > 1) {
      setTotalCount((prevCount) => prevCount / 2);
    }
  }

  const handleOrder = async () => {

    try {
      const payload = {
        subtotal: totalAmount,
      };
      const res = await payments(payload,id);
      
      setOrder(res?.data?.data);
    } catch (error) {
      Notify.error(error.message);
    }
  };
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {

    const res = await loadRazorpayScript();

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order?.subtotal,
      order_id: order?.orderId,
      currency: "INR",
      name: "Your Company Name",
      description: "Test Transaction",
      handler: async function (response) {
        //alert(response.razorpay_payment_id);
       // console.log("res razorpay", response);
       // console.log('options',options)
        router.push("/appointment");
      },
      prefill: {
        name: "Your Name",
        email: "Your Email",
        // contact: "Your Phone Number",
      },
      notes: {
        address: "Your Address",
      },
      theme: {
        color: "#000000",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };


  useEffect(() => {
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.serviceType}>
          <div className={styles.countSection}>
            <div>
              <h3>Grooming Essentials</h3>
            </div>
            {/* <div className={styles.count}>
              <RemoveIcon
                className={styles.countIcon}
                style={{ fontSize: "12px" }}
                onClick={handleDecrement}
              />
              <span>{totalCount}</span>
              <AddIcon
                className={styles.countIcon}
                style={{ fontSize: "12px" }}
                onClick={handleIncrement}
              />
            </div> */}
            <div className={styles.totalPrice}>
              <p>
                ₹
                {servicesDetails?.reduce(
                  (total, service) => total + service.servicePrice * totalCount,
                  0
                )}
              </p>
            </div>
          </div>
        </div>

        {servicesDetails?.map((service, index) => (
          <div key={index} className={styles.serviceType}>
            <div className={styles.price}>
              <div className={styles.serviceList}>
                <ul>
                  <li>
                    {service.serviceName} for {service.type} x{totalCount}
                  </li>
                </ul>
              </div>
              <div className={styles.price}>
                ₹{service.servicePrice * totalCount}
              </div>
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
            <span>
              ₹
              {servicesDetails?.reduce(
                (total, service) => total + service.servicePrice * totalCount,
                0
              )}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.payment}>
        {/* {!order && <button onClick={handleOrder}>Confirm Payment</button> }
         {order && <button onClick={handlePayment}>Pay</button>}  */}

        {!order && (
          <button
            onClick={() => {
              handleOrder();
            }}
            className={styles.btn}

          >
            Confirm Payment
          </button>
        )}
        {order && <button onClick={handlePayment} className={styles.btn}>Pay</button>}
      </div>
    </div>
  );
}

export default Payment;
