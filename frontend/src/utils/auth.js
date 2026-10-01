import { STORAGE_KEYS } from './constants';

export const saveAuth = (data) => {
  sessionStorage.setItem(
    STORAGE_KEYS.TOKEN,
    data.token
  );

  sessionStorage.setItem(
    STORAGE_KEYS.USER,
    JSON.stringify({
      _id: data._id,
      name: data.name,
      email: data.email,
      role: data.role,
    })
  );

  sessionStorage.setItem(
    STORAGE_KEYS.ROLE,
    data.role
  );
};

export const getToken = () => {
  return sessionStorage.getItem(
    STORAGE_KEYS.TOKEN
  );
};

export const getStoredUser = () => {
  const user = sessionStorage.getItem(
    STORAGE_KEYS.USER
  );

  if (!user) return null;

  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
};

export const getRole = () => {
  return sessionStorage.getItem(
    STORAGE_KEYS.ROLE
  );
};

export const clearAuth = () => {
  sessionStorage.removeItem(
    STORAGE_KEYS.TOKEN
  );

  sessionStorage.removeItem(
    STORAGE_KEYS.USER
  );

  sessionStorage.removeItem(
    STORAGE_KEYS.ROLE
  );
};

export const isAuthenticated = () => {
  return !!getToken();
};