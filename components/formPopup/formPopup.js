import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';

const FormPopup = ({ title,initialValues, handleSubmit, validationSchema,btn, onHide,show }) => {
    return (
        <Modal
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={onHide}
            show={show}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className='fw-bold py-2'>
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                     {({ errors, touched }) => (
                        <Form  id="submit">
                             <div className="form-group">
                                <label className='fw-bold py-2'>Name</label>
                                <Field type="text" name="landmark" className={`form-control ${touched.landmark && errors.landmark ? 'is-invalid' : ''}`} />
                                <ErrorMessage name="landmark" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label className='fw-bold py-2'>Street Address</label>
                                <Field type="text" name="streetAddress" className={`form-control ${touched.streetAddress && errors.streetAddress ? 'is-invalid' : ''}`} />
                                <ErrorMessage name="streetAddress" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label className='fw-bold py-2'>House No</label>
                                <Field type="text" name="houseNo" className={`form-control ${touched.houseNo && errors.houseNo ? 'is-invalid' : ''}`} />
                                <ErrorMessage name="houseNo" component="div" className="invalid-feedback" />
                            </div>
                           
                            <div className="form-group">
                                <label className='fw-bold py-2'>Pin Code</label>
                                <Field type="text" name="pincode" className={`form-control ${touched.pincode && errors.pincode ? 'is-invalid' : ''}`} />
                                <ErrorMessage name="pincode" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label className='fw-bold py-2'>State</label>
                                <Field type="text" name="state" className={`form-control ${touched.state && errors.state ? 'is-invalid' : ''}`} />
                                <ErrorMessage name="state" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label className='fw-bold py-2'>City</label>
                                <Field type="text" name="city" className={`form-control ${touched.city && errors.city ? 'is-invalid' : ''}`} />
                                <ErrorMessage name="city" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label className='fw-bold py-2'>Country</label>
                                <Field type="text" name="country" className={`form-control ${touched.country && errors.country ? 'is-invalid' : ''}`} />
                                <ErrorMessage name="country" component="div" className="invalid-feedback" />
                            </div>


                        </Form>
                    )}
                </Formik>
            </Modal.Body>
            <Modal.Footer>
                <Button style={{ backgroundColor: "black", color: "white", border: "none" }} form="submit" type="submit">{btn}</Button>
                <Button style={{ backgroundColor: "grey", color: "white", border: "none" }} onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default FormPopup;
