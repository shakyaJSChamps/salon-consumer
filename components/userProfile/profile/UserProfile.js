"use client"
import styles from '../userInformation.module.css'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Formik, Form, Field } from 'formik';
import Session from '@/service/session'
import { UpdateUserProfile, getUserProfile } from '@/api/account.api'
import Notify from '@/utils/notify'

function UserProfile() {
    const [userInfo, setUserInfo] = useState(null)
    // const userInfo = Session.getObject("profile");
    console.log("user info", userInfo);

    const fetchUserDetails = async () => {
        try {
            const userDetails = await getUserProfile();
            setUserInfo(userDetails?.data?.data);
        } catch (error) {
            Notify.error(error.message);
            console.log("errorUser:::>", error);
        }
    }

    useEffect(() => {
        fetchUserDetails();
    }, [])

    const [editModes, setEditModes] = useState(false);

    const initialValues = {
        profileImageUrl: userInfo?.profileImageUrl || '',
        name: userInfo?.name || '',
        email: userInfo?.email || '',
        gender: userInfo?.gender || '',
        address: userInfo?.address || '',
        phoneNumber: userInfo?.phoneNumber || '',
    };

    const handleEditClick = () => {
        setEditModes(!editModes);
    };

    const handleSubmit = async (values) => {
        console.log("values::>", values)
        const updatedData = values;

        try {
            const res = await UpdateUserProfile(updatedData)
            console.log("UpdateUserProfile::>", res)
            setEditModes(false);
            fetchUserDetails();
        } catch (error) {
            console.log("error", error)
            Notify.error(error.message);
        }
    }

    return (
        <div className={styles.profileDetails}>
            {userInfo && (
                <Formik
                    initialValues={initialValues}
                    enableReinitialize={true}
                    onSubmit={handleSubmit}
                >
                    {({ values }) => (
                        <Form className={styles.form}>
                            <div className={styles.userImageDiv}>
                                <Image
                                    src={values.profileImageUrl}
                                    alt='user profile'
                                    width={100}
                                    height={100}
                                />
                                {!editModes && (
                                    <button
                                        className={styles.saves}
                                        type="button"
                                        onClick={handleEditClick}
                                    >
                                        Edit
                                    </button>
                                )}
                            </div>
                            <div className={styles.details}>
                                <div className={styles.name}>
                                    <label className={styles.label}>Name</label>
                                    <Field type="text" name="name" disabled={!editModes} />
                                </div>
                            </div>
                            <div className={styles.otherDetails}>
                                <label className={styles.label}>Email</label>
                                <Field type="text" name="email" disabled={!editModes} />
                            </div>
                            <div className={styles.details}>
                                <div className={styles.info}>
                                    <label className={styles.label}>Gender</label>
                                    <Field as="select" name="gender" className={styles.select} disabled={!editModes}>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </Field>
                                </div>
                            </div>
                            <div className={styles.otherDetails}>
                                <label className={styles.label}>Address</label>
                                <Field type="text" name="address" className={styles.address} disabled={!editModes} />
                            </div>
                            <div className={styles.details}>
                                <div className={styles.infoNumber}>
                                    <label className={styles.label}>Contact Number</label>
                                    <Field type="text" name="phoneNumber" className={styles.number} disabled={!editModes} />
                                </div>
                            </div>

                            {editModes && <button className={styles.saves} type="submit">Save</button>}
                        </Form>
                    )}
                </Formik>
            )}
        </div>
    )
}

export default UserProfile;
