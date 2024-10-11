// src/components/Register.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { registerUser } from '../../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Паролі не співпадають');
      return;
    }

    try {
      // Викликаємо Redux дію для реєстрації
      await dispatch(registerUser({ email, password, firstname, lastname }));
      // Після успішної реєстрації перенаправляємо на сторінку профілю
      navigate('/profile');
    } catch (err) {
      setError('Помилка реєстрації');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Реєстрація</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700">Ім'я</label>
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Прізвище</label>
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Електронна пошта</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Підтвердіть пароль</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring"
          >
            Зареєструватися
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
