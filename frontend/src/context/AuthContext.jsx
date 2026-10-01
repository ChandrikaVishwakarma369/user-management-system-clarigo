import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  signup as signupService,
  login as loginService,
  getMe,
} from '../services/authService';

import {
  saveAuth,
  clearAuth,
  getStoredUser,
  getToken,
} from '../utils/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(getStoredUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      const token = getToken();

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const currentUser = await getMe();

        setUser(currentUser);

        sessionStorage.setItem(
          'user',
          JSON.stringify(currentUser)
        );

        sessionStorage.setItem(
          'role',
          currentUser.role
        );
      } catch (error) {
        clearAuth();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  const login = async (credentials) => {
    const data = await loginService(credentials);

    saveAuth(data);
    setUser(data);

    navigate('/dashboard');
  };

  const signup = async (userData) => {
    const data = await signupService(userData);

    saveAuth(data);
    setUser(data);

    navigate('/dashboard');
  };

  const logout = () => {
    clearAuth();
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};