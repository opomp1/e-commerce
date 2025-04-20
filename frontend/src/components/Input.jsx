import { Mail, Lock, User } from "lucide-react";

const inputConfig = {
  fullname: {
    label: "Full name",
    id: "name",
    type: "text",
    placeholder: "John Doe",
    icon: <User className="h-5 w-5 text-gray-400" aria-hidden="true" />,
  },
  email: {
    label: "Email address",
    id: "email",
    type: "email",
    placeholder: "you@example.com",
    icon: <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />,
  },
  password: {
    label: "Password",
    id: "password",
    type: "password",
    placeholder: "••••••••",
    icon: <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />,
  },
  "confirm-password": {
    label: "Confirm Password",
    id: "confirmPassword",
    type: "password",
    placeholder: "••••••••",
    icon: <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />,
  },
};

const Input = ({ value, onChange, field, error }) => {
  const config = inputConfig[field];
  if (!config) return null;

  return (
    <div>
      <label
        htmlFor={config.id}
        className="block text-sm font-medium text-gray-300"
      >
        {config.label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {config.icon}
        </div>
        <input
          id={config.id}
          type={config.type}
          required
          value={value}
          onChange={onChange}
          className="block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-base"
          placeholder={config.placeholder}
        />
      </div>
      <span className="text-sm text-red-500">{error}</span>
    </div>
  );
};

export default Input;
