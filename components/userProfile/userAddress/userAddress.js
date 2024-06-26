"use client"
import styles from '../userInformation.module.css';
import { useEffect, useState } from 'react';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { IoMdAdd } from 'react-icons/io';
import AddUserAddress from './addUserAddress';
import { deleteAddress, getAddress, setDefaultAddress } from '@/api/account.api';
import { Paper } from '@mui/material';
import Notify from '@/utils/notify'
import Swal from 'sweetalert2';
import UpdateUserAddress from './updateAddress';

function UserAddress() {
    const [addAddressOpen, setAddAddressOpen] = useState(false);
    const [updateAddressOpen, setUpdateAddressOpen] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

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
        // Add logic to handle setting default address
        try {
            const res = await setDefaultAddress(selectedAddress.id)
            setMenuOpen(false);
            fetchAddress();
        } catch (error) {
            Notify.error(error.message)
        }

    };
    const onDelete = () => {
        setMenuOpen(false);
        // Show confirmation dialog
        Swal.fire({
            title: "Are you sure?",
            text: "Are you want to delete this address?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "black",
            confirmButtonBorder:"none",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                handleDeleteAddress();
            }
        });
    }


        const handleDeleteAddress = async () => {
            try {
                const res = await deleteAddress(selectedAddress.id)
                setMenuOpen(false);
                fetchAddress();
            } catch (error) {
                Notify.error(error.message)
            }

        };

        const fetchAddress = async () => {
            try {
                const res = await getAddress();
                setAddresses(res?.data?.data);
            } catch (error) {
                Notify.error(error.message)
            }
        };
        useEffect(()=>{
            fetchAddress();
        },[])
        return (
            <>
                <div className={styles.manageAddress}>
                    <div className={styles.manageDetails}>
                        <h5>Manage Addresses</h5>
                        <button onClick={handleClickOpen}><IoMdAdd />ADD A NEW ADDRESS</button>
                        {addresses.map((item, index) => (
                            <div key={index} className={styles.addressDetails}>
                                <HiOutlineDotsVertical className={styles.dotted} onClick={(e) => handleIconClick(e, item)} />
                                    <h4 className='fw-bold'>{item.landmark}</h4>
                                <p><span className='fw-bold'></span>{`${item.houseNo}, ${item.streetAddress} ${item.city} ${item.state} ,${item.country} ${item.pincode}`} </p>
                                {/* <p><span className='fw-bold'>Pin Code:&nbsp;</span>{item.pincode} </p> */}
                                {/* <p><span className='fw-bold'>State:&nbsp;</span>{item.state} </p> */}
                                {/* <p className='fw-bold '>{item.isDefault}</p> */}
                            </div>
                        ))}
                    </div>
                    <AddUserAddress updatedData={fetchAddress} show={addAddressOpen} onHide={() => setAddAddressOpen(false)} />
                </div>
                {menuOpen && selectedAddress && (
                    <Paper elevation={2} className={styles.AddressMenu}>
                        <button onClick={handleUpdateAddressOpen}>Edit</button>
                        <button onClick={handleSetDefaultAddress}>Set Default</button>
                        <button onClick={onDelete}>Delete</button>
                    </Paper>
                )}
                <UpdateUserAddress data={selectedAddress} show={updateAddressOpen} onHide={()=>setUpdateAddressOpen(false)}/>
            </>
        );
    }

    export default UserAddress;
