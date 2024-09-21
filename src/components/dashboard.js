import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [role, setRole] = useState('');

  useEffect(() => {
    const storedRole = localStorage.getItem('role'); // Get role from local storage
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  return (
    <div>
      {role === 'admin' ? (
        <>
          <h2>Admin Panel</h2>
          <ul>
            <li>Manage Users</li>
            <li>View Reports</li>
            <li>Settings</li>
          </ul>
        </>
      ) : role === 'employee' ? (
        <>
          <h2>Employee Panel</h2>
          <ul>
            <li>View Tasks</li>
            <li>Profile</li>
            <li>Request Leave</li>
          </ul>
        </>
      ) : (
        <h2>Unauthorized</h2>
      )}
    </div>
  );
};

export default Dashboard;
