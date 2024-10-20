import { useState } from 'react';

export const useAuth = () => {
  const [auth, setAuth] = useState(null);

  const login = (token) => {
    localStorage.setItem('token', token);
    setAuth({ token });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth(null);
  };

  return { auth, login, logout };
};
