import Button from '../common/Button';

const UserRow = ({ user, onEdit, onDelete }) => {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-6 py-4">
        {user.name}
      </td>

      <td className="px-6 py-4">
        {user.email}
      </td>

      <td className="px-6 py-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            user.role === 'Admin'
              ? 'bg-purple-100 text-purple-700'
              : 'bg-blue-100 text-blue-700'
          }`}
        >
          {user.role}
        </span>
      </td>

      <td className="px-6 py-4">
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => onEdit(user)}
          >
            Edit
          </Button>

          <Button
            variant="danger"
            onClick={() => onDelete(user)}
          >
            Delete
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default UserRow;