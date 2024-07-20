"use client";
import styles from "./booking.module.css";
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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { TextField } from "@mui/material";

function TimePickerViewRenderers({ value, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CustomDemoContainer components={["TimePicker"]}>
        <CustomTimePicker
          value={value}
          onChange={onChange}
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock,
          }}
        />
      </CustomDemoContainer>
    </LocalizationProvider>
  );
}
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
  const today = dayjs().startOf("day");
  const maxDate = dayjs().add(10, "day").endOf("day");
  const initialValues = {
    salonId: parseInt(salonId),
    date: today,
    startTime: "",
    serviceType: gender,
    duration: totalServiceDuration,
    homeService: props.serviceAt === "Home",
    serviceIds: serviceIds,
  };

  const handleShowAddress = () => {
    setShowAddress(!showAddress);
  };

  const handleAddressSelection = (address) => {
    setSelectedAddress(address);
    setShowAddress(false);
  };

  const validationSchema = Yup.object().shape({
    date: Yup.date()
      // .required("Date is required")
      .min(today, "Date cannot be in the past"),
    startTime: Yup.string().required("Start time is required"),
  });

  const calculateEndTime = (startTime, duration) => {
    if (startTime && duration) {
      const start = dayjs(startTime, "hh:mm A");
      const end = start.add(duration, "minute");
      return end.format("hh:mm A");
    }
    return "";
  };

  function handleSubmit(values) {
    // Convert startTime to the required format
    const formattedStartTime = dayjs(values.startTime).format("hh:mm A");
    const formattedDate = dayjs(values.date).format("DD-MM-YYYY");

    const data = {
      ...(props.serviceAt === "Home"
        ? {
            salonId: values.salonId,
            date: formattedDate,
            startTime: formattedStartTime,
            serviceType: gender,
            addressId: selectedAddress?.id,
            duration: values.duration,
            homeService: true,
            serviceIds: serviceIds,
          }
        : {
            ...values,
            date: formattedDate,
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

                    <div className={styles.totalPrice}></div>
                  </div>
                </div>

                {servicesDetails.map((service, index) => (
                  <div key={index} className={styles.serviceType}>
                    <div className={styles.price}>
                      <div className={styles.serviceList}>
                        <ul>
                          <li>
                            {service.serviceName} for {service.type} x
                            {totalCount}
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
                    <Field name="date">
                      {({ field, form }) => (
                        <CustomDatePicker
                          {...field}
                          value={
                            field.value
                              ? dayjs(field.value, "DD-MM-YYYY")
                              : null
                          }
                          onChange={(date) => {
                            setFieldValue("date", date);
                          }}
                          minDate={today}
                          maxDate={maxDate}
                          format="DD-MM-YYYY"
                          renderInput={(params) => <TextField {...params} />}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="date"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>

                <div className={styles.timeContainer}>
                  <h3>Select time slot</h3>
                  <div className={styles.timePicker}>
                    <Field name="startTime">
                      {({ field }) => (
                        <TimePickerViewRenderers
                          value={field.value || null}
                          onChange={(value) => {
                            setFieldValue("startTime", value);
                            setEndTime(
                              calculateEndTime(value, values.duration)
                            );
                          }}
                          className={styles.timeSlot}
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
                      type="text"
                      name="serviceType"
                      placeholder="serviceType"
                      value={gender}
                    ></Field>

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
const CustomDatePicker = styled(DatePicker)({
  "& .MuiOutlinedInput-root": {
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
  },
  "& .MuiInputAdornment-root": {
    marginLeft: "-50px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
});
const CustomDemoContainer = styled(DemoContainer)({
  "& .MuiTimeClock-root": {
    "&:focus": {
      outline: "none",
      boxShadow: "none",
      borderColor: "transparent",
    },
  },
});
export default Booking;
