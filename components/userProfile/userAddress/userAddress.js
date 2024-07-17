import React, { useEffect, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";
import AddUserAddress from "./addUserAddress";
import {
  deleteAddress,
  getAddress,
  setDefaultAddress,
} from "@/api/account.api";
import { Paper } from "@mui/material";
import Notify from "@/utils/notify";
import Swal from "sweetalert2";
import UpdateUserAddress from "./updateAddress";
import Skeleton from "@mui/material/Skeleton";
import styles from "../userInformation.module.css";

function UserAddress() {
  const [addAddressOpen, setAddAddressOpen] = useState(false);
  const [updateAddressOpen, setUpdateAddressOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleClickOpen = () => {
    setAddAddressOpen(!addAddressOpen);
  };

  const handleIconClick = (event, address) => {
    event.preventDefault();
    setSelectedAddress(address);
    setMenuOpen(!menuOpen);
  };

  const handleUpdateAddressOpen = () => {
    setUpdateAddressOpen(!updateAddressOpen);
    setMenuOpen(false);
  };

  const handleSetDefaultAddress = async () => {
    try {
      const res = await setDefaultAddress(selectedAddress.id);
      setMenuOpen(false);
      fetchAddress();
    } catch (error) {
      Notify.error(error.message);
    }
  };

  const onDelete = () => {
    setMenuOpen(false);
    Swal.fire({
      title: "Are you sure?",
      text: "Are you want to delete this address?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "black",
      confirmButtonBorder: "none",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteAddress();
      }
    });
  };

  const handleDeleteAddress = async () => {
    try {
      const res = await deleteAddress(selectedAddress.id);
      setMenuOpen(false);
      fetchAddress();
    } catch (error) {
      Notify.error(error.message);
    }
  };

  const fetchAddress = async () => {
    try {
      const res = await getAddress();
      setAddresses(res?.data?.data || []);
      setLoading(false);
    } catch (error) {
      Notify.error(error.message);
      setLoading(true);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  // Skeletons for loading state
  const skeletons = (
    <>
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          style={{ display: "flex", flexDirection: "column", gap: "5px" }}
        >
          <Skeleton variant="text" width="100%" height={120} />
        </div>
      ))}
    </>
  );

  return (
    <>
      <div className={styles.manageAddress}>
        <div className={styles.manageDetails}>
          <h5>Manage Addresses</h5>
          <button onClick={handleClickOpen}>
            <IoMdAdd /> ADD A NEW ADDRESS
          </button>
          {loading ? (
            skeletons
          ) : addresses.length > 0 ? (
            addresses.map((item, index) => (
              <div key={index} className={styles.addressDetails}>
                <HiOutlineDotsVertical
                  className={styles.dotted}
                  onClick={(e) => handleIconClick(e, item)}
                />
                <h4 className="fw-bold">{item.landmark}</h4>
                {item.isDefault && (
                  <span className={styles.default_address}>Default</span>
                )}
                <p>
                  <span className="fw-bold"></span>
                  {`${item.houseNo}, ${item.streetAddress} ${item.city} ${item.state}, ${item.country} ${item.pincode}`}
                </p>
              </div>
            ))
          ) : (
            <div className={styles.noAddress}>No address available</div>
          )}
        </div>
        <AddUserAddress
          updatedData={fetchAddress}
          show={addAddressOpen}
          onHide={() => setAddAddressOpen(false)}
        />
      </div>
      {menuOpen && selectedAddress && (
        <Paper elevation={2} className={styles.AddressMenu}>
          <button onClick={handleUpdateAddressOpen}>Edit</button>
          <button onClick={handleSetDefaultAddress}>Set Default</button>
          <button onClick={onDelete}>Delete</button>
        </Paper>
      )}
      <UpdateUserAddress
        data={selectedAddress}
        show={updateAddressOpen}
        onHide={() => setUpdateAddressOpen(false)}
      />
    </>
  );
}

export default UserAddress;
