import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          to="/dashboard"
          className="text-2xl font-bold text-blue-600"
        >
          User Management
        </Link>

        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-medium text-gray-800">
                {user?.name}
              </p>

              <p className="text-xs text-gray-500">
                {user?.email}
              </p>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                user?.role === 'Admin'
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-blue-100 text-blue-700'
              }`}
            >
              {user?.role}
            </span>

            <button
              onClick={logout}
              className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link
              to="/login"
              className="rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;