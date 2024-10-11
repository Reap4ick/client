import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store'; // Імпорт твого store
import MainLayout from './components/containers/default';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/home';
import CategoryCreatePage from './components/categories/create';
import EditCategoryPage from './components/categories/edit';
import ProductListPage from './components/products/list';
import ProductCreatePage from './components/products/create';
import EditProductPage from './components/products/edit';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Profile from './components/auth/profile';

export default function App() {
    return (
        <Provider store={store}> {/* Обгортай тут */}
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="create" element={<CategoryCreatePage />} />
                    <Route path="/edit/:id" element={<EditCategoryPage />} />

                    {/* Роутинг для продуктів */}
                    <Route path={"products"}>
                        <Route index element={<ProductListPage />} />
                        <Route path="create" element={<ProductCreatePage />} />
                        <Route path="edit/:id" element={<EditProductPage />} />
                    </Route>

                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} /> 
                </Route>
            </Routes>
        </Provider>
    );
}