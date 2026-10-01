import { useEffect, useState } from 'react';

import Modal from '../common/Modal';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';

import { createUser, updateUser } from '../../services/userService';
import { validateUserForm } from '../../utils/validation';

const UserModal = ({
  isOpen,
  onClose,
  selectedUser,
  onSuccess,
}) => {
  const isEdit = !!selectedUser;

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedUser) {
      setForm({
        name: selectedUser.name || '',
        email: selectedUser.email || '',
        password: '',
        role: selectedUser.role || '',
      });
    } else {
      setForm({
        name: '',
        email: '',
        password: '',
        role: '',
      });
    }

    setErrors({});
    setServerError('');
  }, [selectedUser, isOpen]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateUserForm(
      form,
      isEdit
    );

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      setLoading(true);
      setServerError('');

      const payload = {
        name: form.name,
        email: form.email,
        role: form.role,
      };

      if (form.password) {
        payload.password = form.password;
      }

      if (isEdit) {
        await updateUser(selectedUser._id, payload);
      } else {
        await createUser({
          ...payload,
          password: form.password,
        });
      }

      onSuccess();
      onClose();
    } catch (error) {
      setServerError(
        error.response?.data?.message ||
          'Something went wrong'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit User' : 'Add User'}
    >
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
          label={
            isEdit
              ? 'Password (optional)'
              : 'Password'
          }
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder={
            isEdit
              ? 'Leave blank to keep current password'
              : 'Enter password'
          }
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

        <div className="flex justify-end gap-3 pt-3">
          <Button
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            loading={loading}
          >
            {isEdit ? 'Update User' : 'Add User'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default UserModal;