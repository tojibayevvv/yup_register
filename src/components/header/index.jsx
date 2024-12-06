import React, { useState } from 'react';
import * as Yup from 'yup';

const LoginPage = () => {
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');

  // Correct credentials
  const correctEmail = 'abdullohspersonaldevelopment.28@gmail.com';
  const correctPassword = '12345678';

  // Validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setLoginError(''); // Clear login error when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate input values
      await validationSchema.validate(formValues, { abortEarly: false });
      setErrors({});

      // Check credentials
      if (formValues.email === correctEmail && formValues.password === correctPassword) {
        // alert('Login successful! Redirecting...');
        // Simulate redirect
        window.location.href = '/dashboard'; // Replace '/dashboard' with your actual target page
      } else {
        setLoginError('Incorrect email or password');
      }
    } catch (validationErrors) {
      const formattedErrors = {};
      validationErrors.inner.forEach((error) => {
        formattedErrors[error.path] = error.message;
      });
      setErrors(formattedErrors);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formValues.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && <div className="mt-1 text-sm text-red-500">{errors.email}</div>}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formValues.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.password && <div className="mt-1 text-sm text-red-500">{errors.password}</div>}
          </div>

          {/* Login Error */}
          {loginError && (
            <div className="text-sm text-red-500 mb-4">
              {loginError}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
