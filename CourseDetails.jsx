import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTrash, FaEdit, FaClock, FaCalendar, FaBook, FaChalkboardTeacher, FaHourglassHalf } from 'react-icons/fa';

export default function CourseDetails() {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    courseCode: '',
    courseName: '',
    instructor: '',
    creditHours: '',
    timing: '',
    duration: '',
    syllabus: '',
    room: '',
    days: [],
    courseType: '',
  });

  useEffect(() => {
    const savedCourses = localStorage.getItem('studentCourses');
    if (savedCourses) {
      setCourses(JSON.parse(savedCourses));
    }
  }, []);

  const saveCoursesToStorage = (coursesList) => {
    localStorage.setItem('studentCourses', JSON.stringify(coursesList));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (day) => {
    setFormData(prev => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter(d => d !== day)
        : [...prev.days, day]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newCourse = { ...formData, id: Date.now() };
    
    if (editingIndex !== null) {
      // Edit existing course
      const updatedCourses = [...courses];
      updatedCourses[editingIndex] = newCourse;
      setCourses(updatedCourses);
      saveCoursesToStorage(updatedCourses);
      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Course updated successfully',
        timer: 1500
      });
      setEditingIndex(null);
    } else {
      // Add new course
      const updatedCourses = [...courses, newCourse];
      setCourses(updatedCourses);
      saveCoursesToStorage(updatedCourses);
      Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: 'Course added successfully',
        timer: 1500
      });
    }

    setShowForm(false);
    setFormData({
      courseCode: '',
      courseName: '',
      instructor: '',
      creditHours: '',
      timing: '',
      duration: '',
      syllabus: '',
      room: '',
      days: [],
      courseType: '',
    });
  };

  const handleEdit = (index) => {
    setFormData(courses[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCourses = courses.filter((_, i) => i !== index);
        setCourses(updatedCourses);
        saveCoursesToStorage(updatedCourses);
        Swal.fire('Deleted!', 'Course has been deleted.', 'success');
      }
    });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingIndex(null);
    setFormData({
      courseCode: '',
      courseName: '',
      instructor: '',
      creditHours: '',
      timing: '',
      duration: '',
      syllabus: '',
      room: '',
      days: [],
      courseType: '',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Course Management</h2>
        {!showForm && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
          >
            <FaPlus className="me-2" />
            Add New Course
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {showForm ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4"
          >
            <div className="card shadow-lg">
              <div className="card-header bg-info text-white">
                <h4 className="mb-0">
                  <FaBook className="me-2" />
                  {editingIndex !== null ? 'Edit Course' : 'Add New Course'}
                </h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Course Code *</label>
                        <input
                          type="text"
                          name="courseCode"
                          className="form-control"
                          value={formData.courseCode}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g., CS-101"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Course Name *</label>
                        <input
                          type="text"
                          name="courseName"
                          className="form-control"
                          value={formData.courseName}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g., Introduction to Programming"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          <FaChalkboardTeacher className="me-2" />
                          Instructor *
                        </label>
                        <input
                          type="text"
                          name="instructor"
                          className="form-control"
                          value={formData.instructor}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g., Dr. Ali Khan"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Credit Hours *</label>
                        <input
                          type="number"
                          name="creditHours"
                          className="form-control"
                          value={formData.creditHours}
                          onChange={handleInputChange}
                          required
                          min="1"
                          max="6"
                          placeholder="e.g., 3"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          <FaClock className="me-2" />
                          Timing *
                        </label>
                        <input
                          type="text"
                          name="timing"
                          className="form-control"
                          value={formData.timing}
                          onChange={handleInputChange}
                          placeholder="e.g., 9:00 AM - 10:30 AM"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          <FaHourglassHalf className="me-2" />
                          Duration *
                        </label>
                        <input
                          type="text"
                          name="duration"
                          className="form-control"
                          value={formData.duration}
                          onChange={handleInputChange}
                          placeholder="e.g., 16 Weeks"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Course Type</label>
                        <select
                          name="courseType"
                          className="form-select"
                          value={formData.courseType}
                          onChange={handleInputChange}
                        >
                          <option value="">Select Type</option>
                          <option value="Core">Core Course</option>
                          <option value="Elective">Elective</option>
                          <option value="Lab">Lab</option>
                          <option value="Project">Project</option>
                          <option value="Thesis">Thesis</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Room Number</label>
                        <input
                          type="text"
                          name="room"
                          className="form-control"
                          value={formData.room}
                          onChange={handleInputChange}
                          placeholder="e.g., Room 101"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Days *</label>
                    <div className="d-flex flex-wrap gap-3">
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                        <div key={day} className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={day}
                            checked={formData.days.includes(day)}
                            onChange={() => handleCheckboxChange(day)}
                          />
                          <label className="form-check-label" htmlFor={day}>
                            {day}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Syllabus / Course Description *</label>
                    <textarea
                      name="syllabus"
                      className="form-control"
                      rows="4"
                      value={formData.syllabus}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter course objectives, topics, learning outcomes..."
                    />
                  </div>

                  <div className="d-flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="btn btn-success flex-grow-1"
                    >
                      {editingIndex !== null ? 'Update Course' : 'Add Course'}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCancel}
                    >
                      Cancel
                    </motion.button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {courses.length === 0 ? (
        <div className="text-center py-5">
          <FaBook className="display-1 text-muted mb-3" />
          <h4>No courses added yet</h4>
          <p className="text-muted">Click "Add New Course" to add your first course</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="row"
        >
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              className="col-md-6 col-lg-4 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="card h-100 shadow-sm">
                <div className="card-header bg-primary text-white">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">{course.courseCode}</h5>
                    <span className="badge bg-light text-dark">{course.courseType}</span>
                  </div>
                </div>
                <div className="card-body">
                  <h6 className="card-title text-primary">{course.courseName}</h6>
                  <p className="card-text">
                    <small className="text-muted">
                      <FaChalkboardTeacher className="me-2" />
                      {course.instructor}
                    </small>
                  </p>
                  <p className="card-text">
                    <FaClock className="me-2" />
                    <strong>Timing:</strong> {course.timing}
                  </p>
                  <p className="card-text">
                    <FaCalendar className="me-2" />
                    <strong>Days:</strong> {course.days.join(', ')}
                  </p>
                  <p className="card-text">
                    <strong>Duration:</strong> {course.duration}
                  </p>
                  <p className="card-text">
                    <strong>Credit Hours:</strong> {course.creditHours}
                  </p>
                  <p className="card-text">
                    <strong>Room:</strong> {course.room || 'Not specified'}
                  </p>
                  <div className="mt-3">
                    <strong>Syllabus:</strong>
                    <p className="small text-muted mt-1">
                      {course.syllabus.length > 100 
                        ? `${course.syllabus.substring(0, 100)}...` 
                        : course.syllabus}
                    </p>
                  </div>
                </div>
                <div className="card-footer bg-transparent">
                  <div className="d-flex justify-content-between">
                    <button 
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleEdit(index)}
                    >
                      <FaEdit className="me-1" /> Edit
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(index)}
                    >
                      <FaTrash className="me-1" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}