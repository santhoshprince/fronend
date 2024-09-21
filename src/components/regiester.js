import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: ''
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState(''); 
  const { username, password, role } = formData;
  // Function to handle changes for any input field
  const onChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  // Function to submit form data to the backend
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Success:', res.data);   // Handle success response
      setMessage('Registration successful! You can now log in.');
      setTimeout(() => {
        navigate('/login'); // Redirect after a few seconds
      }, 2000);
    
    } catch (err) {
      console.error('Error:', err.response ? err.response.data : err.message); // Handle error response
      setMessage('Registration failed: ' + (err.response?.data?.message || 'Unknown error')); // Set error message
    }
  };

  return (
    <div className="register-container">
    <h2>Register</h2>
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          value={username}
          onChange={onChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={onChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Role</label>
        <select name="role" value={role} onChange={onChange} required>
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="employee">Employee</option>
        </select>
      </div>
      <button type="submit" className="register-button">Register</button>
    </form>
    {message && <div className="message">{message}</div>} 
    <div className="login-redirect">
        <p>Already have an account? <button onClick={() => navigate('/login')} className="login-button">Login</button></p>
      </div>
  </div>
  );
};

export default Register;
