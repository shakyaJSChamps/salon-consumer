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
import { setAppointmentId } from "@/app/Redux/Authslice";
import { useDispatch } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { styled } from "@mui/system";
import dayjs from "dayjs";

function Booking(props) {
  const servicesDetails = Array.isArray(Session.getObject("selectedService"))
    ? Session.getObject("selectedService")
    : [Session.getObject("selectedService")];
  const router = useRouter();
  const disptach = useDispatch();
  const gender = Session.get("type");
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [totalCount, setTotalCount] = useState(1); // Initial count
  const [endTime, setEndTime] = useState("");

  const serviceIds = servicesDetails.map((item) => item.id);
  const totalServiceDuration = servicesDetails.reduce(
    (total, service) => total + service.serviceDuration,
    0
  );

  const salonId = Session.get("selectedSalonId");
  const today = new Date().toISOString().split("T")[0];
  const tenDaysAhead = new Date();
  tenDaysAhead.setDate(tenDaysAhead.getDate() + 10);
  const maxDate = tenDaysAhead.toISOString().split("T")[0];
  // Formik initial values
  const initialValues = {
    salonId: parseInt(salonId),
    date: "",
    startTime: "",
    serviceType: gender,
    duration: totalServiceDuration, // Duration in seconds
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
    startTime: Yup.string().required("Start time is required"),
    //serviceType: Yup.string().required("ServiceType is required"),
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

  const calculateEndTime = (startTime, duration) => {
    if (startTime && duration) {
      const start = dayjs(startTime, "hh:mm A");
      const end = start.add(duration, "minute");

      // Format end time in hh:mm A format
      return end.format("hh:mm A");
    }
    return "";
  };

  // Function to handle booking
  function handleSubmit(values) {
    // Convert startTime to the required format
    const formattedStartTime = dayjs(values.startTime).format('hh:mm A');

    const data = {
      ...(props.serviceAt === "Home"
        ? {
            salonId: values.salonId,
            date: values.date,
            startTime: formattedStartTime,
            serviceType: gender,
            addressId: selectedAddress?.id,
            duration: values.duration,
            homeService: true,
            serviceIds: serviceIds,
          }
        : {
            ...values,
            startTime: formattedStartTime,
          }),
    };

    appointment(data)
      .then((res) => {
        const appointmentId = res.data?.data?.id;
        disptach(setAppointmentId(appointmentId));
        router.push("salon/payment");
      })
      .catch((error) => {
        Notify.error(error.message);
      });
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, values, setFieldValue }) => (
              <Form>
                <div className={styles.counter}>
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
                      {/* <p>
                        ₹
                        {servicesDetails.reduce(
                          (total, service) =>
                            total + service.servicePrice * totalCount,
                          0
                        )}
                      </p> */}
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
                    <Field type="date" name="date" min={today} max={maxDate} />
                    <ErrorMessage name="date" component="div" className="error" />
                  </div>
                </div>

                <div className={styles.timeContainer}>
                  <h3>Select time slot</h3>
                  <div className={styles.timeslot}>
                    <Field name="startTime">
                      {({ field }) => (
                        <CustomTimePicker
                          {...field}
                          value={field.value || null}
                          onChange={(value) => {
                            setFieldValue("startTime", value);
                            setEndTime(calculateEndTime(value, values.duration));
                          }}
                          renderInput={(params) => (
                            <input
                              type="text"
                              {...params}
                              className={`${styles.timeSlot} timePickerInput`}
                            />
                          )}
                          // disabled={isSubmitting}
                          ampm={true}
                        />
                      )}
                    </Field>
                  </div>
                  <ErrorMessage
                    name="startTime"
                    component="div"
                    className="error"
                  />
                </div>

                <div className={styles.dateContainer}>
                  <h3>End Time</h3>
                  <div className={styles.timeslot}>
                    <input
                      type="text"
                      value={endTime}
                      placeholder="End Time"
                      readOnly
                    />
                  </div>
                </div>
                <div className={styles.address}>
                <h3>Service Type</h3>
                <div className={styles.inputContainer}>
                  <Field
                   // as="select"
                    type="text"
                    name="serviceType"
                    placeholder="serviceType"
                    value={gender}
                  >
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
                    <h3>Address</h3>
                    {selectedAddress && (
                      <>
                        <div className={styles.dateContainer}>
                          <Field
                            type="text"
                            name="addressId"
                            value={`${selectedAddress?.houseNo} ${selectedAddress?.streetAddress}, ${selectedAddress?.city}, ${selectedAddress?.state},${selectedAddress?.country}, ${selectedAddress?.pincode}`}
                            placeholder="Address"
                            readOnly
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
                        type="button"
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
    </LocalizationProvider>
  );
}

const CustomTimePicker = styled(TimePicker)({
  "& .MuiInputBase-root": {
    border: "2px solid white",
    boxShadow: "2px 3px 7px #a1acb0",
    width: "100%",
  },
  "& .MuiOutlinedInput-root": {
    "&:focus, &:focus-within": {
      boxShadow: "2px 3px 7px #a1acb0",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiInputBase-input": {
    border: "none",
    width: "160px",
    outline: "none",
    borderRadius: "50px",
    height: "6px",
    "&:focus": {
      outline: "none",
      boxShadow: "none",
      borderColor: "transparent",
    },
  },
  "& .MuiInputAdornment-root": {
    "&:focus": {
      outline: "none",
      boxShadow: "none",
      borderColor: "transparent",
    },
  },
});

export default Booking;
