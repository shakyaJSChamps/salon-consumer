import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { styled } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import * as Yup from "yup";
import styles from "./reschedule.module.css";
import { rescheduleAppointment } from "@/api/account.api";
import Notify from "@/utils/notify";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { TextField } from "@mui/material";

function TimePickerViewRenderers({ value, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["TimePicker"]}>
        <CustomTimePicker
          value={value}
          onChange={(newValue) => onChange(newValue)}
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock,
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

const RescheduleAppointment = ({
  handleShowAppointment,
  selectedAppointment,
  appointment,
}) => {
  const today = dayjs().startOf("day");
  const maxDate = dayjs().add(10, "day").endOf("day");
  const router = useRouter();

  const initialValues = {
    bookingDate: null,
    timeSlot: null,
  };

  const validationSchema = Yup.object().shape({
    bookingDate: Yup.date().required("Booking date is required"),
    timeSlot: Yup.string().required("Time slot is required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const formattedTime = dayjs(values.timeSlot).format("hh:mm A");
      const formattedDate = dayjs(values.bookingDate).format("DD-MM-YYYY");


      const data = {
        type: "reschedule",
        date: formattedDate,
        startTime: formattedTime,
      };
      const AppointmentReschedule = await rescheduleAppointment(
        data,
        selectedAppointment.id
      );
      Notify.success("Appointment rescheduled successfully.");
      setSubmitting(false);
      handleShowAppointment();
      appointment();
    } catch (error) {
      Notify.error(error.message);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={styles.container}>
        <div className={styles.schedule}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <div className={styles.form}>
                  <div className={styles.reschedule}>
                    <IoIosArrowBack
                      className={styles.backIcon}
                      onClick={() =>handleShowAppointment()

                      }
                    />

                    <h4>Booking date</h4>
                    <div>
                      <Field name="date">
                        {({ field, form }) => (
                           <CustomDatePicker
                           {...field}
                           value={field.value ? dayjs(field.value) : null}
                           onChange={(date) => {
                             form.setFieldValue("bookingDate", date);
                           }}
                            minDate={today}
                            maxDate={maxDate}
                            format="DD-MM-YYYY"
                            renderInput={(params) => <TextField {...params} />}
                          />
                        )}
                      </Field>
                    </div>
                    <ErrorMessage
                      name="bookingDate"
                      component="div"
                      className="error"
                    />
                  </div>

                  <div className={styles.rescheduleTime}>
                    <h4>Select time slot</h4>
                    <Field name="timeSlot" className={styles.timeSlot}>
                      {({ field }) => (
                        <TimePickerViewRenderers
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(newValue) => {
                          setFieldValue("timeSlot", newValue);
                        }}
                          className={styles.timeSlot}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="timeSlot"
                      component="div"
                      className="error"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={styles.btn}
                  >
                    Reschedule
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </LocalizationProvider>
  );
};

const CustomTimePicker = styled(TimePicker)({
  "& .MuiInputBase-root": {
    border: "2px solid grey",
    boxShadow: "2px 3px 7px #a1acb0",

    width: "100%",
    "&:focus": {
      borderColor: "transparent",
      boxShadow: "none",
    },
    "& .MuiOutlinedInput-root": {
      "&:focus, &:focus-within": {
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "transparent",
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
  "& .MuiOutlinedInput-root": {
    "&:focus": {
      borderColor: "transparent",
      boxShadow: "none",
    },
  },
  "& .MuiInputBase-input": {
    border: "none",
    width: "340px",
    outline: "none",
    borderRadius: "13px",
    height: "6px",
    "@media (max-width: 500px)": {
      width: "270px",
    },
    "@media (max-width: 400px)": {
      width: "220px",
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
export default RescheduleAppointment;
