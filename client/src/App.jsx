import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './Pages/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in by checking a token or session 
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      setIsLoggedIn(true);
    }else  {
      navigate('/login')
    }
  }, [navigate]);

  // Handle logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login'); // Redirect to login page
    
  };


  return (
    <>
      <header>
           {isLoggedIn && <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}

      </header>
           <Outlet context={{ isLoggedIn, setIsLoggedIn }} />

    </>
  );
}

export default App;
