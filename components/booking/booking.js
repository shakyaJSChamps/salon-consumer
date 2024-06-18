"use client";
import styles from "./booking.module.css";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
import Session from "@/service/session";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { appointment } from "@/api/account.api";
import AddressPopup from "../userProfile/addressPopup/addressPopup";
import Notify from "@/utils/notify";

function Booking(props) {
  // console.log("serviceAt",props.serviceAt);
  const servicesDetails = Session.getObject("selectedService");
  const router = useRouter();
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  console.log("sele::>", selectedAddress);
  const [totalCount, setTotalCount] = useState(1); // Initial count
  const serviceIds = servicesDetails?.map((item) => item.id);
  const totalServiceDuration = servicesDetails.reduce(
    (total, service) => total + service.serviceDuration,
    0
  );
  console.log("totalDuration::>", totalServiceDuration);
  console.log("servicekjkjkj:::>", servicesDetails);
  console.log("serviceIds::>", serviceIds);
  const salonId = Session.get("selectedSalonId");
  console.log("SalonId", salonId);
  const today = new Date().toISOString().split("T")[0];
  // Formik initial values
  const initialValues = {
    salonId: parseInt(salonId),
    date: "",
    startTime: "",
    serviceType: "",
    duration: totalServiceDuration,
    homeService: props.serviceAt === "Home",
    serviceIds: serviceIds,
  };
  const handleShowAddress = () => {
    setShowAddress(!showAddress);
  };
  const handleAddressSelection = (address) => {
    setSelectedAddress(address);
    setShowAddress(false); // Close the address popup after selection
  };

  // Formik validation schema
  const validationSchema = Yup.object().shape({
    date: Yup.date()
      .required("Date is required")
      .min(today, "Date cannot be in the past"),
    startTime: Yup.string().required("Time is required"),
    serviceType: Yup.string().required("Type is required"),
    // addressId: Yup.number().required('Type is required')
  });

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

  // Function to handle booking
  async function handleSubmit(values) {
    console.log("values::>", values);
    const data = {
      ...(props.serviceAt === "Home"
        ? {
            salonId: values.salonId,
            date: values.date,
            startTime: values.startTime,
            serviceType: values.serviceType,
            addressId: selectedAddress?.id,
            duration: values.duration,
            homeService: true,
            serviceIds: serviceIds,
          }
        : values),
    };
    console.log("data:::>", data);
    try {
      const res = await appointment(data);
      console.log("resAppointment::>", res);
      router.push("salon/payment");
    } catch (error) {
      Notify.error(error.message);
      console.log("error::>", error);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className={styles.counter}>
                <div className={styles.countSection}>
                  <div>
                    <h3>Grooming Essentials</h3>
                  </div>
                  <div className={styles.count}>
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
                  </div>
                  <div className={styles.totalPrice}>
                    <p>
                      ₹
                      {servicesDetails.reduce(
                        (total, service) =>
                          total + service.servicePrice * totalCount,
                        0
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {servicesDetails.map((service, index) => (
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

              <div className={styles.bookingDate}>
                <h3>Booking date</h3>
                <div className={styles.dateContainer}>
                  <Field type="date" name="date" min={today} />{" "}
                  <ErrorMessage name="date" component="div" className="error" />
                </div>
              </div>

              <div className={styles.dateContainer}>
                <h3>Select time slot</h3>
                <div className={styles.timeslot}>
                  <Field type="text" name="startTime" />
                  {/* Add your time slot selection UI here */}
                </div>
                <ErrorMessage
                  name="startTime"
                  component="div"
                  className="error"
                />
              </div>
              <div className={styles.dateContainer}>
                <h3>Duration</h3>
                <div className={styles.timeslot}>
                  <Field type="number" name="duration" />
                  <ErrorMessage
                    name="duration"
                    component="div"
                    className="error"
                  />
                  {/* Add your time slot selection UI here */}
                </div>
              </div>

              <div className={styles.address}>
                <h3>Service Type</h3>
                <div className={styles.inputContainer}>
                  <Field
                    as="select"
                    type="text"
                    name="serviceType"
                    placeholder="serviceType"
                  >
                    <option>Select serviceType</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Field>

                  <ErrorMessage
                    name="serviceType"
                    component="div"
                    className="error"
                  />
                </div>
              </div>
              {props.serviceAt === "Home" && (
                <div className={styles.address}>
                  {selectedAddress !== null && (
                    <>
                      <h3>Address</h3>{" "}
                      <div className={styles.inputContainer}>
                        <Field
                          type="text"
                          name="addressId"
                          value={`${selectedAddress?.id} ${selectedAddress?.houseNo} ${selectedAddress?.streetAddress}, ${selectedAddress?.city}, ${selectedAddress?.state}, ${selectedAddress?.pincode}`}
                          placeholder="Address"
                        />
                        <ErrorMessage
                          name="addressId"
                          component="div"
                          className="error"
                        />
                      </div>
                    </>
                  )}
                  {selectedAddress === null && (
                    <button
                      onClick={handleShowAddress}
                      className={styles.addressBtn}
                    >
                      Select Address
                    </button>
                  )}
                </div>
              )}

              <div className={styles.book}>
                <button type="submit">Book Now</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <AddressPopup
        show={showAddress}
        onHide={() => setShowAddress(false)}
        onSelectAddress={handleAddressSelection}
      />
    </div>
  );
}

export default Booking;
