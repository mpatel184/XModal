import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    dob: ''
  });
  const [errors, setErrors] = useState({});
  const modalRef = useRef(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
    if (errors[id]) {
      setErrors({
        ...errors,
        [id]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    for (const key in formData) {
      if (!formData[key].trim()) {
        newErrors[key] = `Please fill out this field.`;
        isValid = false;
      }
    }

    setErrors(newErrors);
    
    if (!isValid) {
      return false;
    }

    if (!formData.email.includes('@')) {
      alert("Invalid email. Please check your email address.");
      return false;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return false;
    }

    const dobDate = new Date(formData.dob);
    const currentDate = new Date();
    if (dobDate > currentDate) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsModalOpen(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      username: '',
      email: '',
      phone: '',
      dob: ''
    });
    setErrors({});
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && e.target === modalRef.current) {
      setIsModalOpen(false);
      resetForm();
    }
  };

  useEffect(() => {
    const handleGlobalClick = (e) => {
      if (isModalOpen && !e.target.closest('.modal-content') && !e.target.closest('button')) {
        setIsModalOpen(false);
        resetForm();
      }
    };

    document.addEventListener('click', handleGlobalClick);
    
    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [isModalOpen]);

  return (
    <div className="app">
      {!isModalOpen && (
        <div>
          <h1>User Details Model</h1>
          <button onClick={() => setIsModalOpen(true)}>Open Form</button>
        </div>
      )}

      {isModalOpen && (
        <div className="modal" ref={modalRef} onClick={handleOutsideClick}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit}>
              <h2>User Information Form</h2>
              
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && <span className="error-message">{errors.username}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="text"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  type="date"
                  id="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
                {errors.dob && <span className="error-message">{errors.dob}</span>}
              </div>

              <button type="submit" className="submit-button">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
