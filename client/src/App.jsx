import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in by checking a token or session 
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Handle logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login'); // Redirect to login page
  };

  return (
    <>
      <header>
        <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      </header>
      <Outlet context={{ isLoggedIn, setIsLoggedIn }} /> {/* Pass the state and setter to the Outlet */}
    </>
  );
}

export default App;
