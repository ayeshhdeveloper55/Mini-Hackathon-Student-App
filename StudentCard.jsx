import React, { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { 
  FaUniversity, 
  FaPrint, 
  FaDownload, 
  FaGraduationCap, 
  FaIdCard,
  FaCalendarAlt,
  FaPhone,
  FaMapMarkerAlt,
  FaHeartbeat
} from 'react-icons/fa';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function StudentCard() {
  const componentRef = useRef();
  const [biodata, setBiodata] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedBiodata = localStorage.getItem('studentBiodata');
    const savedCourses = localStorage.getItem('studentCourses');
    
    if (savedBiodata) {
      setBiodata(JSON.parse(savedBiodata));
    }
    
    if (savedCourses) {
      setCourses(JSON.parse(savedCourses));
    }
    
    setLoading(false);
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Student_ID_Card',
    onAfterPrint: () => Swal.fire({
      icon: 'success',
      title: 'Printed!',
      text: 'Student card printed successfully',
      timer: 1500
    })
  });

  const handleDownloadPDF = async () => {
    const input = componentRef.current;
    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
      logging: false,
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
    
    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const xPos = (pdf.internal.pageSize.getWidth() - imgWidth) / 2;
    const yPos = 10;
    
    pdf.addImage(imgData, 'PNG', xPos, yPos, imgWidth, imgHeight);
    pdf.save('Student_ID_Card.pdf');
    
    Swal.fire({
      icon: 'success',
      title: 'Downloaded!',
      text: 'Student card downloaded as PDF',
      timer: 1500
    });
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!biodata) {
    return (
      <div className="text-center py-5">
        <FaIdCard className="display-1 text-muted mb-3" />
        <h4>No biodata found</h4>
        <p className="text-muted">Please complete your biodata form first</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-4">
        <h2>Student Identity Card</h2>
        <p className="text-muted">Download or print your student card</p>
      </div>

      <div className="d-flex justify-content-center mb-4">
        <div className="btn-group" role="group">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary"
            onClick={handlePrint}
          >
            <FaPrint className="me-2" /> Print Card
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-success"
            onClick={handleDownloadPDF}
          >
            <FaDownload className="me-2" /> Download PDF
          </motion.button>
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <div className="card student-card shadow-lg" ref={componentRef} style={{ width: '100%', maxWidth: '800px' }}>
          <div className="card-body p-0">
            {/* Front Side */}
            <div className="p-4 border-bottom">
              <div className="row align-items-center">
                <div className="col-md-3 text-center">
                  <div className="university-logo mb-3">
                    <FaUniversity className="display-4 text-primary" />
                  </div>
                  <div className="student-photo-placeholder bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto"
                       style={{ width: '120px', height: '120px' }}>
                    {biodata.profilePhoto ? (
                      <img 
                        src={biodata.profilePhoto} 
                        alt="Student" 
                        className="rounded-circle"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <FaGraduationCap className="display-4 text-secondary" />
                    )}
                  </div>
                </div>
                
                <div className="col-md-9">
                  <div className="university-header mb-3">
                    <h2 className="text-primary fw-bold mb-1">UNIVERSITY OF TECHNOLOGY</h2>
                    <p className="text-muted mb-0">Official Student Identity Card</p>
                    <p className="small text-muted">Valid through: December 2024</p>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <table className="table table-borderless mb-0">
                        <tbody>
                          <tr>
                            <td className="fw-bold" style={{ width: '40%' }}>Name:</td>
                            <td>{biodata.fullName}</td>
                          </tr>
                          <tr>
                            <td className="fw-bold">Father's Name:</td>
                            <td>{biodata.fatherName}</td>
                          </tr>
                          <tr>
                            <td className="fw-bold">Roll No:</td>
                            <td className="fw-bold text-primary">{biodata.rollNumber}</td>
                          </tr>
                          <tr>
                            <td className="fw-bold">CNIC:</td>
                            <td>{biodata.cnic}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="col-md-6">
                      <table className="table table-borderless mb-0">
                        <tbody>
                          <tr>
                            <td className="fw-bold" style={{ width: '40%' }}>Course:</td>
                            <td>{biodata.course}</td>
                          </tr>
                          <tr>
                            <td className="fw-bold">Semester:</td>
                            <td>{biodata.semester}</td>
                          </tr>
                          <tr>
                            <td className="fw-bold">Blood Group:</td>
                            <td>
                              <FaHeartbeat className="me-1 text-danger" />
                              {biodata.bloodGroup}
                            </td>
                          </tr>
                          <tr>
                            <td className="fw-bold">Gender:</td>
                            <td>{biodata.gender}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Back Side */}
            <div className="p-4">
              <h5 className="text-center mb-4 border-bottom pb-2">
                <FaIdCard className="me-2" />
                Student Information
              </h5>
              
              <div className="row mb-4">
                <div className="col-md-6">
                  <h6 className="fw-bold">Contact Information</h6>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <FaPhone className="me-2 text-primary" />
                      <strong>Phone:</strong> {biodata.phone}
                    </li>
                    <li className="mb-2">
                      <strong>Email:</strong> {biodata.email}
                    </li>
                    <li className="mb-2">
                      <FaMapMarkerAlt className="me-2 text-primary" />
                      <strong>Address:</strong>
                      <div className="small text-muted mt-1">{biodata.address}</div>
                    </li>
                    <li>
                      <strong>Emergency Contact:</strong> {biodata.emergencyContact}
                    </li>
                  </ul>
                </div>
                
                <div className="col-md-6">
                  <h6 className="fw-bold">Personal Details</h6>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <FaCalendarAlt className="me-2 text-primary" />
                      <strong>Date of Birth:</strong> {new Date(biodata.dateOfBirth).toLocaleDateString()}
                    </li>
                    <li className="mb-2">
                      <strong>Religion:</strong> {biodata.religion}
                    </li>
                    <li className="mb-2">
                      <strong>Nationality:</strong> {biodata.nationality}
                    </li>
                    <li>
                      <strong>Domicile:</strong> {biodata.domicile}
                    </li>
                  </ul>
                </div>
              </div>

              {courses.length > 0 && (
                <div className="mb-4">
                  <h6 className="fw-bold border-bottom pb-2">Current Courses</h6>
                  <div className="row">
                    {courses.slice(0, 3).map((course, index) => (
                      <div key={index} className="col-md-4 mb-2">
                        <div className="border rounded p-2 bg-light">
                          <small className="fw-bold d-block">{course.courseCode}</small>
                          <small className="text-muted">{course.courseName}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="text-center mt-4">
                <div className="barcode bg-dark text-white p-2 rounded d-inline-block px-4">
                  <code className="fs-5">STU-{biodata.rollNumber}-{new Date().getFullYear()}</code>
                </div>
                <p className="mt-2 small text-muted">Scan this barcode for verification</p>
              </div>

              <div className="signature-section mt-4 pt-3 border-top">
                <div className="row">
                  <div className="col-6 text-center">
                    <div className="border-bottom mb-2" style={{ width: '150px', margin: '0 auto', height: '1px' }}></div>
                    <p className="mb-0 small fw-bold">Student Signature</p>
                  </div>
                  <div className="col-6 text-center">
                    <div className="border-bottom mb-2" style={{ width: '150px', margin: '0 auto', height: '1px' }}></div>
                    <p className="mb-0 small fw-bold">Registrar Signature</p>
                    <p className="small text-muted mb-0">University of Technology</p>
                  </div>
                </div>
              </div>

              <div className="card-footer mt-4 text-center bg-light">
                <small className="text-muted">
                  This card is the property of University of Technology. If found, please return to the university administration.
                  Misuse of this card is punishable by law.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}