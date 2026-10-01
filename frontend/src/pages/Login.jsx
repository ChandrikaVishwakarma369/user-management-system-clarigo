import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

import Input from '../components/common/Input';
import Button from '../components/common/Button';
import ErrorMessage from '../components/common/ErrorMessage';

import { validateLogin } from '../utils/validation';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login, isAuthenticated } = useAuth();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateLogin(form);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length) {
      return;
    }

    try {
      setLoading(true);
      setServerError('');

      await login(form);
    } catch (error) {
      setServerError(
        error.response?.data?.message ||
          'Login failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">
          Welcome Back
        </h1>

        <p className="mb-6 text-gray-500">
          Login to your account
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <ErrorMessage message={serverError} />

          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter email"
            error={errors.email}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter password"
            error={errors.password}
          />

          <Button
            type="submit"
            loading={loading}
            className="w-full"
          >
            Login
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="font-semibold text-blue-600 hover:underline"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;