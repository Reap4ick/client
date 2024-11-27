

// import { useState } from 'react';
// import { useGetPostsQuery } from '../../services/postApi';
// import EditPost from '../Edit';
// import ProgressBar from '../../components/common/loaderforredux';

// const PostsList = () => {
//     const { data: posts, isLoading } = useGetPostsQuery();
//     const [editingPost, setEditingPost] = useState<number | null>(null);

//     if (isLoading) return <div>Loading...</div>;

//     return (
//         <div>
//             <ProgressBar isLoading={isLoading} />
//             <ul>
//                 {posts?.map((post) => (
//                     <li key={post.id}>
//                         {post.title}{' '}
//                         <button onClick={() => setEditingPost(post.id)}>Edit</button>
//                     </li>
//                 ))}
//             </ul>
//             {editingPost !== null && (
//                 <EditPost
//                     post={posts!.find((p) => p.id === editingPost)!}
//                     onClose={() => setEditingPost(null)}
//                 />
//             )}
//         </div>
//     );
// };

// export default PostsList;

import { useGetPostsQuery } from "../../services/postApi";
import { Link } from "react-router-dom";
import { Table, Button } from "antd";

const PostsList = () => {
    const { data: posts, isLoading } = useGetPostsQuery();

    if (isLoading) return <div>Loading...</div>;

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Назва",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Опис",
            dataIndex: "body",
            key: "body",
            render: (text: string) => (
                <span>{text.length > 50 ? text.slice(0, 50) + "..." : text}</span>
            ),
        },
        {
            title: "Дії",
            key: "actions",
            render: (_: any, record: { id: number }) => (
                <Link to={`/posts/edit/${record.id}`}>
                    <Button type="link">Редагувати</Button>
                </Link>
            ),
        },
    ];

    return (
        <div className="container mx-auto mt-8 p-4">
            <h1 className="text-3xl font-bold text-center mb-4">Список постів</h1>
            <Table dataSource={posts} columns={columns} rowKey="id" />
        </div>
    );
};

export default PostsList;
