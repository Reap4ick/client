// src/redux/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch } from '../store';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: {
    email: string;
    name: string;
    roles: string;
  } | null;
}

// Завантажуємо стан з localStorage, якщо він є
const tokenFromStorage = localStorage.getItem('token');
const userFromStorage = localStorage.getItem('user');

const initialState: AuthState = {
  token: tokenFromStorage ? tokenFromStorage : null,
  isAuthenticated: !!tokenFromStorage,
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload); // Зберігаємо токен у localStorage
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('token'); // Видаляємо токен із localStorage
      localStorage.removeItem('user');
    },
    setUser: (state, action: PayloadAction<{ email: string; name: string; roles: string }>) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload)); // Зберігаємо користувача в localStorage
    }
  }
});

// Реєстрація користувача
interface RegisterData {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

export const registerUser = (registerData: RegisterData) => async (dispatch: AppDispatch) => {
  try {
    // Відправляємо запит на реєстрацію
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/Account/register`, registerData);
    
    // Отримуємо токен після реєстрації
    const { token } = response.data;

    // Зберігаємо токен в Redux та localStorage
    dispatch(login(token));

    // Отримуємо профіль користувача за токеном
    const profileResponse = await axios.get(`${import.meta.env.VITE_API_URL}/account/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const user = profileResponse.data;

    // Зберігаємо інформацію про користувача в Redux та localStorage
    dispatch(setUser(user));
  } catch (error) {
    console.error("Помилка реєстрації:", error);
    // Можна додати обробку помилок для UI
  }
};

// Логін користувача
interface LoginData {
  email: string;
  password: string;
}

export const loginUser = (loginData: LoginData) => async (dispatch: AppDispatch) => {
  try {
    // Відправляємо запит на логін
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/account/login`, loginData);
    
    // Отримуємо токен після логіну
    const { token } = response.data;

    // Зберігаємо токен в Redux та localStorage
    dispatch(login(token));

    // Отримуємо профіль користувача за токеном
    const profileResponse = await axios.get(`${import.meta.env.VITE_API_URL}/account/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const user = profileResponse.data;

    // Зберігаємо інформацію про користувача в Redux та localStorage
    dispatch(setUser(user));
  } catch (error) {
    console.error("Помилка логіну:", error);
    // Можна додати обробку помилок для UI
  }
};

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
