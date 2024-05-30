"use client"
import styles from '../userInformation.module.css'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Formik, Form, Field } from 'formik';
import Session from '@/service/session'
import { UpdateUserProfile, fileUploaders, getUserProfile } from '@/api/account.api'
import Notify from '@/utils/notify'
import { AiOutlineEdit } from 'react-icons/ai';

function UserProfile() {
    const [userInfo, setUserInfo] = useState(null);
    const [editModes, setEditModes] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    console.log("userInfo::>",userInfo);

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
    }, []);

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

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        if (file) {
            setImagePreview(URL.createObjectURL(file));
            try {
                const imagePath = await handleOnFileSelect(file);
                console.log("imagePath::>",imagePath);
                setImagePreview(imagePath);
                // Assuming you want to update userInfo with the new image URL
                setUserInfo(prevState => ({ ...prevState, profileImageUrl: imagePath }));
            } catch (error) {
                console.error('Error uploading image:', error);
                Notify.error(error.message);
            }
        }
    };

    const handleSubmit = async (values) => {
        console.log("values::>", values)
        const updatedData = { ...values };
        console.log("updatedData::>",updatedData);
        
        // if (imageFile) {
        //     updatedData.profileImageUrl = imagePreview; // Assuming you handle image upload on server-side
        // }

        try {
            const res = await UpdateUserProfile(updatedData);
            console.log("UpdateUserProfile::>", res)
            setEditModes(false);
            fetchUserDetails();
        } catch (error) {
            console.log("error", error);
            Notify.error(error.message);
        }
    }

    const handleOnFileSelect = async (file) => {
        try {
            const response = await fileUploaders({ fileName: file.name });
            console.log("resImage::>",response);
            const requestOptions = {
                method: 'PUT',
                body: file,
                headers: {
                    'Content-Type': file.type,
                },
            };
            await fetch(response.data.data.url, requestOptions);
            let imagePath = response.data.data.path;
            return imagePath;
        } catch (error) {
            console.error('Error uploading image:', error);
            Notify.error(error.message);
        }
    };

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
                            <div className={styles.imageRow}>
                                <div className={styles.userImageDiv}>
                                    <Image
                                        src={imagePreview || values.profileImageUrl}
                                        alt='user profile'
                                        width={100}
                                        height={100}
                                        className={styles.profileImage}
                                    />
                                    {editModes && (
                                        <div className={styles.editImageIcon} onClick={() => document.getElementById('imageUpload').click()}>
                                            <AiOutlineEdit />
                                        </div>
                                    )}
                                    <input
                                        id="imageUpload"
                                        type="file"
                                        accept="image/*"
                                        className={styles.editImageInput}
                                        onChange={handleImageChange}
                                    />
                                </div>
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
