import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { getAddress } from '@/api/account.api';
import { IoMdAdd } from 'react-icons/io';
import styles from './addressPopUp.module.css'

function AddressPopup(props) {
    const [addresses, setAddresses] = useState([]);
    console.log("addressPopup", addresses)
    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const res = await getAddress();
                setAddresses(res?.data?.data);
            } catch (error) {
                console.log("error===>", error);
            }
        };
        fetchAddress();
    }, []);
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className={styles.manageDetails}>
                    {addresses.map((item, index) => (
                        <div key={index} className={styles.addressDetails} onClick={() => props.onSelectAddress(item)}>
                            <p><span className='fw-bold'>Address:&nbsp; </span>{`${item.houseNo} ${item.streetAddress} ${item.landmark}, ${item.city}`} </p>
                            <p><span className='fw-bold'>Pin Code:&nbsp;</span>{item.pincode} </p>
                            <p><span className='fw-bold'>State:&nbsp;</span>{item.state} </p>
                            {/* <p className='fw-bold '>{item.isDefault}</p> */}
                        </div>
                    ))}
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default AddressPopup
