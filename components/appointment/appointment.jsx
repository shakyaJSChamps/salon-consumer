"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { RxCalendar } from "react-icons/rx";
import RescheduleAppointment from "../resheduleAppointMent/rescheduleAppointMent";
import Ratings from "../rating&review/rating";
import { ImMenu, ImCross } from "react-icons/im";
import { MdOutlineFileDownload } from "react-icons/md";
import { MdOutlineWatchLater } from "react-icons/md";
import Swal from "sweetalert2";
import Link from "next/link";
import {
  deleteAppointment,
  getAppointment,
  getInvoice,
} from "@/api/account.api";
import Notify from "@/utils/notify";
import styles from "./appointment.module.css";
import { Skeleton } from "@mui/material";

const Appointments = () => {
  const [showAppointment, setShowAppointment] = useState(true);
  const [rescheduleShow, setRescheduleShow] = useState(false);
  const [ratingShow, setRatingShow] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [statusFilter, setStatusFilter] = useState("pending");
  const [selectedDate, setSelectedDate] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [scheduleShowVisible, setShowScheduleVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, [statusFilter]);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await getAppointment(statusFilter);
      setAppointments(res.data.data);
      setLoading(false);
    } catch (error) {
      Notify.error(error.message);
      setLoading(true);
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

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    toggleMenu();
  };
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    toggleMenu();
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
  const toggleMenu = () => {
    if (window.innerWidth <= 768) {
      setShowScheduleVisible(false);
      setMenuVisible(false);
    }
  };
  const handleDelete = (appointment) => {
    const inputOptions = {
      "Change of plan": "Change of plan",
      "Not available at the time": "Not available at the time",
      "Rebook for another time": "Rebook for another time",
      "Find great deal somewhere else": "Find great deal somewhere else",
      "Reason not here, Type here": "Reason not here, Type here",
    };

    const inputOptionsHtml = Object.entries(inputOptions)
      .map(
        ([value, label]) =>
          `<div style="margin-bottom: 10px; display: flex; justify-content: space-between;">
            <label for="${value}" style="margin-right: 10px;">${label}</label>
            <input type="radio" id="${value}" name="cancelReason" value="${value}" style="cursor: pointer;">
          </div>`
      )
      .join("");

    Swal.fire({
      title: `<span class='${styles.title}'>Select Cancel Reason</span>`,
      html: `
      <div class="${styles.bulletList}">
        ${inputOptionsHtml}
        <textarea id="customReasonTextarea" class="${styles.textarea}" style="display: none;" placeholder="Type your reason here"></textarea>
      </div>
      <div class="${styles.buttonContainer}">
        <button id="cancelButton" class="${styles.cancelButton}">Cancel</button>
        <button id="confirmButton" class="${styles.confirmButton}">Confirm</button>
      </div>
    `,
      showConfirmButton: false,
      customClass: {
        popup: styles.swalPopup,
        container: styles.swalContainer,
      },
      didOpen: () => {
        const confirmButton = document.getElementById("confirmButton");
        const cancelButton = document.getElementById("cancelButton");
        const customReasonTextarea = document.getElementById(
          "customReasonTextarea"
        );
        document
          .querySelectorAll('input[name="cancelReason"]')
          .forEach((input) => {
            input.addEventListener("change", () => {
              if (input.value === "Reason not here, Type here") {
                customReasonTextarea.style.display = "block";
              } else {
                customReasonTextarea.style.display = "none";
              }
            });
          });
        confirmButton.addEventListener("click", async () => {
          const selectedReason = document.querySelector(
            'input[name="cancelReason"]:checked'
          );
          const finalReason =
            selectedReason.value === "Reason not here, Type here"
              ? customReasonTextarea.value
              : selectedReason.value;
          if (
            !selectedReason ||
            (selectedReason.value === "Reason not here, Type here" &&
              !customReasonTextarea.value)
          ) {
            Swal.showValidationMessage(
              "You need to choose a reason or type one!"
            );
          } else {
            await cancelAppointment(appointment, finalReason);
            Swal.close();
          }
        });

        cancelButton.addEventListener("click", () => {
          Swal.close();
        });
      },
    });
  };

  const cancelAppointment = async (appointment, cancelReason) => {
    try {
      const data = {
        type: "cancel",
        cancelReason,
      };
      const res = await deleteAppointment(data, appointment.id);
      Notify.success(res.data.message);
      fetchAppointments();
    } catch (error) {
      Notify.error(error.message);
    }
  };

  const handleDownloadInvoice = async (appointment) => {
    try {
      if (appointment && appointment.id) {
        const res = await getInvoice(appointment.id);
        const invoicePath = res.data.data.invoicePath;

        // Initiate download
        const link = document.createElement("a");
        link.href = invoicePath;
        link.setAttribute("download", "");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        Notify.error("No appointment ID found to download invoice");
      }
    } catch (error) {
      Notify.error(error.message);
    }
  };

  function formatDate(dateString) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const [day, month, year] = dateString.split("-");
    const monthIndex = parseInt(month, 10) - 1; // Convert month to 0-based index

    const formattedDate = `${day}-${months[monthIndex]}-${year}`;
    return formattedDate;
  }

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 767;
      setIsMobileView(isMobile);
      if (!isMobile) {
        setMenuVisible(true);
      } else {
        setMenuVisible(false);
      }
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const skeleton = Array.from({ length: 5 }, (_, index) => (
    <div key={index} className={styles.upcomingSchedule}>
      <Skeleton variant="rectangular" width={180} height={180} />
      <div className={styles.skeletonContent}>
        <Skeleton variant="rectangular" width={230} height={20} />
        <Skeleton variant="rectangular" width={230} height={20} />
        <Skeleton variant="rectangular" width={230} height={20} />
        <Skeleton variant="rectangular" width={230} height={20} />
        <Skeleton variant="rectangular" width={230} height={20} />
        <Skeleton variant="rectangular" width={230} height={20} />
      </div>
      <div className={styles.buttons}>
        <Skeleton variant="rectangular" width={100} height={40} />
        <Skeleton variant="rectangular" width={100} height={40} />
      </div>
    </div>
  ));

  return (
    <>
      {showAppointment && (
        <div className={styles.container}>
          <h3 className={styles.titleAppointment}>My Appointments</h3>
          {menuVisible ? (
            <ImCross
              className={styles.humburgerCross}
              onClick={handleToggleMenu}
            />
          ) : (
            <ImMenu className={styles.humburger} onClick={handleToggleMenu} />
          )}
          {(menuVisible || !isMobileView) && (
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
                  // onChange={(e) => setSelectedDate(e.target.value)}
                  onChange={handleDateChange}
                />
              </div>
            </div>
          )}
          {!loading ? (
            <div
              className={`${styles.upcomingScheduleContainer} ${
                filteredAppointments && filteredAppointments.length === 1
                  ? styles.singleAppointment
                  : ""
              }`}
            >
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((data, index) => (
                  <div
                    className={`${styles.upcomingSchedule} ${
                      data.status === "completed" ? styles.greyBackground : ""
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
                        {/* <span>{data.date}</span> */}
                      </p>

                      {data.status === "PENDING" && (
                        <p>
                          <MdOutlineWatchLater />

                          <span>{data.startTime}</span>
                        </p>
                      )}

                      <p>
                        <HiOutlineLocationMarker />
                        <span>{data.salon.address}</span>
                      </p>
                      <p>
                        Services-
                        {data.services
                          .map((item) => item.serviceName)
                          .join(", ")}
                      </p>
                      <p>
                        Status-
                        <span
                          className={`${styles.circles} ${
                            data.status === "COMPLETED"
                              ? styles.completed
                              : data.status === "CANCELLED" ||
                                data.status === "REJECTED"
                              ? styles.cancelled
                              : styles.pending
                          }`}
                        ></span>
                        {data.status === "COMPLETED"
                          ? "COMPLETED"
                          : data.status === "CANCELLED" ||
                            data.status === "REJECTED"
                          ? "CANCELLED BY YOU"
                          : "PENDING"}
                      </p>
                    </div>
                    <div className={styles.containerBtn}>
                      <div className={styles.buttons}>
                        {data.status === "PENDING" && (
                          <button onClick={() => handleShowReschedule(data)}>
                            Re-Schedule
                          </button>
                        )}
                        {data.status === "PENDING" && (
                          <button onClick={() => handleDelete(data)}>
                            Cancel
                          </button>
                        )}
                      </div>
                      {data.status === "PENDING" && (
                        <div className={styles.buttonDetail}>
                          <Link href={`appointment/${data.id}`}>
                            View Details
                          </Link>
                        </div>
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
                          <MdOutlineFileDownload
                            onClick={() => handleDownloadInvoice(data)}
                          />
                        </div>
                        <p
                          onClick={() => handleDownloadInvoice(data)}
                          className={styles.inVoiceBtn}
                        >
                          Download Invoice
                        </p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className={styles.noApp}>No appointments available.</p>
              )}
            </div>
          ) : (
            skeleton
          )}
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
