import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import Register from './components/regiester';
import Header from "./components/header"
import Login from './components/login';
import Dashboard from './components/dashboard'
import PrivateRoute from './components/privateroute';
import './global.css';  

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token'); // Check if token exists
    const role = localStorage.getItem('role'); // Get the user role
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token on logout
    localStorage.removeItem('role'); // Remove role on logout
    setIsAuthenticated(false);
  };

  return (
    <Router>
    {isAuthenticated && <Header onLogout={handleLogout} />}
    <div>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route
          path="/login"
          element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/dashboard" />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  </Router>
  );
};

export default App;
