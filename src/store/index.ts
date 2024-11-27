import { configureStore } from '@reduxjs/toolkit';
import { postApi } from '../services/postApi.ts';

const store = configureStore({
    reducer: {
        [postApi.reducerPath]: postApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(postApi.middleware),
});

console.log('Redux Store State:', store.getState()); // Додай цей лог

export default store;
