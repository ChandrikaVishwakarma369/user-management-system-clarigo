const Select = ({
  label,
  name,
  value,
  onChange,
  options,
  error,
}) => {
  return (
    <div className="space-y-1">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full rounded-lg border px-4 py-2.5 outline-none
          ${
            error
              ? 'border-red-500'
              : 'border-gray-300 focus:border-blue-500'
          }`}
      >
        <option value="">Select role</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default Select;