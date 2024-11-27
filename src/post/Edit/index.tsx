// import { Button, Form, Input } from "antd";
// import { useNavigate, useParams } from "react-router-dom";
// import { useEffect } from "react";
// import { API_URL, http_common } from "../../env";
// import { IPostItem } from "../../components/interfaces/posts";


// const PostEditPage = () => {
//     const { id } = useParams<{ id: string }>(); // Отримуємо ID поста
//     const navigate = useNavigate();
//     const [form] = Form.useForm<IPostItem>();

//     // Завантаження даних поста для заповнення форми
//     useEffect(() => {
//         http_common
//             .get<IPostItem>(`${API_URL}/posts/${id}`)
//             .then((response) => {
//                 form.setFieldsValue(response.data);
//             })
//             .catch((error) => console.error("Error fetching post:", error));
//     }, [id]);

//     // Сабміт форми для збереження змін
//     const onSubmit = async (values: IPostItem) => {
//         try {
//             await http_common.put(`${API_URL}/posts/${id}`, values);
//             navigate("/posts"); // Повертаємося до списку
//         } catch (error) {
//             console.error("Error updating post:", error);
//         }
//     };

//     return (
//         <div className="container mx-auto mt-8 p-4">
//             <h1 className="text-center text-3xl font-bold mb-4">Редагувати пост</h1>
//             <Form
//                 form={form}
//                 layout="vertical"
//                 onFinish={onSubmit}
//                 className="max-w-lg mx-auto"
//             >
//                 <Form.Item
//                     label="Назва"
//                     name="title"
//                     rules={[
//                         { required: true, message: "Назва є обов'язковою!" },
//                         { min: 3, message: "Назва має містити щонайменше 3 символи" },
//                     ]}
//                 >
//                     <Input />
//                 </Form.Item>

//                 <Form.Item
//                     label="Текст поста"
//                     name="body"
//                     rules={[
//                         { required: true, message: "Текст поста є обов'язковим!" },
//                         { max: 4000, message: "Текст не може перевищувати 4000 символів" },
//                     ]}
//                 >
//                     <Input.TextArea rows={4} />
//                 </Form.Item>

//                 <div className="flex justify-between mt-4">
//                     <Button type="primary" htmlType="submit">
//                         Зберегти
//                     </Button>
//                     <Button onClick={() => navigate("/posts")}>Скасувати</Button>
//                 </div>
//             </Form>
//         </div>
//     );
// };

// export default PostEditPage;







    import { Button, Form, Input } from "antd";
    import { useNavigate, useParams } from "react-router-dom";
    import { useEffect } from "react";
    import { useGetPostByIdQuery, useUpdatePostMutation } from "../../services/postApi";
    import { IPostItem } from "../../components/interfaces/posts";

    const PostEditPage = () => {
        const { id } = useParams<{ id: string }>();
        const navigate = useNavigate();
        const [form] = Form.useForm();

        const { data: post, isLoading } = useGetPostByIdQuery(id!);
        const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();

        useEffect(() => {
            if (post) form.setFieldsValue(post);
        }, [post]);

        const onSubmit = async (values: Omit<IPostItem, "id">) => {
            try {
                const payload = { ...values, id: Number(id) }; // Приводимо ID до числа
                await updatePost({ id: id!, post: payload }).unwrap(); // Використовуємо `!`, щоб виключити undefined
                window.location.reload();
                navigate("/posts");
                window.location.reload();
            } catch (error) {
                console.error("Error updating post:", error);
            }
        };
        
        

        if (isLoading) return <div>Loading...</div>;

        return (
            <div className="container mx-auto mt-8 p-4">
                <h1 className="text-center text-3xl font-bold mb-4">Редагувати пост</h1>
                <Form form={form} layout="vertical" onFinish={onSubmit} className="max-w-lg mx-auto">
                    <Form.Item
                        label="Назва"
                        name="title"
                        rules={[
                            { required: true, message: "Назва є обов'язковою!" },
                            { min: 3, message: "Назва має містити щонайменше 3 символи" },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Текст поста"
                        name="body"
                        rules={[
                            { required: true, message: "Текст поста є обов'язковим!" },
                            { max: 4000, message: "Текст не може перевищувати 4000 символів" },
                        ]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <div className="flex justify-between mt-4">
                        <Button type="primary" htmlType="submit" loading={isUpdating}>
                            Зберегти
                        </Button>
                        
                        <Button onClick={() => navigate("/posts")}>Скасувати</Button>
                    </div>
                </Form>
            </div>
        );
    };

    export default PostEditPage;
