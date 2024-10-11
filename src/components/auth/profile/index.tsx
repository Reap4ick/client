// src/components/profile/index.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { setUser } from '../../../redux/slices/authSlice';

const Profile = () => {
  const [error, setError] = useState('');
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/Account/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const profileData = {
          email: response.data.email,
          name: response.data.name,
          roles: response.data.roles,
        };

        dispatch(setUser(profileData)); // Зберігаємо дані в Redux і localStorage
      } catch (err) {
        setError('Не вдалося завантажити профіль');
      }
    };

    if (!user && token) {
      fetchProfile();
    }
  }, [token, user, dispatch]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!user) {
    return <p>Завантаження...</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Профіль</h2>
      <p><strong>Електронна пошта:</strong> {user.email}</p>
      <p><strong>Ім'я:</strong> {user.name}</p>
      <p><strong>Роль:</strong> {user.roles}</p>
    </div>
  );
};

export default Profile;
