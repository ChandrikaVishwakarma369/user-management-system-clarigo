import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Button from '../components/common/Button';
import ErrorMessage from '../components/common/ErrorMessage';

import { validateSignup } from '../utils/validation';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const { signup, isAuthenticated } = useAuth();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
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

    const validationErrors = validateSignup(form);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length) {
      return;
    }

    try {
      setLoading(true);
      setServerError('');

      await signup(form);
    } catch (error) {
      setServerError(
        error.response?.data?.message ||
          'Signup failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">
          Create Account
        </h1>

        <p className="mb-6 text-gray-500">
          Signup to continue
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <ErrorMessage message={serverError} />

          <Input
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter full name"
            error={errors.name}
          />

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
            placeholder="Minimum 6 characters"
            error={errors.password}
          />

          <Select
            label="Role"
            name="role"
            value={form.role}
            onChange={handleChange}
            options={[
              {
                value: 'Admin',
                label: 'Admin',
              },
              {
                value: 'User',
                label: 'User',
              },
            ]}
            error={errors.role}
          />

          <Button
            type="submit"
            loading={loading}
            className="w-full"
          >
            Signup
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;