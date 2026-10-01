export const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email) => {
  return emailRegex.test(email);
};

export const validateLogin = (form) => {
  const errors = {};

  if (!form.email.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(form.email)) {
    errors.email = 'Please enter a valid email';
  }

  if (!form.password) {
    errors.password = 'Password is required';
  } else if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
};

export const validateSignup = (form) => {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = 'Full name is required';
  }

  if (!form.email.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(form.email)) {
    errors.email = 'Please enter a valid email';
  }

  if (!form.password) {
    errors.password = 'Password is required';
  } else if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (!form.role) {
    errors.role = 'Role is required';
  }

  return errors;
};

export const validateUserForm = (form, isEdit = false) => {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = 'Full name is required';
  }

  if (!form.email.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(form.email)) {
    errors.email = 'Please enter a valid email';
  }

  if (!isEdit && !form.password) {
    errors.password = 'Password is required';
  }

  if (form.password && form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (!form.role) {
    errors.role = 'Role is required';
  }

  return errors;
};