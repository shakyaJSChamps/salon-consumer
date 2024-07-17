"use client";
import styles from "./payment.module.css";
import Session from "@/service/session";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { payments, verifySignature } from "@/api/account.api";
import Notify from "@/utils/notify";
function Payment() {
  const [totalCount, setTotalCount] = useState(1);
  const [order, setOrder] = useState(null);
  const servicesDetails = Session.getObject("selectedService");
  const id = Session.get("appointmentId");
  const router = useRouter();

  const totalAmount = servicesDetails?.reduce(
    (total, service) => total + service.servicePrice * totalCount,
    0
  );

  const handleOrder = async () => {
    try {
      const payload = {
        subtotal: totalAmount,
      };
      const res = await payments(payload, id);

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
      name: "STYLRAX SOLUTIONS INDIA PRIVATE LIMITED",
      handler: async function (response) {
        console.log("options", options);
        try {
          const verificationPayload = {
            razorpay_order_id: response.razorpay_order_id,

            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };
          const verifyRes = await verifySignature(verificationPayload, id);

          if (verifyRes?.data?.message) {
            Notify.success(verifyRes.data.data);
            router.push(`/appointment/${id}`);
          } else {
            Notify.error("Payment verification failed.");
          }
        } catch (error) {
          Notify.error(error.message);
        }

        //  router.push("/appointment");
      },
      prefill: {
        //  name: "Your Name",
        //   email: "Your Email",
        //   contact: "Your Phone Number",
      },

      theme: {
        color: "#000000",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  useEffect(() => {}, [id]);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.serviceType}>
          <div className={styles.countSection}>
            <div>
              <h3>Grooming Essentials</h3>
            </div>

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
        {order && (
          <button onClick={handlePayment} className={styles.btn}>
            Pay
          </button>
        )}
      </div>
    </div>
  );
}

export default Payment;
