const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const validateSignupInput = ({ name, email, password, role }) => {
  if (!name || !email || !password || !role) {
    return 'All fields are required';
  }
  if (!validateEmail(email)) {
    return 'Invalid email format';
  }
  if (password.length < 6) {
    return 'Password must be a minimum of 6 characters';
  }
  if (role !== 'Admin' && role !== 'User') {
    return 'Role must be selected as Admin or User';
  }
  return null;
};

const validateLoginInput = ({ email, password }) => {
  if (!email || !password) {
    return 'All fields are required';
  }
  if (!validateEmail(email)) {
    return 'Invalid email format';
  }
  if (password.length < 6) {
    return 'Password must be a minimum of 6 characters';
  }
  return null;
};

module.exports = { validateSignupInput, validateLoginInput, validateEmail };