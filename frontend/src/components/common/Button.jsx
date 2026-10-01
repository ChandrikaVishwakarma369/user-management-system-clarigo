const Button = ({
  children,
  type = 'button',
  onClick,
  loading = false,
  variant = 'primary',
  disabled = false,
}) => {
  const styles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`rounded-lg px-4 py-2.5 font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]}`}
    >
      {loading ? 'Please wait...' : children}
    </button>
  );
};

export default Button;