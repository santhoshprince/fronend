import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [dashboardContent, setDashboardContent] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token'); // Assuming token is stored after login

    axios.get('http://localhost:5000/api/auth/dashboard', {
      headers: { 'Authorization': token }
    })
    .then(response => {
      const { message, role } = response.data;
      setDashboardContent(message);
      setRole(role);
    })
    .catch(error => {
      console.error('Error fetching dashboard content:', error.response?.data?.message || error.message);
    });
  }, []);

  return (
    <div>
      <h1>{dashboardContent}</h1>
      
      {role === 'admin' ? (
        <div>
          <h2>Admin Panel</h2>
          <ul>
            <li>Manage Users</li>
            <li>View Reports</li>
            <li>Settings</li>
          </ul>
        </div>
      ) : role === 'employee' ? (
        <div>
          <h2>Employee Panel</h2>
          <ul>
            <li>View Tasks</li>
            <li>Profile</li>
            <li>Request Leave</li>
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
