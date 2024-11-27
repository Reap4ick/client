import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {API_URL} from "../env";
import {IPostItem} from "../components/interfaces/posts";

export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api` }),
    endpoints: (builder) => ({
        getPosts: builder.query<IPostItem[], void>({
            query: () => 'posts',
        }),
        // editPost: builder.mutation<IPostItem, { id: number; updatedPost: Partial<IPostItem> }>({
        //     query: ({ id, updatedPost }) => ({
        //         url: `api/Posts/${id}`,
        //         method: 'PUT',
        //         body: updatedPost,
        //     }),
        // }),
        updatePost: builder.mutation<void, { id: string; post: IPostItem }>({
            query: ({ id, post }) => ({
                url: `/posts/${id}`,
                method: 'PUT',
                body: post,
            }),
        }),
        getPostById: builder.query<IPostItem, string>({
            query: (id) => `/posts/${id}`,
        }),
        // addPost: builder.mutation({
        //     query: (newPost) => ({
        //         url: 'posts',
        //         method: 'POST',
        //         body: newPost,
        //     }),
        // }),
    }),
});

export const { useGetPostsQuery, useGetPostByIdQuery, useUpdatePostMutation /*useAddPostMutation,*/ /*useEditPostMutation*/} = postApi;




// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { IPostItem } from '../components/interfaces/posts';

// export const postApi = createApi({
//     reducerPath: 'postApi',
//     baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
//     endpoints: (builder) => ({
//         getPosts: builder.query<IPostItem[], void>({
//             query: () => '/posts',
//         }),
//         getPostById: builder.query<IPostItem, string>({
//             query: (id) => `/posts/${id}`,
//         }),
//         updatePost: builder.mutation<void, { id: string; post: IPostItem }>({
//             query: ({ id, post }) => ({
//                 url: `/posts/${id}`,
//                 method: 'PUT',
//                 body: post,
//             }),
//         }),
//     }),
// });

// export const { useGetPostsQuery, useGetPostByIdQuery, useUpdatePostMutation } = postApi;
