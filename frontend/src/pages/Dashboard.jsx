import { useEffect, useState } from 'react';

import UserTable from '../components/users/UserTable';
import UserModal from '../components/users/UserModal';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';

import {
  getUsers,
  deleteUser,
} from '../services/userService';

import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');

      const data = await getUsers();

      // Backend returns:
      // res.json(users)
      //
      // Therefore data itself is the array.
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Get users error:', error);

      setError(
        error.response?.data?.message ||
          'Unable to fetch users'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'Admin') {
      fetchUsers();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleAdd = () => {
    setSelectedUser(null);
    setModalOpen(true);
  };

  const handleEdit = (selected) => {
    setSelectedUser(selected);
    setModalOpen(true);
  };

  const handleDelete = async (selected) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${selected.name}?`
    );

    if (!confirmed) return;

    try {
      setError('');

      await deleteUser(selected._id);

      await fetchUsers();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          'Unable to delete user'
      );
    }
  };

  if (user?.role !== 'Admin') {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, {user?.name}
          </h1>

          <p className="mt-3 text-gray-500">
            You are logged in as a User.
          </p>

          <div className="mt-5 inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            Role: {user?.role}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            User Management
          </h1>

          <p className="mt-1 text-gray-500">
            Manage all registered users.
          </p>
        </div>

        <Button onClick={handleAdd}>
          + Add User
        </Button>
      </div>

      <ErrorMessage message={error} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Users
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-800">
            {users.length}
          </p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Admins
          </p>

          <p className="mt-2 text-3xl font-bold text-purple-600">
            {users.filter(
              (item) => item.role === 'Admin'
            ).length}
          </p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Users
          </p>

          <p className="mt-2 text-3xl font-bold text-blue-600">
            {users.filter(
              (item) => item.role === 'User'
            ).length}
          </p>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <UserTable
          users={users}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <UserModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedUser(null);
        }}
        selectedUser={selectedUser}
        onSuccess={fetchUsers}
      />
    </div>
  );
};

export default Dashboard;