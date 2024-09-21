import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({setIsAuthenticated}) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const { username, password } = formData;
  const navigate = useNavigate();
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const [error, setError] = useState('');
  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('API URL:', process.env.REACT_APP_API_URL);
  
      // Ensure token is in the response
      if (res.data && res.data.token) {
        localStorage.setItem('token', res.data.token);
        setIsAuthenticated(true);
        navigate('/dashboard');
        console.log(res.data); // Handle success response
      } else {
        console.error('Token missing in response');
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.error(err.response.data);
        setError('Invalid credentials'); // Handle error response
      } else {
        console.error('An unknown error occurred:', err.message);
        setError('An error occurred. Please try again.'); // Handle generic error response
      }
    }
  };
  

  return (
    <div className='login-container'>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
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
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit"  className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
