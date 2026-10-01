import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-gray-800">
          404
        </h1>

        <p className="mt-3 text-gray-500">
          Page not found
        </p>

        <Link
          to="/dashboard"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 text-white"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;