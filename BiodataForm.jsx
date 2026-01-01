import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaUser, FaIdCard, FaPhone, FaHome, FaHeartbeat } from 'react-icons/fa';

const validationSchema = Yup.object({
  fullName: Yup.string().required('Full Name is required'),
  fatherName: Yup.string().required("Father's Name is required"),
  cnic: Yup.string()
    .matches(/^\d{5}-\d{7}-\d{1}$/, 'CNIC must be in format: 12345-1234567-1')
    .required('CNIC is required'),
  rollNumber: Yup.string().required('Roll Number is required'),
  course: Yup.string().required('Course is required'),
  semester: Yup.string().required('Semester is required'),
  dateOfBirth: Yup.date().required('Date of Birth is required'),
  bloodGroup: Yup.string().required('Blood Group is required'),
  phone: Yup.string()
    .matches(/^03\d{9}$/, 'Phone must start with 03 and be 11 digits')
    .required('Phone is required'),
  address: Yup.string().required('Address is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  emergencyContact: Yup.string().required('Emergency Contact is required'),
  gender: Yup.string().required('Gender is required'),
  religion: Yup.string().required('Religion is required'),
  nationality: Yup.string().required('Nationality is required'),
  domicile: Yup.string().required('Domicile is required'),
});

export default function BiodataForm() {
  const [initialValues, setInitialValues] = useState({
    fullName: '',
    fatherName: '',
    cnic: '',
    rollNumber: '',
    course: '',
    semester: '',
    dateOfBirth: '',
    bloodGroup: '',
    phone: '',
    address: '',
    email: localStorage.getItem('userEmail') || '',
    emergencyContact: '',
    gender: '',
    religion: '',
    nationality: '',
    domicile: '',
    profilePhoto: '',
  });

  useEffect(() => {
    const savedBiodata = localStorage.getItem('studentBiodata');
    if (savedBiodata) {
      setInitialValues(JSON.parse(savedBiodata));
    }
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Save to localStorage
      localStorage.setItem('studentBiodata', JSON.stringify(values));
      
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Biodata saved successfully',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
    }
    setSubmitting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Student Biodata Form</h2>
          <p className="mb-0">Please fill all the details carefully</p>
        </div>
        <div className="card-body">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        <FaUser className="me-2" />
                        Full Name *
                      </label>
                      <Field 
                        type="text" 
                        name="fullName" 
                        className="form-control" 
                        placeholder="Enter your full name"
                      />
                      <ErrorMessage name="fullName" component="div" className="text-danger small" />
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Father's Name *</label>
                      <Field 
                        type="text" 
                        name="fatherName" 
                        className="form-control" 
                        placeholder="Enter father's name"
                      />
                      <ErrorMessage name="fatherName" component="div" className="text-danger small" />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        <FaIdCard className="me-2" />
                        CNIC *
                      </label>
                      <Field 
                        type="text" 
                        name="cnic" 
                        className="form-control" 
                        placeholder="12345-1234567-1"
                      />
                      <ErrorMessage name="cnic" component="div" className="text-danger small" />
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Roll Number *</label>
                      <Field 
                        type="text" 
                        name="rollNumber" 
                        className="form-control" 
                        placeholder="Enter roll number"
                      />
                      <ErrorMessage name="rollNumber" component="div" className="text-danger small" />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Course *</label>
                      <Field as="select" name="course" className="form-select">
                        <option value="">Select Course</option>
                        <option value="BS Computer Science">BS Computer Science</option>
                        <option value="BS Software Engineering">BS Software Engineering</option>
                        <option value="BS Information Technology">BS Information Technology</option>
                        <option value="BS Data Science">BS Data Science</option>
                        <option value="BBA">Bachelor of Business Administration</option>
                        <option value="B.Com">Bachelor of Commerce</option>
                        <option value="BS Mathematics">BS Mathematics</option>
                        <option value="BS Physics">BS Physics</option>
                      </Field>
                      <ErrorMessage name="course" component="div" className="text-danger small" />
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Semester *</label>
                      <Field as="select" name="semester" className="form-select">
                        <option value="">Select Semester</option>
                        {[1,2,3,4,5,6,7,8].map(num => (
                          <option key={num} value={num}>Semester {num}</option>
                        ))}
                      </Field>
                      <ErrorMessage name="semester" component="div" className="text-danger small" />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label className="form-label">Date of Birth *</label>
                      <Field 
                        type="date" 
                        name="dateOfBirth" 
                        className="form-control" 
                      />
                      <ErrorMessage name="dateOfBirth" component="div" className="text-danger small" />
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label className="form-label">
                        <FaHeartbeat className="me-2" />
                        Blood Group *
                      </label>
                      <Field as="select" name="bloodGroup" className="form-select">
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                      </Field>
                      <ErrorMessage name="bloodGroup" component="div" className="text-danger small" />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label className="form-label">Gender *</label>
                      <Field as="select" name="gender" className="form-select">
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </Field>
                      <ErrorMessage name="gender" component="div" className="text-danger small" />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label className="form-label">Religion *</label>
                      <Field as="select" name="religion" className="form-select">
                        <option value="">Select Religion</option>
                        <option value="Islam">Islam</option>
                        <option value="Christianity">Christianity</option>
                        <option value="Hinduism">Hinduism</option>
                        <option value="Sikhism">Sikhism</option>
                        <option value="Other">Other</option>
                      </Field>
                      <ErrorMessage name="religion" component="div" className="text-danger small" />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label className="form-label">Nationality *</label>
                      <Field 
                        type="text" 
                        name="nationality" 
                        className="form-control" 
                        placeholder="e.g., Pakistani"
                      />
                      <ErrorMessage name="nationality" component="div" className="text-danger small" />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label className="form-label">Domicile *</label>
                      <Field as="select" name="domicile" className="form-select">
                        <option value="">Select Domicile</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Sindh">Sindh</option>
                        <option value="KPK">KPK</option>
                        <option value="Balochistan">Balochistan</option>
                        <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
                        <option value="AJK">AJK</option>
                      </Field>
                      <ErrorMessage name="domicile" component="div" className="text-danger small" />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    <FaPhone className="me-2" />
                    Phone Number *
                  </label>
                  <Field 
                    type="tel" 
                    name="phone" 
                    className="form-control" 
                    placeholder="03001234567"
                  />
                  <ErrorMessage name="phone" component="div" className="text-danger small" />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    <FaHome className="me-2" />
                    Permanent Address *
                  </label>
                  <Field 
                    as="textarea" 
                    name="address" 
                    className="form-control" 
                    rows="3"
                    placeholder="House #, Street, City, Country"
                  />
                  <ErrorMessage name="address" component="div" className="text-danger small" />
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Email *</label>
                      <Field 
                        type="email" 
                        name="email" 
                        className="form-control" 
                        disabled
                      />
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Emergency Contact *</label>
                      <Field 
                        type="text" 
                        name="emergencyContact" 
                        className="form-control" 
                        placeholder="Name and phone number"
                      />
                      <ErrorMessage name="emergencyContact" component="div" className="text-danger small" />
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label">Profile Photo (Optional)</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setFieldValue('profilePhoto', reader.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  {values.profilePhoto && (
                    <div className="mt-2">
                      <img 
                        src={values.profilePhoto} 
                        alt="Profile" 
                        className="img-thumbnail"
                        style={{ width: '100px', height: '100px' }}
                      />
                    </div>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="btn btn-primary btn-lg w-100"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Save Biodata'}
                </motion.button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </motion.div>
  );
}