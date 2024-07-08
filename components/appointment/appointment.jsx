'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { RxCalendar } from "react-icons/rx";
import RescheduleAppointment from "../resheduleAppointMent/rescheduleAppointMent";
import Ratings from "../rating&review/rating";
import { ImMenu } from "react-icons/im";
import { ImCross } from "react-icons/im";
import { deleteAppointment, getAppointment, getInvoice } from "@/api/account.api";
import { MdOutlineFileDownload } from "react-icons/md";
import Swal from "sweetalert2";
import Link from "next/link";
import Session from "@/service/session";
import Notify from "@/utils/notify";
import styles from "./appointment.module.css";

const Appointments = () => {
  const [appointmentShow, setShowAppointment] = useState(true);
  const [rescheduleShow, setRescheduleShow] = useState(false);
  const [ratingShow, setRatingShow] = useState(false);
  const [invoice, setInvoice] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null); // Initialize with null
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [statusFilter, setStatusFilter] = useState("pending");
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const id = Session.get("appointmentId");

  useEffect(() => {
    fetchAppointments();
  }, [statusFilter]);

  const fetchAppointments = async () => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const res = await getAppointment(statusFilter);
      setAppointments(res.data.data);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      setLoading(false); // Ensure loading is set to false on error too
      Notify.error(error.message);
    }
  };

  useEffect(() => {
    const filterAppointments = () => {
      const filtered = appointments.filter((appointment) => {
        const isStatusMatch =
          statusFilter === "cancelled"
            ? ["cancelled", "rejected"].includes(
                appointment.status.toLowerCase()
              )
            : appointment.status.toLowerCase() === statusFilter.toLowerCase();
        const isDateMatch = selectedDate
          ? new Date(appointment.date).toISOString().split("T")[0] ===
            selectedDate
          : true;
        return isStatusMatch && isDateMatch;
      });
      setFilteredAppointments(filtered);
    };

    filterAppointments();
  }, [statusFilter, selectedDate, appointments]);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await getInvoice(id);
        setInvoice(res.data.data);
      } catch (error) {
        Notify.error(error.message);
      }
    };
    if (id) {
      fetchInvoice();
    }
  }, [id]);

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleShowReschedule = (appointment) => {
    setSelectedAppointment(appointment);
    setRescheduleShow(true);
    setShowAppointment(false);
    setRatingShow(false);
  };

  const handleShowAppointment = () => {
    setShowAppointment(true);
    setRescheduleShow(false);
    setRatingShow(false);
  };

  const handleShowRating = (appointment) => {
    setSelectedAppointment(appointment);
    setShowAppointment(false);
    setRescheduleShow(false);
    setRatingShow(true);
  };

  const handleToggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleDelete = (appointment) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this appointment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "black",
      confirmButtonBorder: "none",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        cancelAppointment(appointment);
      }
    });
  };

  // Commented out line: Notify.log(error.message);

  const cancelAppointment = async (appointment) => {
    try {
      const data = {
        type: "cancel",
        cancelReason: "change my plan",
      };
      const res = await deleteAppointment(data, appointment.id);
      fetchAppointments();
    } catch (error) {
      Notify.log(error.message); // Notify.log used instead of Notify.error
    }
  };

  const handleDownloadInvoice = async () => {
    try {
      const invoicePath = invoice.invoicePath;
      const link = document.createElement("a");
      link.href = invoicePath;
      link.setAttribute("download", "");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      Notify.error(error.message);
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const month = monthNames[d.getMonth()];
    const day = String(d.getDate()).padStart(2, "0");
    return `${day} ${month} ${year}`;
  };

  const [menuVisible, setMenuVisible] = useState(true);
  const [scheduleShowVisible, setShowScheduleVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setShowScheduleVisible(false);
        setMenuVisible(false);
      } else {
        setShowScheduleVisible(true);
        setMenuVisible(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {loading && <p className={styles.loadingPage}>Loading...</p>}
      {!loading && appointmentShow && (
        <div className={styles.container}>
          <h3 className={styles.titleAppointment}>My Appointments</h3>
          {menuVisible ? (
            <ImCross className={styles.humburgerCross} onClick={handleToggleMenu} />
          ) : (
            <ImMenu className={styles.humburger} onClick={handleToggleMenu} />
          )}
          {(scheduleShowVisible || menuVisible) && (
            <div className={styles.userInputs}>
              <div className={styles.userInput}>
                <p>Status</p>
                <select
                  className={styles.selects}
                  value={statusFilter}
                  onChange={handleStatusChange}
                >
                  <option value="pending">Upcoming</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className={styles.userInput}>
                <p>Date</p>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
            </div>
          )}
          <div className={styles.upcomingScheduleContainer}>
            {filteredAppointments.map((data, index) => (
              <div
                className={`${styles.upcomingSchedule} ${
                  statusFilter === "completed" ? styles.greyBackground : ""
                }`}
                key={index}
              >
                <div className={styles.images}>
                  <Image
                    src={data.salon.mainGateImageUrl}
                    alt="image"
                    height={100}
                    width={100}
                  />
                </div>
                <div className={styles.upcomingDetails}>
                  <h5>{data.salon.name}</h5>
                  <p>
                    <RxCalendar />
                    <span>{formatDate(data.date)}</span>
                  </p>
                  <p>
                    <HiOutlineLocationMarker />
                    <span>{data.salon.address}</span>
                  </p>
                  <p>
                    Services-{" "}
                    {data.services.map((item) => item.serviceName).join(", ")}
                  </p>
                  <p>
                    Status-<span className={styles.circles}></span>
                    {data.status}
                  </p>
                </div>
                <div className={styles.buttons}>
                  {data.status === "PENDING" && (
                    <button onClick={() => handleShowReschedule(data)}>
                      Re-Schedule
                    </button>
                  )}
                  {data.status === "PENDING" && (
                    <button onClick={() => handleDelete(data)}>Cancel</button>
                  )}
                </div>
                {data.status !== "PENDING" && (
                  <div className={styles.buttonsPast}>
                    <Link href={`appointment/${data.id}`}>
                      <button>View Details</button>
                    </Link>
                    {data.status === "COMPLETED" && (
                      <button
                        onClick={() => handleShowRating(data)}
                        className={styles.rating}
                      >
                        Rate & Review
                      </button>
                    )}
                  </div>
                )}
                {data.status === "COMPLETED" && (
                  <div className={styles.downloadInvoice}>
                    <div className={styles.load}>
                      <MdOutlineFileDownload onClick={handleDownloadInvoice} />
                    </div>
                    <p
                      onClick={handleDownloadInvoice}
                      className={styles.inVoiceBtn}
                    >
                      Download Invoice
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {rescheduleShow && (
        <RescheduleAppointment
          handleShowAppointment={handleShowAppointment}
          selectedAppointment={selectedAppointment}
          appointment={fetchAppointments}
        />
      )}
      {ratingShow && (
        <Ratings
          selectedAppointment={selectedAppointment}
          handleShowAppointment={handleShowAppointment}
        />
      )}
    </>
  );
};

export default Appointments;
